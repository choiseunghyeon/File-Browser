import { useCallback } from "react";
import { useContextMenu } from "react-contexify";
import { FILE_LAYER_ID, FOLDER_LAYER_ID, MENU_ID } from "../lib/contextUtils";
import { isDirectory } from "../lib/treeUtils";
import { IRenderTree, ITree } from "../types/common";
import { itemValue } from '../tests/constValue';
export interface IItemProps{
    node: IRenderTree;
    selectedNodeId: string;
    display?: boolean;
    changeSelectedNodeId: (event: any) => void;
    handleDblClick: (event: any) => void;
    updateChildren: Function;
    changeCurrentNodeId: Function;
    updateNodeHistory: Function;
}

export default function Item({display = false, node, selectedNodeId, changeSelectedNodeId, handleDblClick, updateChildren, changeCurrentNodeId, updateNodeHistory}: IItemProps) {
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        // ref: 개선 layer에 넘겨주기 위해 props drilling이 심함 개선하기
        e.stopPropagation();
        changeSelectedNodeId(e);
        show(e, {
            props: {
                layerId: isDirectory(node) ? FOLDER_LAYER_ID : FILE_LAYER_ID,
                node: node,
            }
        })
    }, [node]);

    if (display === false) return null;

    return (
        <div data-testid={itemValue} id={node.id} onClick={changeSelectedNodeId} onDoubleClick={handleDblClick} onContextMenu={displayLayer} style={{
            backgroundColor: selectedNodeId === node.id ? "grey" : "white"
        }} >
            <span>{isDirectory(node) ? '폴더' : '파일' }</span> {node.name}
        </div>
    )
}
