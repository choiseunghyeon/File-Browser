import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { enhancer } from "addon-redux";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import { initialState } from "../tests/constValue";

const sagaMiddleware = createSagaMiddleware();

const create = () => {
  const store = createStore(rootReducer(), composeWithDevTools(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  console.log(store);
  return store;
};

export const createForStorybook = () => {
  const store = createStore(rootReducer(), {}, enhancer);

  // sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
