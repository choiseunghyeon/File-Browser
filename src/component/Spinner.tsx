import React, { Component } from 'react';

class Spinner extends Component {
    render() {
        return (
            <div id="spinner" style={{display: "block"}}>
               <div className="react-spinner">
                  <div className="react-spinner_bar a"></div>
                  <div className="react-spinner_bar b"></div>
                  <div className="react-spinner_bar c"></div>
                  <div className="react-spinner_bar d"></div>
                  <div className="react-spinner_bar e"></div>
                  <div className="react-spinner_bar f"></div>
                  <div className="react-spinner_bar g"></div>
                  <div className="react-spinner_bar h"></div>
                  <div className="react-spinner_bar i"></div>
                  <div className="react-spinner_bar j"></div>
                  <div className="react-spinner_bar k"></div>
                  <div className="react-spinner_bar l"></div>
               </div>
            </div>
        );
    }
}

export default Spinner;