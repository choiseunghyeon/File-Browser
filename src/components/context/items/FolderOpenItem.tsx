import { Item } from 'react-contexify';
import { layerPathValue } from '../../../tests/constValue';
import { IRenderTree } from '../../../types/common';

interface Props {
    node: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
    updateNodeHistory: Function;
}

export default function FolderOpenItem({node, updateChildren, changeCurrentNodeId, updateNodeHistory}: Props) {
    const handleClick = async () => {
        updateChildren(node);
        changeCurrentNodeId(node.id);
        updateNodeHistory(node.id);
    }
    return (
        <Item data-testid={layerPathValue} onClick={handleClick}>
            열기
        </Item>
    )
}
