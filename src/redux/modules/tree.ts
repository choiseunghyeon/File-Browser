import { createActions, handleActions} from 'redux-actions';
import {takeEvery, put, call} from 'redux-saga/effects';
import { reducerUtils } from '../utils';
import { IRenderTree } from '../../types/common';
import produce, { original } from 'immer';
import { createTreeData, getAbsolutePath, getNodeById, isDirectory } from '../../lib/treeUtils';
import { deleteFile, deleteFolder, getAllList } from '../../api/fileBrowser';

export interface TreeState {
  tree: IRenderTree;
  currentNodeId: string;
  treeMap: any;
  loading: boolean;
  error: Error | null;
}

const initialState: TreeState = reducerUtils.init();

const options = {
  prefix: 'tree',
}

export const { treeUpdate, treeDelete, treePending, treeFail, currentNodeIdChange} = createActions(
  {
    TREE_UPDATE: (tree: any) => tree,
    TREE_DELETE: (tree: any) => tree,
    TREE_FAIL: (error: Error) => error,
    CURRENT_NODE_ID_CHANGE: (id: string) => id,
  },
'TREE_PENDING',

  options,
)

const reducer = handleActions<TreeState, any>(
  {
    TREE_UPDATE: (state, { payload }) => {
      let {allFile, tree} = payload;
      if (allFile !== null ) {
        const targetNode = getNodeById(state.tree, tree.id);
        const children = allFile.map(file => createTreeData(targetNode, file));
        targetNode.children = children;
        // return produce(state, draft => {
        //   // 여기서 값 동기화 이루어지지 않음
        //   // delete 하려고 할 때 parentNode에서 children이 없음 값이 동기화 되지 않아서

        //   draft.loading = false;
        //   draft.error = null;
        // })
      }
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    TREE_DELETE: (state, { payload: tree }) => {
      console.log(tree);
      return produce(state, draft => {
        let targetNode = getNodeById(draft.tree, tree.id);
        if (targetNode.parentNode !== null) {
          const parentNode = targetNode.parentNode;
          const removableIndex = parentNode.children.findIndex((childNode) => childNode.id === targetNode.id);
          parentNode.children.splice(removableIndex, 1);
        }
        draft.loading = false;
        draft.error = null;
      });
    },
    TREE_PENDING: (state) => reducerUtils.pending(state),
    TREE_FAIL: (state, {payload: error}) => reducerUtils.error(error),
    CURRENT_NODE_ID_CHANGE: (state, {payload: id}) => ({
      ...state,
      currentNodeId: id,
    }),
  },
  initialState,
  options,
)

export default reducer;

function* getAllFileSaga(params){
  let { payload: tree } = params;
  try {
    yield put(treePending());
    const allFile = yield call(getAllList, getAbsolutePath(tree));
    let payload = {
      allFile,
      tree,
    }
    yield put(treeUpdate(payload));
  } catch (error) {
    console.log(error);
    yield put(treeFail(error));
  }
}

function* deleteNodeSaga(params) {
  let { payload: tree } = params;
  try {
    yield put(treePending());
    if (isDirectory(tree)) {
      yield call(deleteFolder, getAbsolutePath(tree));
    } else {
      yield call(deleteFile, getAbsolutePath(tree));
    }

    yield put(treeDelete(tree));
  } catch (error) {
    console.log(error);
    yield put(treeFail(error));
  }
}

export const {getAllFiles, deleteNode} = createActions(
  { 
    GET_ALL_FILES: (tree: IRenderTree) => tree,
    DELETE_NODE: (tree: IRenderTree) => tree,
  },
  options,
)
export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_ALL_FILES`, getAllFileSaga);
  yield takeEvery(`${options.prefix}/DELETE_NODE`, deleteNodeSaga);
}