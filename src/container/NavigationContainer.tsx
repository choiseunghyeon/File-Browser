import React, { Component } from 'react'

export default class NavigationContainer extends Component {
    render() {
        return (
            <div className="nav">
                  <ul className="flex">
                     <li><span className="icon left-arrow"></span><span className="icon right-arrow"></span></li>
                     <li className="menu-stack"></li>
                     <li><input placeholder="search title" /></li>
                     <li className="lan-types">
                        <select>
                           <option value="gl-ES" label="Galatia"></option>
                           <option value="ko-KR" label="한국어"></option>
                           <option value="en-US" label="English"></option>
                           <option value="zh-CN" label="??中文"></option>
                           <option value="zh-TW" label="繁體中文"></option>
                           <option value="ja-JP" label="日本語"></option>
                           <option value="vi-VN" label="Vi?t Nam"></option>
                           <option value="es" label="Espanol"></option>
                           <option value="id-ID" label="Indonesian"></option>
                        </select>
                     </li>
                  </ul>
               </div>
        )
    }
}
