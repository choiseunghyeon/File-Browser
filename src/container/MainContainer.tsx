import MainHeaderContainer from './MainHeaderContainer';
import { MainBodyContainer } from './MainBodyContainer';
import { useDefaultTreeDispatch } from '../lib/useTree';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../redux/modules/rootReducer';
import { useCallback, useMemo } from 'react';
import { getNodeInTree } from '../lib/treeUtils';
import { MAIN_CONTAINER_LAYER_ID, MENU_ID } from '../lib/contextUtils';
import { useContextMenu } from 'react-contexify';
import { emptySpaceValue } from '../tests/constValue';

export function MainContainer () {
    const {tree, currentNodeId} = useSelector( (state: RootState) => ({
        tree: state.treeState.tree,
        currentNodeId: state.treeState.currentNodeId,
    }), shallowEqual);
    const currentNode = useMemo(() => getNodeInTree(tree, currentNodeId), [tree, currentNodeId]);
    const { changeCurrentNodeId, updateNodeHistory, updateChildren} = useDefaultTreeDispatch();

    const { show } = useContextMenu({
        id: MENU_ID,
    });
    const displayLayer = useCallback((e) => {
        show(e, {
            props: {
                layerId: MAIN_CONTAINER_LAYER_ID,
                node: currentNode
            }
        })
    }, [currentNode]);

    return (
        <div className="main-container" onContextMenu={displayLayer}>
            <MainHeaderContainer />
            <MainBodyContainer currentNode={currentNode} updateChildren={updateChildren} changeCurrentNodeId={changeCurrentNodeId} updateNodeHistory={updateNodeHistory}/>
            {/* 테스트용 임시 빈 공간 추후 삭제 예정 */}
            <div style={{height: '20px'}} data-testid={emptySpaceValue}></div> 
        </div>
    )
}

