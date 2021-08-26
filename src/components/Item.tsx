import { useCallback } from "react";
import { useContextMenu } from "react-contexify";
import { FILE_LAYER_ID, FOLDER_LAYER_ID, MENU_ID } from "../lib/contextUtils";
import { isDirectory } from "../lib/treeUtils";
import { IRenderTree } from "../types/common";
import { itemValue } from '../tests/constValue';
interface Props {
    node: IRenderTree;
    selectedNodeId: string;
    changeSelectedNodeId: (event: any) => void;
    handleDblClick: (event: any) => void;
    updateChildren: Function;
    changeCurrentNodeId: Function;
}

export default function Item({node, selectedNodeId, changeSelectedNodeId, handleDblClick, updateChildren, changeCurrentNodeId}: Props) {
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        // ref: 개선 layer에 넘겨주기 위해 props drilling이 심함 개선하기
        changeSelectedNodeId(e);
        show(e, {
            props: {
                layerId: isDirectory(node) ? FOLDER_LAYER_ID : FILE_LAYER_ID,
                node: node,
                updateChildren: updateChildren,
                changeCurrentNodeId: changeCurrentNodeId,
            }
        })
    }, [changeSelectedNodeId, node, updateChildren, changeCurrentNodeId]);

    return (
        <div data-testid={itemValue} id={node.id} onClick={changeSelectedNodeId} onDoubleClick={handleDblClick} onContextMenu={displayLayer} style={{
            backgroundColor: selectedNodeId === node.id ? "grey" : "white"
        }} >
            <span>{isDirectory(node) ? '폴더' : '파일' }</span> {node.name}
        </div>
    )
}
