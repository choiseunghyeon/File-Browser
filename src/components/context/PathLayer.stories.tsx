
// import { ComponentStory, Meta } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { Provider } from 'react-redux';
// import create from '../../redux/create';
// import PathLayer from './PathLayer';


// const stub = [
//     {"id":"188","name":"1장","type":"dir","parentNodeId":"55"},
//     {"id":"189","name":"2장","type":"dir","parentNodeId":"55"},
//     {"id":"190","name":"3장","type":"dir","parentNodeId":"55"}
// ]
// // A super-simple mock of a redux store
// const store = create();
// export default {
//     title: 'Components/PathLayer',
//     component: PathLayer,
//     decorators: [story => <Provider store={store}>{story()}</Provider>],
// } as Meta

// const Template: ComponentStory<typeof PathLayer> = (args) => <PathLayer {...args} />

// export const Default = Template.bind({});
// Default.args = {
//     childrenNode: stub
// }