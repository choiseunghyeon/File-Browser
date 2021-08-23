import { Item } from 'react-contexify';
import { useDispatch } from 'react-redux';
import { deleteNode } from '../../../redux/modules/tree';
import { IRenderTree } from '../../../types/common';

interface Props {
    node: IRenderTree;
    updateChildren: Function;
}

export default function RemoveItem({node, updateChildren}: Props) {
    const dispatch = useDispatch();
    const handleClick = async () => {
        dispatch(deleteNode(node))
    }
    return (
        <Item onClick={handleClick}>
            삭제
        </Item>
    )
}
