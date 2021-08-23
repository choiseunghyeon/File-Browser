import { combineReducers } from 'redux';

import treeState, { TreeState } from './tree';

export interface RootState {
    treeState: TreeState;
}

const rootReducer = () =>
  combineReducers({
    treeState,
  });

export default rootReducer;