import { createActions, handleActions} from 'redux-actions';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import { getCopyNode, getFlatMap, reducerUtils } from '../utils';
import { IFlatMap, IRenderTree } from '../../types/common';
import produce from 'immer';
import { createCopyInfo, createTreeData, deleteChildNode, getAbsolutePathIn, getNodeInFlatMap, getNodeInTree, isDirectory, updateFlatMap, updateHistory, validateIndex } from '../../lib/treeUtils';
import { deleteFile, deleteFolder, getAllList, pasteNode } from '../../api/fileBrowser';

export interface TreeState {
  tree: IRenderTree;
  currentNodeId: string;
  flatMap: IFlatMap;
  nodeHistory: string[];
  historyIndex: number;
  copyNode: IRenderTree | null;
  loading: boolean;
  error: Error | null;
}

const initialState: TreeState = reducerUtils.init();

const options = {
  prefix: 'tree',
}

export const { treeUpdate, treeDelete, treePending, treeFail, currentNodeIdChange, nodeHistoryUpdate, historyIndexChange, nodeCopy} = createActions(
  {
    TREE_UPDATE: (tree: any) => tree,
    TREE_DELETE: (tree: any) => tree,
    TREE_FAIL: (error: Error) => error,
    CURRENT_NODE_ID_CHANGE: (id: string) => id,
    NODE_HISTORY_UPDATE: (id: string) => id,
    HISTORY_INDEX_CHANGE: (index: number) => index,
    NODE_COPY: (node: IRenderTree) => node,
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
    CURRENT_NODE_ID_CHANGE: (state, {payload: id}) => {
      
      return {
        ...state,
        currentNodeId: id,
      };
    },
    NODE_HISTORY_UPDATE: (state, {payload: id}) => {
      return produce(state, draft => {
        updateHistory(draft.nodeHistory, draft.historyIndex, id);
        draft.historyIndex = draft.nodeHistory.length - 1;
      })
    },
    HISTORY_INDEX_CHANGE: (state, {payload: index}) => {
      if (validateIndex(state.nodeHistory, index)) {
        return {
          ...state,
          historyIndex: index,
        }
      } else {
        return {
          ...state,
        }
      }
    },
    NODE_COPY: (state, {payload: node}) => {
      return {
        ...state,
        copyNode: node,
      }
    },
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

function* pasteNodeSaga(params) {
  let { payload: destNode } = params;
  const copyNode = yield select(getCopyNode);
  const flatMap = yield select(getFlatMap);


  try {
    yield put(treePending());

    let req = {
      type: isDirectory(copyNode) ? 'dir' : 'file',
      path: getAbsolutePathIn(flatMap, copyNode.id),
      name: copyNode.name,
      destPath: getAbsolutePathIn(flatMap, destNode.id),
    };
    const updatedAllFile = yield call(pasteNode, req);

    let payload = {
      allFile: updatedAllFile,
      tree: destNode,
    }
    yield put(treeUpdate(payload));
  } catch (error) {
    console.log(error);
    yield put(treeFail(error));
  }
}

export const {getAllFiles, nodeDelete, nodePaste} = createActions(
  { 
    GET_ALL_FILES: (tree: IRenderTree) => tree,
    NODE_DELETE: (tree: IRenderTree) => tree,
    NODE_PASTE: (destPath: string) => destPath,
  },
  options,
)
export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_ALL_FILES`, getAllFileSaga);
  yield takeEvery(`${options.prefix}/NODE_DELETE`, deleteNodeSaga);
  yield takeEvery(`${options.prefix}/NODE_PASTE`, pasteNodeSaga);
}