import { ComponentStory, Meta } from '@storybook/react'
import {rest} from 'msw';
import { Provider } from 'react-redux';
import create, { createForStorybook } from './redux/create';
import { action } from '@storybook/addon-actions'
import App from './App'
import { BASE_URL, initialPath, initialState } from './tests/constValue';
import { reducerUtils } from './redux/utils';
import { TreeState } from './redux/modules/tree';

const store = create();
// const store = {
//     getState: (): TreeState => {
//       return reducerUtils.init();
//     },
//     subscribe: () => 0,
//     dispatch: action('dispatch'),
//   };
export default {
    title: 'App',
    component: App,
    decorators: [story => <Provider store={store}>{story()}</Provider>]
} as Meta

const Template: ComponentStory<typeof App> = () => <App />

export const Default = Template.bind({});
Default.storyName = "App";
// Default.parameters = {
//     msw: [
//         rest.get(`${BASE_URL}/all?path=${initialPath}`, (req, res, ctx) => {
//             return res(
//                 ctx.json(initialState)
//             )
//         })
//     ]
// }