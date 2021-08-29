import { Item } from 'react-contexify';
import { layerPathValue } from '../../../tests/constValue';
import { IRenderTree } from '../../../types/common';

interface Props {
    node: IRenderTree;
    deleteNode: Function;
}

export default function RemoveItem({node, deleteNode}: Props) {
    const handleClick = async () => {
        deleteNode(node);
    }
    return (
        <Item data-testid={layerPathValue} onClick={handleClick}>
            삭제
        </Item>
    )
}
