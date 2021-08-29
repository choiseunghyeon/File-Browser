import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { useCallback } from 'react';
import { useContextMenu } from 'react-contexify';
import { MENU_ID, PATH_LAYER_ID } from '../lib/contextUtils';
import { hasDirectory } from '../lib/treeUtils';
import { IPath } from '../types/common';
import { pathValue, pathArrowValue } from '../tests/constValue';

interface IPathProps {
    path: IPath;
    changeCurrentNodeId: Function;
    updateNodeHistory: Function;
}

export default function Path({path, changeCurrentNodeId, updateNodeHistory}: IPathProps) {
    const {name, children, id} = path;
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        show(e, {
            props: {
                layerId: PATH_LAYER_ID,
                childrenNode: children,
            }
        })
    }, [path]);
    
    const handleClick = useCallback((e) => {
        changeCurrentNodeId(id);
        updateNodeHistory(id)
    }, [id])
    return (
        <div>
            <span>
                <span data-testid={pathValue} onClick={handleClick}>{name}</span>
                {children && hasDirectory(children) && (
                        <div style={{display: "inline-block"}}>
                            <span data-testid={pathArrowValue} onClick={(displayLayer)}> <ArrowForwardIos style={{fontSize: 12}} /> </span>
                        </div>)
                }
            </span>
        </div>
    )
}

