import React from "react"
import IconComponent from './IconComponent'

interface IMenuToolbarProps {
    list: any
}


export default function MenuToolbar(props: IMenuToolbarProps) {
    const list = props.list ?? [];
    return (
        <div className="menu-toolbar">
            {list.map((comp) => <div className=""><div className="menu-icon tall">{comp.childList.map((child) => <IconComponent {...child}/>)}</div></div>)}
        </div>
    )
}