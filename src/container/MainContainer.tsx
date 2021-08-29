import MainHeaderContainer from './MainHeaderContainer';
import { MainBodyContainer } from './MainBodyContainer';
import { IRenderTree } from '../types/common';
import { useDefaultTreeDispatch } from '../lib/useTree';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules/rootReducer';
import { useMemo } from 'react';
import { getNodeInTree } from '../lib/treeUtils';

export function MainContainer () {
    const {tree, currentNodeId} = useSelector( (state: RootState) => ({
        tree: state.treeState.tree,
        currentNodeId: state.treeState.currentNodeId,
    }), shallowEqual);
    const currentNode = useMemo(() => getNodeInTree(tree, currentNodeId), [tree, currentNodeId]);
    const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();

    return (
        <div className="main-container">
            <MainHeaderContainer />
            <MainBodyContainer currentNode={currentNode} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory}/>
        </div>
    )
}

