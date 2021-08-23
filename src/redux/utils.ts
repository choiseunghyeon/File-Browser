import { IRenderTree } from '../types/common';

const initialPath = "C:/";

const initialData: IRenderTree = {
  id: "root",
  name: initialPath,
  type: 'dir',
  parentNode: null,
};

export const reducerUtils = {
  init(){
    return {
      tree: initialData,
      currentNodeId: 'root',
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
      loading: false,
      error,
    }
  },
}