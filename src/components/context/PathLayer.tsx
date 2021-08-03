import {
  Menu,
  Item,
  Separator,
  Submenu,
  ItemParams
} from "react-contexify";
import { IRenderTree } from '../../types/common';
import { hasDirectory } from '../../lib/treeUtils';
import PathItem from './items/PathItem';
import { PATH_LAYER_ID } from "../../lib/contextUtils";


interface ITooltipProps {
    nodeList: IRenderTree[];
    updateChildren: Function;
    changeCurrentNodeId: Function;
} 

export default function PathLayer({nodeList, updateChildren, changeCurrentNodeId}: ITooltipProps) {
    return (
      <Menu id={PATH_LAYER_ID}>
      { hasDirectory(nodeList) 
        ?
          nodeList.map(node => <PathItem key={node.id} node={node} changeCurrentNodeId={changeCurrentNodeId} updateChildren={updateChildren} />)
        : <div>폴더가 없습니다.</div>
      }
      </Menu>
    )
}