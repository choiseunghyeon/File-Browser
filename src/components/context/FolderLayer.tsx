import { useDefaultTreeDispatch, useNodeCopyDispatch, useNodeDeleteDispatch } from '../../lib/useTree';
import { IRenderTree } from '../../types/common';
import CopyItem from './items/CopyItem';
import FolderOpenItem from './items/FolderOpenItem';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
} 

export default function FolderLayer({node}: ITooltipProps) { 
  const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();
  const deleteNode = useNodeDeleteDispatch();
  const copyNode = useNodeCopyDispatch();
  return (
    <>
      <FolderOpenItem node={node} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory}/>
      <RemoveItem node={node} deleteNode={deleteNode}/> 
      <CopyItem node={node} copyNode={copyNode} />
    </>
  )
       
}