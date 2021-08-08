import React, { useCallback, useState } from 'react';
import { list } from '../api/fileBrowser';
import http from '../api/http';
import Item from '../components/Item';
import { getAbsolutePath, getNodeById, isDirectory } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface IMainBodyContainerProps {
    currentNode: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
}

export const MainBodyContainer = function({ currentNode, updateChildren, changeCurrentNodeId }: IMainBodyContainerProps){
    // const [items, setItems] = useState<any[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState('');
    
    const changeSelectedNodeId = useCallback((event) => {
        setSelectedNodeId(event.target.id);
    }, []);
    
    const handleDblClick = async () => {
        const selectedNode = getNodeById(currentNode, selectedNodeId);
        if (!isDirectory(selectedNode)) return;

        const allFile = await list(getAbsolutePath(selectedNode))
        updateChildren(selectedNode.id, allFile);
        changeCurrentNodeId(selectedNode.id);     

    }
        
        
    if (!currentNode.children) return null;
    return (
        <div className="body">
            {currentNode.children.map(node => <Item key={node.id} node={node} selectedNodeId={selectedNodeId} changeSelectedNodeId={changeSelectedNodeId} updateChildren={updateChildren} handleDblClick={handleDblClick}/>)}
        </div>
    ) 
}

