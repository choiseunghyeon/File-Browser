import React from 'react';
import { Item } from 'react-contexify';
import { IRenderTree } from '../../types/common';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
    updateChildren: Function;
} 

export default function FileLayer({node, updateChildren}: ITooltipProps) { 
  return (
    <>
      <Item>
          열기
      </Item>
      <RemoveItem node={node} updateChildren={updateChildren}/> 
    </>
  )
       
}