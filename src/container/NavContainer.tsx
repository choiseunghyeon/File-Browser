import React, { useMemo } from 'react';
import Path from '../components/Path'
import { getCurrentPath, getNodeById } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface INavContainerProps {
    tree: IRenderTree;
    updateChildren: Function;
    currentNodeId: string;
    changeCurrentNodeId: Function;
}


export default function NavContainer({tree, currentNodeId, changeCurrentNodeId, updateChildren}: INavContainerProps) {
    const currentPath = useMemo(() => {
        const targetNode = getNodeById(tree, currentNodeId);
        return getCurrentPath(targetNode);
    }, [tree, currentNodeId]);

    return (
        <div className="nav">
            <ul className="flex">
                <li>
                    <span className="icon left-arrow"></span>
                    <span className="icon right-arrow"></span>
                </li>
                <li className="menu-stack">
                    {currentPath.map(path => <Path path={path} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren}/>)}
                </li>
            </ul>
        </div>
    )
}
