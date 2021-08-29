import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { currentNodeIdChange, getAllFiles, nodeHistoryUpdate } from "../redux/modules/tree";
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