import PathLayer from './PathLayer';
import { Item } from 'react-contexify';
import { FILE_LAYER_ID, FOLDER_LAYER_ID, MAIN_CONTAINER_LAYER_ID, PATH_LAYER_ID } from '../../lib/contextUtils';
import FolderLayer from './FolderLayer';
import FileLayer from './FileLayer';
import MainContainerLayer from './MainContainerLayer';

// layer 호출 하는 쪽에서 어떤 layer를 보여줄 것이고 필요한 데이터는 무엇인지 알려줌 -> propsFromTrigger
export default function ItemCreator(props: any) {
    if (!props.propsFromTrigger) return null;
    const {layerId} = props.propsFromTrigger;
    console.log(layerId);
    switch (layerId) {
        case PATH_LAYER_ID:
            return <PathLayer {...props.propsFromTrigger} />
        case FILE_LAYER_ID:
            return <FileLayer {...props.propsFromTrigger} />
        case FOLDER_LAYER_ID:
            return <FolderLayer {...props.propsFromTrigger} />
        case MAIN_CONTAINER_LAYER_ID:
            return <MainContainerLayer {...props.propsFromTrigger} />
        default:
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
            );
    }

}
