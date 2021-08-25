import { createActions, handleActions} from 'redux-actions';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import { getFlatMap, reducerUtils } from '../utils';
import { IRenderTree } from '../../types/common';
import produce from 'immer';
import { createTreeData, getAbsolutePathIn, getNodeInFlatMap, getNodeInTree, isDirectory, updateTreeChildrenIntoFlatMap } from '../../lib/treeUtils';
import { deleteFile, deleteFolder, getAllList } from '../../api/fileBrowser';

export interface TreeState {
  tree: IRenderTree;
  currentNodeId: string;
  flatMap: any;
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

          updateTreeChildrenIntoFlatMap(targetNode, draft.flatMap);
          
          draft.loading = false;
          draft.error = null;
        })
      }
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    TREE_DELETE: (state, { payload: tree }) => {
      return produce(state, draft => {
        let targetNode = getNodeInFlatMap(draft.flatMap, tree.id);
        if (targetNode) {
          let parentNode = getNodeInTree(draft.tree, targetNode.parentNodeId);
          const removableIndex = parentNode.children.findIndex((childNode) => childNode.id === targetNode.id);
          parentNode.children.splice(removableIndex, 1);

          draft.flatMap[parentNode.id] = parentNode;
         delete draft.flatMap[targetNode.id];
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