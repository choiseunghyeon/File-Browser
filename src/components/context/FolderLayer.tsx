import React from 'react';
import { Item } from 'react-contexify';
import { layerPathValue } from '../../tests/constValue';
import { IRenderTree } from '../../types/common';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
    updateChildren: Function;
} 

export default function FolderLayer({node, updateChildren}: ITooltipProps) { 
  return (
    <>
      <Item data-testid={layerPathValue}>
          열기
      </Item>
      <RemoveItem node={node} updateChildren={updateChildren} /> 
    </>
  )
       
}