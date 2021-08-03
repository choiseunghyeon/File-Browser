import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { useContextMenu } from 'react-contexify';
import { PATH_LAYER_ID } from '../lib/contextUtils';
import { IPath } from '../types/common';
import PathLayer from './context/PathLayer';

interface IPathProps {
    path: IPath;
    changeCurrentNodeId: Function;
    updateChildren: Function;
}

export default function Path({path, changeCurrentNodeId, updateChildren}: IPathProps) {
    const {name, children, id} = path;
    const { show } = useContextMenu();
    
    function displayLayer (e) {
        show(e, {
            id: PATH_LAYER_ID
          })
    }
    return (
        <div>
            <span>
                <span onClick={() => changeCurrentNodeId(id)}>{name}</span>
                {children && children.length > 0 && (
                            <div style={{display: "inline-block"}}>
                            <span onClick={displayLayer}> <ArrowForwardIos style={{fontSize: 12}} /> </span>
                            <PathLayer nodeList={children} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />
                        </div>)
                }
            </span>
        </div>
    )
}

