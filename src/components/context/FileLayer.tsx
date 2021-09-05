import React, { useCallback } from 'react';
import { Item } from 'react-contexify';
import { useDispatch } from 'react-redux';
import { useNodeCopyDispatch, useNodeDeleteDispatch } from '../../lib/useTree';
import { nodeDelete } from '../../redux/modules/tree';
import { layerPathValue } from '../../tests/constValue';
import { IRenderTree } from '../../types/common';
import CopyItem from './items/CopyItem';
import RemoveItem from './items/RemoveItem';


interface ITooltipProps {
    node: IRenderTree;
} 

export default function FileLayer({node}: ITooltipProps) { 
  const deleteNode = useNodeDeleteDispatch();
  const copyNode = useNodeCopyDispatch();
  return (
    <>
      <Item data-testid={layerPathValue}>
          열기
      </Item>
      <RemoveItem node={node} deleteNode={deleteNode}/> 
      <CopyItem node={node} copyNode={copyNode} />
    </>
  )
}