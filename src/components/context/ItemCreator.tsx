import PathLayer from './PathLayer';
import { Item } from 'react-contexify';
import { FILE_LAYER_ID, FOLDER_LAYER_ID, PATH_LAYER_ID } from '../../lib/contextUtils';
import FolderLayer from './FolderLayer';
import FileLayer from './FileLayer';

// layer 호출 하는 쪽에서 어떤 layer를 보여줄 것이고 필요한 데이터는 무엇인지 알려줌 -> propsFromTrigger
export default function ItemCreator(props: any) {
    if (!props.propsFromTrigger) return null;
    const {layerId} = props.propsFromTrigger;
    console.log(layerId);
    if (layerId === PATH_LAYER_ID) {
        return <PathLayer {...props.propsFromTrigger} />
    } else if (layerId === FILE_LAYER_ID) {
        return <FileLayer {...props.propsFromTrigger} />
    } else if (layerId === FOLDER_LAYER_ID) {
        return <FolderLayer {...props.propsFromTrigger} />
    } else {
        return (
            <>
                <Item id="remove">
                Item 1
                </Item>
                <Item>
                Item 2
                </Item>
                <Item disabled>Disabled</Item>
                <Item >
                    Sub Item 1
                </Item>
            </>
        )
    }

}
