import React, { useMemo } from 'react';
import Path from '../components/Path'
import { getCurrentPath } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface INavContainerProps {
    updateChildren: Function;
    changeCurrentNodeId: Function;
    currentNode: IRenderTree;   
}


export default function NavContainer({currentNode, changeCurrentNodeId, updateChildren}: INavContainerProps) {
    const currentPath = useMemo(() => getCurrentPath(currentNode), [currentNode]);

    return (
        <div className="nav">
            <ul className="flex">
                <li>
                    <span className="icon left-arrow"></span>
                    <span className="icon right-arrow"></span>
                </li>
                <li className="menu-stack">
                    {currentPath.map(path => <Path path={path} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />)}
                </li>
            </ul>
        </div>
    )
}
