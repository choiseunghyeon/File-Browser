import { useSelector } from 'react-redux';
import { useNodePasteDispatch } from '../../lib/useTree';
import { RootState } from '../../redux/modules/rootReducer';
import { IRenderTree } from '../../types/common';
import PasteItem from './items/PasteItem';

interface ITooltipProps {
  node: IRenderTree;
} 

export default function MainContainerLayer({node}: ITooltipProps) {      
    const pasteNode = useNodePasteDispatch();

    return (
      <>
        <PasteItem node={node} pasteNode={pasteNode} />
      </>
    )
}