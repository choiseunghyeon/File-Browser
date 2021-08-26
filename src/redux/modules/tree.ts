import { createActions, handleActions} from 'redux-actions';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import { getFlatMap, reducerUtils } from '../utils';
import { IFlatMap, IRenderTree } from '../../types/common';
import produce from 'immer';
import { createTreeData, deleteChildNode, getAbsolutePathIn, getNodeInFlatMap, getNodeInTree, isDirectory, updateFlatMap } from '../../lib/treeUtils';
import { deleteFile, deleteFolder, getAllList } from '../../api/fileBrowser';

export interface TreeState {
  tree: IRenderTree;
  currentNodeId: string;
  flatMap: IFlatMap;
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
        return produce(state, draft => {
          const targetNode = getNodeInTree(draft.tree, tree.id);
          const children = allFile.map(file => createTreeData(targetNode, file));
          targetNode.children = children;

          updateFlatMap(draft.flatMap, [targetNode, ...targetNode.children]);
          
          draft.loading = false;
          draft.error = null;
        })
      } else {
        return {
          ...state,
          error: null,
          loading: false,
        };
      }
    },
    TREE_DELETE: (state, { payload: tree }) => {
      return produce(state, draft => {
        let targetNode = getNodeInFlatMap(draft.flatMap, tree.id);
        if (targetNode) {
          const parentNode = getNodeInTree(draft.tree, targetNode.parentNodeId);
          deleteChildNode(parentNode, draft.flatMap, targetNode.id)
          updateFlatMap(draft.flatMap, [parentNode]);
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
  const flatMap = yield select(getFlatMap);
  try {
    yield put(treePending());
    const allFile = yield call(getAllList, getAbsolutePathIn(flatMap, tree.id));
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
  const flatMap = yield select(getFlatMap);
  try {
    yield put(treePending());
    if (isDirectory(tree)) {
      yield call(deleteFolder, getAbsolutePathIn(flatMap, tree.id));
    } else {
      yield call(deleteFile, getAbsolutePathIn(flatMap, tree.id));
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