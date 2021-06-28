import React, { Component } from 'react';

class StatusBarContainer extends Component {
    render() {
        return (
          <div className="statusbar-container">
                <span className="status" style={{padding: "4px 10px"}}>
                    <span>0 items</span>
                    <span></span>
                    </span>
                    <span className="icon display_detail"></span>
                <span className="icon display_list active"></span>
            </div>
        );
    }
}

export default StatusBarContainer;