import { Item } from 'react-contexify';
import { deleteFile, deleteFolder, list } from '../../../api/fileBrowser';
import { getAbsolutePath, isDirectory } from '../../../lib/treeUtils';
import { IRenderTree } from '../../../types/common';

interface Props {
    node: IRenderTree;
    updateChildren: Function;
}

export default function RemoveItem({node, updateChildren}: Props) {

    const handleClick = async () => {
        if (isDirectory(node)) {
            await deleteFolder(getAbsolutePath(node));
        } else {
            await deleteFile(getAbsolutePath(node));
        }
        
        const parentNode = node.parentNode;
        const allFile = await list(getAbsolutePath(parentNode))
        if (parentNode !== null) {
            updateChildren(parentNode.id, allFile);
        }
    }
    console.log(node);
    return (
        <Item onClick={handleClick}>
            삭제
        </Item>
    )
}
