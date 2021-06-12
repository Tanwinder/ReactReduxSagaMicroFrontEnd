import { take, call, put, all, fork, select, delay } from 'redux-saga/effects';
import { Map } from 'immutable';
import { Alert } from 'reactstrap';
import * as EntityType from './types';
import { 
    getDepartmentSales, 
    insertUpdateDeptSalesSetupService,
    getDepartmentFilterService, 
    deleteDeptSalesService,
    getMajorSubClassFilterService
} from './service';
import deptAction from './constants';
import { getMajorClassFilterSuccess } from './types';

const getState = (state) => Map(state.dashboard.deptSales);
const getRootState = (state) => Map(state.root);

function* onInit() {
    while (true) {
        yield take(deptAction.GET_DEPARTMENT_SALES_SETUP_LIST);
        // let response = yield call(getDepartmentSales);
        // yield put(EntityType.getDepartmentSalesSetupListSuccess(response));
    }
}

// function* insertUpdateDeptSalesSetup() {
//     while (true) {
//         try{
//             const {dept, callType, userdetailsobj} = yield take(deptAction.INSERT_UPDATE_DEPT_SALES_SETUP);
//             let state = yield select(getState);
//             // let rootState = yield select(getRootState);
//             // let tkid = rootState.get("userdetailsobj") ? rootState.get("userdetailsobj") : null;
//             let tkid = userdetailsobj;
//             if(dept.likeSubClass === '-') {
//                 dept.likeSubClass = 0;
//             }
//             let response = yield call(insertUpdateDeptSalesSetupService, dept, callType, state, tkid);
//             if(response) {
//                 if(response.status !== 409){
//                     if(callType === 'create') {
//                         yield put(EntityType.insertUbdateDeptSalesSetupSuccess("Successfully added 'Like' Department for Department:"+ dept.selectedDept[0].id));
//                         yield delay(5000)
//                         yield put(EntityType.insertUbdateDeptSalesSetupSuccess(null));
//                     } else {
//                         yield put(EntityType.ubdateDeptSalesSetupSuccess("Changes successfully saved for department:"+ dept.dept));
//                         yield delay(5000)
//                         yield put(EntityType.ubdateDeptSalesSetupSuccess(null));
//                     }
//                     let deptSale = yield call(getDepartmentSales);
//                     yield put(EntityType.getDepartmentSalesSetupListSuccess(deptSale));
//                 }else{
//                     yield put(EntityType.insertUbdateDeptSalesSetupSuccess(response.data.message, response.status));
//                 }
//             }
//             yield put(EntityType.updateSaveComponent());
//         } catch (e) {
//             yield put(EntityType.ubdateDeptSalesSetupErr('Network error'));
//             yield put(EntityType.updateSaveComponent());
//         }
//     }

// }

// function* updateInsertError() {
//     while (true) {
//         const {errMsg, calltype} = yield take(deptAction.UPDATE_INSERT_ERROR);
//         yield put(EntityType.updateInsertErrorSuccess(errMsg, calltype));
//     }
// }

// function* getDepartmentFilter() { 
//     while (true) {
//         yield take(deptAction.GET_DEPARTMENT_FILTER);
//         let deptFilter = yield call(getDepartmentFilterService);
//         yield put(EntityType.getDepartmentFilterSuccess(deptFilter));
//     }
// }

// function* getMajorClassFilter() { 
//     while (true) {
//         const { deptId } = yield take(deptAction.GET_MAJOR_CLASS_FILTER);
//         let majorClassFilter = yield call(getMajorSubClassFilterService, {"dept_nbr" : [deptId]});
//         yield put(EntityType.getMajorClassFilterSuccess(majorClassFilter));
//     }
// }

// function* getSubClassFilter() { 
//     while (true) {
//         const { majorClassId, isUpdate } =  yield take(deptAction.GET_SUB_CLASS_FILTER);
//         yield put(EntityType.getSubClassFilter(majorClassId, isUpdate));
//     }
// }

// function* getLikeDepartmentFilter() { 
//     while (true) {
//         yield take(deptAction.GET_LIKE_DEPARTMENT_FILTER);
//         let deptFilter = yield call(getDepartmentFilterService);
//         yield put(EntityType.getLikeDepartmentFilterSuccess(deptFilter));
//     }
// }

// function* getLikeMajorClassFilter() { 
//     while (true) {
//         const { deptId } = yield take(deptAction.GET_LIKE_MAJOR_CLASS_FILTER);
//         let majorClassFilter = yield call(getMajorSubClassFilterService, {"dept_nbr" : [deptId]});
//         yield put(EntityType.getLikeMajorClassFilterSuccess(majorClassFilter));
//     }
// }

// function* getLikeSubClassFilter() { 
//     while (true) {
//         const { likeMajorClassId, isUpdate } =  yield take(deptAction.GET_LIKE_SUB_CLASS_FILTER);
//         yield put(EntityType.getLikeSubClassFilter(likeMajorClassId, isUpdate));
//     }
// }

// function* getUpdateLikeMajorClassFilter() { 
//     while (true) {
//         const { deptId } = yield take(deptAction.GET_UPDATE_LIKE_MAJOR_CLASS_FILTER);
//         let majorClassFilter = yield call(getMajorSubClassFilterService, {"dept_nbr" : [deptId]});
//         yield put(EntityType.getUpdateLikeMajorClassFilterSuccess(majorClassFilter));
//     }
// }

// function* getUpdateLikeSubClassFilter() { 
//     while (true) {
//         const { likeMajorClassId, isUpdate } =  yield take(deptAction.GET_UPDATE_LIKE_SUB_CLASS_FILTER);
//         yield put(EntityType.getUpdateLikeSubClassFilter(likeMajorClassId, isUpdate));
//     }
// }

// function* deleteDepartment() { 
//     while (true) {
//         let state = yield select(getState);
//         try{
//             const { dept } =  yield take(deptAction.DELETE_DEPT_SALES_SETUP);
//             const response = yield call(deleteDeptSalesService, dept);    
//             if(response) {
//                 yield put(EntityType.deleteDepartmentSalesSuccess("Successfully deleted 'Like' department for department:"+ dept.dept));
//                 yield delay(5000)
//                 yield put(EntityType.deleteDepartmentSalesSuccess(null));
//                 let deptSale = yield call(getDepartmentSales);
//                 yield put(EntityType.getDepartmentSalesSetupListSuccess(deptSale));
//             }    
//         } catch (e) {
//             yield put(EntityType.deleteDepartmentSalesError('Network error'));            
//         }
//     }
// }

export default function* department() {
    yield all([
        fork(onInit),
        // fork(insertUpdateDeptSalesSetup),
        // fork(getDepartmentFilter),
        // fork(getMajorClassFilter),
        // fork(getSubClassFilter),
        // fork(deleteDepartment),
        // fork(getLikeDepartmentFilter),
        // fork(getLikeMajorClassFilter),
        // fork(getLikeSubClassFilter),
        // fork(getUpdateLikeMajorClassFilter),
        // fork(getUpdateLikeSubClassFilter),
        // fork(updateInsertError)
    ])
}
