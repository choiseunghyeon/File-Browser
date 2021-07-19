import MainHeaderContainer from './MainHeaderContainer';
import { MainBodyContainer } from './MainBodyContainer';
import { IRenderTree } from '../types/common';

interface IMainContainerProps {
    currentNode: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export function MainContainer (props: IMainContainerProps) {
    return (
        <div className="main-container">
            <MainHeaderContainer />
            <MainBodyContainer {...props}/>
        </div>
    )
}

