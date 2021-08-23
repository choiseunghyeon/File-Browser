import { useMemo, useCallback } from 'react';
import "./resources/app.global.css"
import TopContainer from './container/TopContainer';
import { MainContainer } from './container/MainContainer';
import  NavContainer   from './container/NavContainer';
import { TreeContainer } from './container/TreeContainer';
import StatusbarContainer from './container/StatusBarContainer';
import ContextMenu from './components/context/ContextMenu';
import { getNodeById } from './lib/treeUtils';
import { MENU_ID } from './lib/contextUtils';
import ItemCreator from './components/context/ItemCreator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/modules/rootReducer';
import { currentNodeIdChange, getAllFiles } from './redux/modules/tree';


export default function App() {
    const dispatch = useDispatch();
    const { tree, currentNodeId } = useSelector( (state: RootState) => ({
      tree: state.treeState.tree,
      currentNodeId: state.treeState.currentNodeId,
    }), shallowEqual);

    const currentNode = useMemo(() => getNodeById(tree, currentNodeId), [tree, currentNodeId]);
    
    const changeCurrentNodeId = useCallback((id) => dispatch(currentNodeIdChange(id)), []);

    const updateChildren = useCallback( (tree) => {
        dispatch(getAllFiles(tree));
      }, []);

    return (
      <>
        <div className="app-container">
            <TopContainer/>
            <NavContainer currentNode={currentNode} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} />
            <TreeContainer tree={tree} updateChildren={updateChildren} currentNodeId={currentNodeId} changeCurrentNodeId={changeCurrentNodeId}/>
            <MainContainer currentNode={currentNode} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} />
            <StatusbarContainer/>
            {/* <Spinner /> */}
        </div>


        <ContextMenu menuId={MENU_ID}>
         <ItemCreator />
        </ContextMenu>
        
      </>
    )
}

