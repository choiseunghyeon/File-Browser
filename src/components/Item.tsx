import { isDirectory } from "../lib/treeUtils";
import { IRenderTree } from "../types/common";

interface Props {
    node: IRenderTree;
    selectedNodeId: string;
    changeSelectedNodeId: (event: any) => void;
    handleDblClick: (event: any) => void;
}

export default function Item({node, selectedNodeId, changeSelectedNodeId, handleDblClick}: Props) {

    return (
        <div id={node.id} onClick={changeSelectedNodeId} onDoubleClick={handleDblClick} style={{
            backgroundColor: selectedNodeId === node.id ? "grey" : "white"
        }} >
            <span>{isDirectory(node) ? '폴더' : '파일' }</span> {node.name}
        </div>
    )
}
