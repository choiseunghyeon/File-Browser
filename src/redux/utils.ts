import { changeTreeIntoFlatMap } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

const initialPath = "C:/";

const initialData: IRenderTree = {
  id: "root",
  name: initialPath,
  type: 'dir',
  parentNodeId: null,
};

export const reducerUtils = {
  init(){
    return {
      tree: initialData,
      currentNodeId: 'root',
      flatMap: changeTreeIntoFlatMap(initialData),
      nodeHistory: [],
      historyIndex: 0,
      copyNode: null,
      loading: false,
      error: null,
    }
  },
  pending(state){
    return {
      ...state,
      loading: true,
      error: null,
    }
  },
  error(error){
    return {
      tree: initialData,
      currentNodeId: 'root',
      nodeHistory: [],
      historyIndex: 0,
      copyNode: null,
      flatMap: changeTreeIntoFlatMap(initialData),
      loading: false,
      error,
    }
  },
}



export const getFlatMap = state => state.treeState.flatMap;
export const getCopyNode = state => state.treeState.copyNode;