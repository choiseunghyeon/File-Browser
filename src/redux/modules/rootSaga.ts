import { all } from 'redux-saga/effects';

import { sagas as treeSagas } from './tree';

export default function* rootSaga() {
  yield all([treeSagas()]);
}