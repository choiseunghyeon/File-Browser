import { Item } from "react-contexify";
import http from "../../../api/http";
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
        const absolutePath = getAbsolutePath(node);
        const allFile = await http.get(`http://localhost:3000/all?path=${absolutePath.join('/')}`);
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