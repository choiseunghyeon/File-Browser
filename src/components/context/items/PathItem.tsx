import { Item } from "react-contexify";
import { list } from "../../../api/fileBrowser";
import { getAbsolutePath, isDirectory } from "../../../lib/treeUtils";
import { IRenderTree } from "../../../types/common";

interface INodeProps {
    node: IRenderTree;
    updateChildren: Function;
    changeCurrentNodeId: Function;
  }
  
  export default function PathItem ({node, updateChildren, changeCurrentNodeId}: INodeProps) {
    const {id, name, children} = node
  
    if (!isDirectory(node)) return null;
  
    const handleClick = async () => {
      if (typeof children === "undefined") {
        const allFile = await list(getAbsolutePath(node));
        updateChildren(id, allFile);
      }
  
      changeCurrentNodeId(id);    
    }
  
    return (
      <Item onClick={handleClick}>
        {name}
      </Item>
    )
  }