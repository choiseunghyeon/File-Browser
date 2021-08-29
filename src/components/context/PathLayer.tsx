import { IRenderTree } from '../../types/common';
import { hasDirectory } from '../../lib/treeUtils';
import PathItem from './items/PathItem';
import { useDefaultTreeDispatch } from '../../lib/useTree';


interface ITooltipProps {
    childrenNode: IRenderTree[] | undefined;
} 

export default function PathLayer({childrenNode}: ITooltipProps) {      
  const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();

    if (childrenNode === undefined) return null;

    return (
      <>
      { hasDirectory(childrenNode) 
        ?
          childrenNode.map(node => <PathItem key={node.id} node={node} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} updateNodeHistory={updateNodeHistory}/>)
        : <div>폴더가 없습니다.</div>
      }
      </>
    )
}