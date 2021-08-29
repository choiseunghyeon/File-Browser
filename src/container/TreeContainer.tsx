import { shallowEqual, useSelector } from 'react-redux';
import MainTree from '../components/MainTree'
import { useDefaultTreeDispatch } from '../lib/useTree';
import { RootState } from '../redux/modules/rootReducer';


export const TreeContainer = function(){
    const {tree, currentNodeId} = useSelector( (state: RootState) => ({
        tree: state.treeState.tree,
        currentNodeId: state.treeState.currentNodeId,
    }), shallowEqual);
    const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();

    return (
        <div className="tree-container" onClick={()=>console.log("bubble!")}>
            <MainTree tree={tree} updateChildren={updateChildren} currentNodeId={currentNodeId} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory} />
        </div>
    ) 
}