import { Item } from "react-contexify";
import { isDirectory } from "../../../lib/treeUtils";
import { IRenderTree } from "../../../types/common";
import { layerPathValue } from '../../../tests/constValue';
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
        updateChildren(node);
      }
  
      changeCurrentNodeId(id);    
    }
  
    return (
      <Item onClick={handleClick} data-testid={layerPathValue}>
        {name}
      </Item>
    )
  }