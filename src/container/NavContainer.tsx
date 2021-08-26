import React, { useCallback } from 'react';
import Path from '../components/Path'
import { getCurrentPath } from '../lib/treeUtils';
import { nextPathValue, previousPathValue } from '../tests/constValue';
import { IRenderTree } from '../types/common';

interface INavContainerProps {
    updateChildren: Function;
    changeCurrentNodeId: Function;
    currentPath: any;   
}


export default function NavContainer({currentPath, changeCurrentNodeId, updateChildren}: INavContainerProps) {
    if (!currentPath) return null;
    
    const movePreviousPath = () => {
        const lastPathIndex = currentPath.length - 1;
        const previousNodeId = currentPath[lastPathIndex - 1].id;
        changeCurrentNodeId(previousNodeId);
    };

    const moveNextPath = () => {
        
    }

    return (
        <div className="nav">
            <ul className="flex">
                <li>
                    <span data-testid={previousPathValue} className="icon left-arrow" onClick={movePreviousPath}></span>
                    <span data-testid={nextPathValue} className="icon right-arrow"></span>
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
