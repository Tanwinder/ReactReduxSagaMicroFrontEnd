import { combineReducers } from 'redux';
import deptSales from '../dashboard/DepartmentSales/reducer';

export default combineReducers({
    'deptSales': deptSales,
});