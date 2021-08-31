import { Item } from 'react-contexify';
import { layerPathValue } from '../../../tests/constValue';
import { ICopyInfo } from '../../../types/common';

interface ICopyItem extends ICopyInfo {
    updateCopyInfo: Function;
}
export default function CopyItem({type, path, name, updateCopyInfo}: ICopyItem) {
    const handleClick = () => {
        updateCopyInfo({
            type,
            path,
            name,
        })
    }

    return (
        <Item data-testid={layerPathValue} onClick={handleClick}>
            복사
        </Item>
    )
}
