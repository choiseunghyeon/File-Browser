import React, { useEffect, useState } from 'react';
import http from '../api/http';
import { getAbsolutePath } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface IMainBodyContainerProps {
    currentNode: IRenderTree,
}

export const MainBodyContainer = function({ currentNode }: IMainBodyContainerProps){
    const [files, setFiles] = useState<any[]>([]);
    

    useEffect(() => {
        async function getFiles () {
            const absolutePath = getAbsolutePath(currentNode);
            const files = await http.get(`http://localhost:3000/all?path=${absolutePath.join('/')}`);
            setFiles(files);
        }
        getFiles();
    }, [currentNode]);

    return (
        <div className="body">
            {files.map(file => <div key={file.name} id={file.name}>{file.name}</div>)}
            {/* {list.map(item => <div key={item.name} id={item.name} >{item.name}</div>)} */}
        </div>
    ) 
}
