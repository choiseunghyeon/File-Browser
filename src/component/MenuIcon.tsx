import React, { Component } from 'react'

interface MenuIconProps {
    menuId: string,
    name: string,
    className: string,
    size: string,
}

export default class MenuIcon extends Component<MenuIconProps> {
    
    render() {
        return (
            <div data-menuid={this.props.menuId} className={this.props.className}>
                <div><span className={`icon ${this.props.size} ${this.props.menuId}`}></span></div>
                <div>{this.props.name}</div>
            </div>
        )
    }
}
