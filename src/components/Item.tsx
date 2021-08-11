import { useCallback } from "react";
import { useContextMenu } from "react-contexify";
import { FILE_LAYER_ID, FOLDER_LAYER_ID, MENU_ID } from "../lib/contextUtils";
import { isDirectory } from "../lib/treeUtils";
import { IRenderTree } from "../types/common";

interface Props {
    node: IRenderTree;
    selectedNodeId: string;
    changeSelectedNodeId: (event: any) => void;
    handleDblClick: (event: any) => void;
    updateChildren: Function;
}

export default function Item({node, selectedNodeId, changeSelectedNodeId, handleDblClick, updateChildren}: Props) {
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        changeSelectedNodeId(e);
        show(e, {
            props: {
                layerId: isDirectory(node) ? FOLDER_LAYER_ID : FILE_LAYER_ID,
                node: node,
                updateChildren: updateChildren,
            }
        })
    }, [changeSelectedNodeId, node, updateChildren]);

    return (
        <div data-testid="item" id={node.id} onClick={changeSelectedNodeId} onDoubleClick={handleDblClick} onContextMenu={displayLayer} style={{
            backgroundColor: selectedNodeId === node.id ? "grey" : "white"
        }} >
            <span>{isDirectory(node) ? '폴더' : '파일' }</span> {node.name}
        </div>
    )
}
