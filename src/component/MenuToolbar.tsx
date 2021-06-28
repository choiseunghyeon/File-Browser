import React, { Component } from 'react'
import MenuIcon from './MenuIcon'

interface MenuIconType {
   menuId: string,
   className: string,
   name: string,
}

interface Menu {
   name: string,
   size: string,
   menuIcons: MenuIconType[],
}
const menus: Menu[] = [
   {
      name: "edit",
      size: "tall", 
      menuIcons: [
         { 
            menuId: "copy",
            className: "disabled",
            name: "Copy",
         },
         { 
            menuId: "paste",
            className: "disabled",
            name: "Paste",
         },
         { 
            menuId: "delete",
            className: "disabled",
            name: "Delete",
         },
      ]
   },
   {
      name: "new",
      size: "tall",
      menuIcons: [
         { 
            menuId: "new-folder",
            className: "disabled",
            name: "Folder",
         },
         { 
            menuId: "new-tutorial",
            className: "disabled",
            name: "Tutorial",
         },
      ]
   },
   {
      name: "selection",
      size: "tall",
      menuIcons: [
         { 
            menuId: "select-all",
            className: "disabled",
            name: "All",
         },
         { 
            menuId: "select-reverse",
            className: "disabled",
            name: "Reverse",
         },
         { 
            menuId: "select-unselect",
            className: "disabled",
            name: "Unselect",
         },
      ]
   },
   {
      name: "search filter",
      size: "small",
      menuIcons: [
         { 
            menuId: "search-title",
            className: "disabled",
            name: "Title",
         },
         { 
            menuId: "search-modifier",
            className: "disabled",
            name: "Modifier",
         },
         { 
            menuId: "search-scene",
            className: "disabled",
            name: "Scene",
         },
      ]
   },
   {
      name: "service",
      size: "tall",
      menuIcons: [
         { 
            menuId: "apply-service-on",
            className: "disabled",
            name: "Sevice-On",
         },
         { 
            menuId: "apply-service-off",
            className: "disabled",
            name: "Service-Off",
         },
      ]
   },
   {
      name: "mapping",
      size: "tall",
      menuIcons: [
         { 
            menuId: "mapping-mapping",
            className: "disabled",
            name: "Sevice-On",
         },
      ]
   },
   {
      name: "export",
      size: "tall",
      menuIcons: [
         { 
            menuId: "export-excel",
            className: "disabled",
            name: "excel",
         },
      ]
   },
]

export default class MenuToolbar extends Component {
    render() {
        return (
            <div className="menu-toolbar">
               {menus.map(({name, size, menuIcons}) => {
                  return (<div key={name} className="">
                              <div className={`menu-icon ${size}`}>
                                 {menuIcons.map(({menuId, className, name}) => <MenuIcon key={menuId} menuId={menuId} className={className} name={name} size={size} />)}
                              </div>
                              <div>{name}</div>
                           </div>)
               })}
            </div>
        )
    }
}
