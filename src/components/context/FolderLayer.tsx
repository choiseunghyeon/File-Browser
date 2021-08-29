import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDefaultTreeDispatch } from '../../lib/useTree';
import { nodeDelete } from '../../redux/modules/tree';
import { IRenderTree } from '../../types/common';
import FolderOpenItem from './items/FolderOpenItem';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
} 

export default function FolderLayer({node}: ITooltipProps) { 
  const dispatch = useDispatch();
  const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();
  const deleteNode = useCallback((node) => {
    dispatch(nodeDelete(node));
  }, []);
  return (
    <>
      <FolderOpenItem node={node} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory}/>
      <RemoveItem node={node} deleteNode={deleteNode}/> 
    </>
  )
       
}