import { IPath } from '../types/common';
import LayerComponent from './LayerComponent';
interface IPathProps {
    path: IPath;
    changeCurrentNodeId: Function;
    updateChildren: Function;
}

export default function Path({path, changeCurrentNodeId, updateChildren}: IPathProps) {
    const {name, children, id} = path;


    return (<div>
                <span>
                    <span onClick={() => changeCurrentNodeId(id)}>{name}</span>
                    {children && children.length > 0 && <LayerComponent nodeList={children} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />}
                </span>
            </div>)
}
