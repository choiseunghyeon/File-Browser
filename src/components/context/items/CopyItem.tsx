import { Item } from 'react-contexify';
import { layerPathValue } from '../../../tests/constValue';
import { IRenderTree } from '../../../types/common';

interface ICopyItem {
    copyNode: Function;
    node: IRenderTree;
}
export default function CopyItem({node, copyNode}: ICopyItem) {
    const handleClick = () => {
        copyNode(node);
    }

    return (
        <Item data-testid={layerPathValue} onClick={handleClick}>
            복사
        </Item>
    )
}
