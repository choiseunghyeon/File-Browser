import { IPath } from '../types/common';
import TooltipComponent from '../components/TooltipComponent';
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
                    {children && children.length > 0 && <TooltipComponent items={children} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />}
                </span>
            </div>)
}
