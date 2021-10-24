import { ComponentStory, Meta } from '@storybook/react';
import Path, {IPathProps} from './Path';

const directoryChildrenStub = [
    {"id":"188","name":"1장","type":"dir","parentNodeId":"55"},
    {"id":"189","name":"2장","type":"dir","parentNodeId":"55"},
    {"id":"190","name":"3장","type":"dir","parentNodeId":"55"}
]

const fileChildrenStub = [
    {"id":"188","name":"1장","type":"file","parentNodeId":"55"},
    {"id":"189","name":"2장","type":"file","parentNodeId":"55"},
]

export default {
    title: 'Components/Path',
    component: Path
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Path> = (args) => <Path {...args} />;

export const PathWithDirectoryChild = Template.bind({});
PathWithDirectoryChild.args = {
    path: {
        "id":"55",
        "name":"JS_pattern_test - 복사본",
        "type":"dir",
        "parentNodeId":"root",
        "children": directoryChildrenStub
    },
    changeCurrentNodeId: () => {},
    updateNodeHistory: () => {},
}

export const PathWithoutDirectoryChild = Template.bind({});
PathWithoutDirectoryChild.args = {
    ...PathWithDirectoryChild.args,
    path: {
        "id":"55",
        "name":"JS_pattern_test - 복사본",
        "type":"dir",
        "parentNodeId":"root",
        "children": fileChildrenStub
    },
}
