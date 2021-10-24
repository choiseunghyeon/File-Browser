import "./resources/app.global.css"
import TopContainer from './container/TopContainer';
import { MainContainer } from './container/MainContainer';
import  NavContainer   from './container/NavContainer';
import { TreeContainer } from './container/TreeContainer';
import StatusbarContainer from './container/StatusBarContainer';
import ContextMenu from './components/context/ContextMenu';
import { MENU_ID } from './lib/contextUtils';
import ItemCreator from './components/context/ItemCreator';

import { Default } from "./container/TopContainer.stories";

export default function App() {
    return (
      <>
        <div className="app-container">
            <TopContainer list={Default.args?.list}/>
            <NavContainer/>
            <TreeContainer/>
            <MainContainer/>
            <StatusbarContainer/>
            {/* <Spinner /> */}
        </div>


        <ContextMenu menuId={MENU_ID}>
         <ItemCreator />
        </ContextMenu>
        
      </>
    )
}

