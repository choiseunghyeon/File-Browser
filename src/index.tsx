import React from 'react';
import ReactDOM from 'react-dom';
import TopContainer from './container/TopContainer';
import NavigationContainer from './container/NavigationContainer';
import TreeContanier from './container/TreeContanier';
import MainContainer from './container/MainContainer';
import StatusBarContainer from './container/StatusBarContainer';
import Spinner from './component/Spinner';

class AppContainer extends React.Component {

    render(){
        return (
            <div data-reactroot="">
                <div className="app-container">
                    <TopContainer />
                    <NavigationContainer />
                    <TreeContanier />      
                    <MainContainer />
                    <StatusBarContainer />
                </div>
                <Spinner />
            </div>
        )
    }
}

window.onload = () => {
    ReactDOM.render(<AppContainer/>, document.querySelector("#root_react"));
}

