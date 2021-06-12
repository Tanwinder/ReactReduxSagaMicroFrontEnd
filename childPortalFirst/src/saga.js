import { fork, take, all, takeEvery } from 'redux-saga/effects';
import test from './app/components/modules/dashboard/saga';

export default function* sagas() {
  yield all([
   fork(test),
  ]) 
}
