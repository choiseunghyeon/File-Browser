import { IRenderTree } from '../../types/common';
import { hasDirectory } from '../../lib/treeUtils';
import PathItem from './items/PathItem';


interface ITooltipProps {
    childrenNode: IRenderTree[] | undefined;
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export default function PathLayer({childrenNode, updateChildren, changeCurrentNodeId}: ITooltipProps) {      
    if (childrenNode === undefined) return null;

    return (
      <>
      { hasDirectory(childrenNode) 
        ?
          childrenNode.map(node => <PathItem key={node.id} node={node} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />)
        : <div>폴더가 없습니다.</div>
      }
      </>
    )
}