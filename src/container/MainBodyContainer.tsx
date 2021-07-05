import React, { useEffect, useState } from 'react';

interface IMainBodyContainerProps {
    currentPath: string[];
}

export const MainBodyContainer = function(props: IMainBodyContainerProps){
    const [list, setList] = useState([]);

    // function changePath(event){
    //     props.changePath([props.currentPath, event.target.id].join("/"));
    // }

    useEffect(() => {
        async function fetchDir(path) {
            const dirList = await (await fetch(`http://localhost:3000/all?path=${path}`)).json();
            setList(dirList)
        }
        fetchDir(props.currentPath)
    }, [props.currentPath]);

    return (
        <div className="body">
            {/* {list.map(item => <div key={item.name} id={item.name} >{item.name}</div>)} */}
        </div>
    ) 
}
