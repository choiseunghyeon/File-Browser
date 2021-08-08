import {
    Menu,
  } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

interface Props {
    menuId: string;
    children?: React.ReactElement
}

export default function ContextMenu({menuId, children}) {
    return (
        <Menu id={menuId}>
          {children}
        </Menu>
    )
}
