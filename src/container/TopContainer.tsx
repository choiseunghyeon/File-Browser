import React, { Component } from 'react';
import MenuToolbar from '../component/MenuToolbar';

class TopContainer extends Component {
    render() {
        return (
            <div className="top-container">
                  <div className="tab-toolbar">
                     <div>LOGIN7E</div>
                     <div data-id="SCENARIO" className="active">SCENARIO</div>
                     <div data-id="ANALYZE" className="">ANALYZE</div>
                     <div data-id="SEARCH" className="">SEARCH</div>
                     <div data-id="SETTINGS" className="">SETTINGS</div>
                  </div>
                  < MenuToolbar />
               </div>
        );
    }
}

export default TopContainer;