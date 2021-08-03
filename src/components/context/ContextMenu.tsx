import {
    Menu,
    Item,
    Separator,
    Submenu,
    ItemParams
  } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

interface Props {
    menuId: string;
    children?: React.ReactElement
}

export default function ContextMenu({menuId, children}) {
    function handleItemClick({ event, props, data, triggerEvent }: ItemParams<any, any>) {
        // ⚠️ data and triggerEvent are not used. I've just added them so we have the full list of parameters
    
        // I use the id attribute defined on the `Item` to identify which one is it
        // this feel natural to my brain
        switch (event.currentTarget.id) {
          case "remove":
            // logic to remove the row
            console.log(props.id); // contain to item.id passed by `show`
            break;
          case "share":
            // logic to share
            break;
          case "email":
            //logic to send email
            break;
          case "sponsor":
            //logic to open sponsor page
            break;
        }
      }

    return (
        <Menu id={menuId}>
          {children}
        </Menu>
    )
}
