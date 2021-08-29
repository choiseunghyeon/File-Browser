import React, { useCallback } from 'react';
import { Item } from 'react-contexify';
import { useDispatch } from 'react-redux';
import { nodeDelete } from '../../redux/modules/tree';
import { IRenderTree } from '../../types/common';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
} 

export default function FileLayer({node}: ITooltipProps) { 
  const dispatch = useDispatch();
  const deleteNode = useCallback((node) => {
    dispatch(nodeDelete(node));
  }, []);
  return (
    <>
      <Item>
          열기
      </Item>
      <RemoveItem node={node} deleteNode={deleteNode}/> 
    </>
  )
}