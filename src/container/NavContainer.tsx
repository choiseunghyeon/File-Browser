import React, { useMemo } from 'react';
import Path from '../components/Path'
import { getCurrentPath } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';

interface INavContainerProps {
    updateChildren: Function;
    changeCurrentNodeId: Function;
    currentPath: any;   
}


export default function NavContainer({currentPath, changeCurrentNodeId, updateChildren}: INavContainerProps) {
    console.log(currentPath);
    if (!currentPath) return null;
    return (
        <div className="nav">
            <ul className="flex">
                <li>
                    <span className="icon left-arrow"></span>
                    <span className="icon right-arrow"></span>
                </li>
                <li className="menu-stack">
                    {
                        currentPath
                        .map(path => <Path path={path} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />)
                    }
                </li>
            </ul>
        </div>
    )
}
