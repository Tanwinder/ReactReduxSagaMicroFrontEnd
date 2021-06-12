import { fork, all } from 'redux-saga/effects';
import mioAdmin from './DepartmentSales/saga';

export default function* dashboard() {
  yield all([
    fork(mioAdmin),
  ])
}