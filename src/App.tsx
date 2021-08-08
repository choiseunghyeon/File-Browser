import React, { useState, useMemo, useCallback} from 'react';
import "./resources/app.global.css"
import TopContainer from './container/TopContainer';
import { MainContainer } from './container/MainContainer';
import  NavContainer   from './container/NavContainer';
import { TreeContainer } from './container/TreeContainer';
import StatusbarContainer from './container/StatusBarContainer';
import ContextMenu from './components/context/ContextMenu';
import produce from 'immer';
import { createTreeData, getNodeById } from './lib/treeUtils';
import { IRenderTree } from './types/common';
import { useContextMenu } from 'react-contexify';
import { MENU_ID } from './lib/contextUtils';
import ItemCreator from './components/context/ItemCreator';

const initialPath = "C:/";

const initialData: IRenderTree = {
  id: "root",
  name: initialPath,
  type: 'dir',
  parentNode: null,
};

export default function App() {
    const [tree, setTree] = useState(initialData);
    const [currentNodeId, setCurrentNodeId] = useState('root')

    const currentNode = useMemo(() => getNodeById(tree, currentNodeId), [tree, currentNodeId]);
    
    const changeCurrentNodeId = useCallback((id) => setCurrentNodeId(id), []);

    const updateChildren = useCallback( (id, allFile) => {
        // 공간 복잡도 늘리고 시간 복잡도 낮추는 식으로 array -> map으로 변환해서 가지고 있기
        setTree((prevTree) => {
          return produce(prevTree, draft => {
            const targetNode = getNodeById(draft, id);
            const children = allFile.map(file => createTreeData(targetNode, file));
            targetNode.children = children;
          })
        })
      }, []);

    const { show } = useContextMenu({
      id: MENU_ID,
    });


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

