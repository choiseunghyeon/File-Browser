import React, { useCallback, useEffect, useState } from 'react';
import http from '../api/http';
import Item from '../components/Item';
import { getAbsolutePath, getNodeById, getNodeByName } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface IMainBodyContainerProps {
    currentNode: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
}

export const MainBodyContainer = function({ currentNode, updateChildren, changeCurrentNodeId }: IMainBodyContainerProps){
    const [items, setItems] = useState<any[]>([]);
    const [selectedName, setSelectedName] = useState('');

    const changeSelectedName = useCallback((event) => {
        setSelectedName(event.target.id);
    }, []);

    const handleDblClick = async () => {
        const selectedNode = getNodeByName(currentNode, selectedName);
        if (selectedNode.children === undefined) {
            const absolutePath = getAbsolutePath(selectedNode);
            const directories = await http.get(`http://localhost:3000/dir?path=${absolutePath.join('/')}`);
            updateChildren(selectedNode.name, directories);
        }

        changeCurrentNodeId(selectedNode.name);     
    }

    useEffect(() => {
        async function getFiles () {
            const absolutePath = getAbsolutePath(currentNode);
            const files = await http.get(`http://localhost:3000/all?path=${absolutePath.join('/')}`);
            setItems(files);
        }
        getFiles();
    }, [currentNode]);

    return (
        <div className="body">
            {items.map(item => <Item key={item.name} name={item.name} selectedName={selectedName} changeSelectedName={changeSelectedName} handleDblClick={handleDblClick}/>)}
        </div>
    ) 
}

