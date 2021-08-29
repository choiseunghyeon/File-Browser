import { useCallback, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Path from '../components/Path'
import { getCurrentPath, validateIndex } from '../lib/treeUtils';
import { useDefaultTreeDispatch } from '../lib/useTree';
import { RootState } from '../redux/modules/rootReducer';
import { historyIndexChange } from '../redux/modules/tree';
import { nextPathValue, previousPathValue } from '../tests/constValue';


export default function NavContainer() {
    const dispatch = useDispatch();
    const { currentNodeId, flatMap, historyIndex, nodeHistory} = useSelector( (state: RootState) => ({
        currentNodeId: state.treeState.currentNodeId,
        flatMap: state.treeState.flatMap,
        historyIndex: state.treeState.historyIndex,
        nodeHistory: state.treeState.nodeHistory,
    }), shallowEqual);
    const { changeCurrentNodeId, updateNodeHistory } = useDefaultTreeDispatch();
    const currentPath = useMemo(() => getCurrentPath(flatMap, currentNodeId), [flatMap, currentNodeId]);


    const changeHistoryIndex = useCallback(
        (index) => dispatch(historyIndexChange(index)), [])
    
    const movePreviousPath = () => {
        const previousIndex = historyIndex - 1;
        const previousNodeId = nodeHistory[previousIndex];

        if (!validateIndex(nodeHistory, previousIndex)) return;

        changeCurrentNodeId(previousNodeId);
        changeHistoryIndex(previousIndex);
    };

    const moveNextPath = () => {
        const nextIndex = historyIndex + 1;
        const nextNodeId = nodeHistory[nextIndex];
        
        if (!validateIndex(nodeHistory, nextIndex)) return;

        changeCurrentNodeId(nextNodeId);
        changeHistoryIndex(nextIndex)
    }

    if (!currentPath) return null;

    return (
        <div className="nav">
            <ul className="flex">
                <li>
                    <span data-testid={previousPathValue} className="icon left-arrow" onClick={movePreviousPath}></span>
                    <span data-testid={nextPathValue} className="icon right-arrow" onClick={moveNextPath}></span>
                </li>
                <li className="menu-stack">
                    {
                        currentPath
                        .map(path => <Path path={path} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory}/>)
                    }
                </li>
            </ul>
        </div>
    )
}
