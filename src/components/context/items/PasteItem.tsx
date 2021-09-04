import { Item } from 'react-contexify';
import { layerPathValue } from '../../../tests/constValue';
import { IRenderTree } from '../../../types/common';

interface Props {
    node: IRenderTree;
    pasteNode: Function;
}

export default function PasteItem({node, pasteNode}: Props) {
    const handleClick = async () => {
        pasteNode(node);
    }
    return (
        <Item data-testid={layerPathValue} onClick={handleClick}>
            붙여넣기
        </Item>
    )
}
