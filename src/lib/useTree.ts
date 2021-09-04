import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { currentNodeIdChange, getAllFiles, nodeCopy, nodeDelete, nodeHistoryUpdate, nodePaste } from "../redux/modules/tree";
import { IRenderTree } from "../types/common";

export function useDefaultTreeDispatch()  {
    const dispatch = useDispatch();

    const changeCurrentNodeId = useCallback((id) => dispatch(currentNodeIdChange(id)), []);
    const updateNodeHistory = useCallback((id) => dispatch(nodeHistoryUpdate(id)), []);
    const updateChildren = useCallback( (tree: IRenderTree) => {
        dispatch(getAllFiles(tree));
      }, []);

    return {
        changeCurrentNodeId,
        updateNodeHistory,
        updateChildren,
    }
    
}

export function useNodeDeleteDispatch (deps = []) {
    const dispatch = useDispatch()

    const deleteNode = useCallback((node: IRenderTree) => {
        dispatch(nodeDelete(node));
      }, deps);
    
    return deleteNode;
}

export function useNodeCopyDispatch (deps = []) {
    const dispatch = useDispatch();

    const copyNode = useCallback((node: IRenderTree) => {
        dispatch(nodeCopy(node));
    }, deps);

    return copyNode;
}

export function useNodePasteDispatch (deps = []) {
    const dispatch = useDispatch();

    const pasteNode = useCallback((destNode: IRenderTree) => {
        dispatch(nodePaste(destNode));
    }, deps);

    return pasteNode;
}