import React, { useState } from 'react'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { IRenderTree } from '../types/common';
import Tooltip from '@material-ui/core/Tooltip';
import { getAbsolutePath } from '../lib/treeUtils';
import http from '../api/http';


interface ITooltipProps {
    items: IRenderTree[];
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export default function TooltipComponent(props: ITooltipProps) {
    return (
        (
            <div style={{display: "inline-block"}}>
              <Tooltip
                interactive
                title={<Layer {...props} />}
              >
                <span><ArrowForwardIos style={{fontSize: 12}} /></span>
              </Tooltip>
            </div>
        )
    )
}


interface ILayoutProps {
    items: IRenderTree[];
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 
function Layer (props: ILayoutProps) {
    return (
        <>
           {props.items.map(item => <Item key={item.id} item={item} changeCurrentNodeId={props.changeCurrentNodeId} updateChildren={props.updateChildren} />)}
        </>
    )
}

function Item (props: any) {
  const {id, name, children} = props.item

  const handleClick = async () => {
    if (typeof children === "undefined") {
      const absolutePath = getAbsolutePath(props.item);
      const directories = await http.get(`http://localhost:3000/dir?path=${absolutePath.join('/')}`);
      props.updateChildren(id, directories);
    }

    props.changeCurrentNodeId(id);     
  }
  return (
    <div onClick={handleClick}>
      {name}
    </div>
  )
}