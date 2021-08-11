import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { useCallback } from 'react';
import { useContextMenu } from 'react-contexify';
import { MENU_ID, PATH_LAYER_ID } from '../lib/contextUtils';
import { hasDirectory } from '../lib/treeUtils';
import { IPath } from '../types/common';

interface IPathProps {
    path: IPath;
    changeCurrentNodeId: Function;
    updateChildren: Function;
}

export default function Path({path, changeCurrentNodeId, updateChildren}: IPathProps) {
    const {name, children, id} = path;
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        show(e, {
            props: {
                layerId: PATH_LAYER_ID,
                childrenNode: children,
                changeCurrentNodeId: changeCurrentNodeId,
                updateChildren: updateChildren
            }
        })
    }, [path, changeCurrentNodeId, updateChildren]);
    
    return (
        <div>
            <span>
                <span data-testid="pathSpan" onClick={() => changeCurrentNodeId(id)}>{name}</span>
                {children && hasDirectory(children) && (
                        <div style={{display: "inline-block"}}>
                            <span data-testid="pathNavigation" onClick={(displayLayer)}> <ArrowForwardIos style={{fontSize: 12}} /> </span>
                        </div>)
                }
            </span>
        </div>
    )
}

