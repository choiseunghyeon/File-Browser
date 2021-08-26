import { IRenderTree } from '../../types/common';
import FolderOpenItem from './items/FolderOpenItem';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export default function FolderLayer({node, updateChildren, changeCurrentNodeId}: ITooltipProps) { 
  return (
    <>
      <FolderOpenItem node={node} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId}/>
      <RemoveItem node={node} /> 
    </>
  )
       
}