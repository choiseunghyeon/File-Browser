import { useState } from 'react';
import { IRenderTree } from '../types/common';
import { getAbsolutePath, hasDirectory, isDirectory } from '../lib/treeUtils';
import http from '../api/http';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import Popover from '@material-ui/core/Popover';


interface ITooltipProps {
    nodeList: IRenderTree[];
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export default function LayerComponent(props: ITooltipProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    return (
        (
            <div style={{display: "inline-block"}}>
              <span onClick={handleClick}> <ArrowForwardIos style={{fontSize: 12}} /> </span>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Layer {...props} closeLayer={handleClose} />
                {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
              </Popover>
            </div>
        )
    )
}


interface ILayoutProps {
    nodeList: IRenderTree[];
    updateChildren: Function;
    changeCurrentNodeId: Function;
    closeLayer: Function;
}

function Layer ({nodeList, updateChildren, changeCurrentNodeId, closeLayer}: ILayoutProps) {
    
    return (
        <>
          { hasDirectory(nodeList) 
            ?
             nodeList.map(node => <Node key={node.id} node={node} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} closeLayer={closeLayer} />)
            : <div>폴더가 없습니다.</div>
          }
          
        </>
    )
}

interface INodeProps {
  node: IRenderTree;
  updateChildren: Function;
  changeCurrentNodeId: Function;
  closeLayer: Function;
}

function Node ({node, updateChildren, changeCurrentNodeId, closeLayer}: INodeProps) {
  const {id, name, children} = node

  if (!isDirectory(node)) return null;

  const handleClick = async () => {
    if (typeof children === "undefined") {
      const absolutePath = getAbsolutePath(node);
      const allFile = await http.get(`http://localhost:3000/all?path=${absolutePath.join('/')}`);
      updateChildren(id, allFile);
    }

    changeCurrentNodeId(id);    
    
    closeLayer();
  }

  return (
    <div onClick={handleClick}>
      {name}
    </div>
  )
}