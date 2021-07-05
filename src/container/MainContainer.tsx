import React from 'react';
import MainHeaderContainer from './MainHeaderContainer';
import { MainBodyContainer } from './MainBodyContainer';

interface IMainContainerProps {
    currentPath: string[],
} 

export function MainContainer (props: IMainContainerProps) {
    return (
        <div className="main-container">
            <MainHeaderContainer />
            <MainBodyContainer {...props}/>
        </div>
    )
}

