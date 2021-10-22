import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IRenderTree } from '../types/common';
import Item, {IItemProps} from './Item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Item',
  component: Item,
  argTypes: {
      
  }
} as ComponentMeta<typeof Item>;

const FolderNode: IRenderTree = {
    "id": "6",
    "name": "BUIS_HOME",
    "type": "dir",
    "parentNodeId": "root"
}
const FileNode: IRenderTree = {
    "id": "6",
    "name": "BUIS_HOME",
    "type": "file",
    "parentNodeId": "root"
}
const stub: IItemProps = {
    node: FolderNode,
    selectedNodeId: '123',
    display: true,
    changeSelectedNodeId: () => {},
    handleDblClick: () => {},
    updateChildren: () => {},
    changeCurrentNodeId: () => {},
    updateNodeHistory: () => {}
} 

const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />;

export const Folder = Template.bind({});
Folder.args = stub;

export const File = Template.bind({});
File.args = {
    ...Folder.args,
    node: FileNode
}