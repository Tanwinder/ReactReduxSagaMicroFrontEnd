import { fromJS, List } from 'immutable';
import * as EntityType from './types';
import deptSalesSetup from './constants';

var initialState = fromJS({
    loading: false,
    deptFilter: [],
    subClassFilter: [],
    updateDeptFilter: [],

    selectedDept: [],
    selectedMajorClass: [],
    selectedSubClass: [],
    selectedLikeDept: [],
    selectedLikeMajorClass: [],
    selectedLikeSubClass: [],

    majorClassFilterLoading: true,
    likeMajorClassFilterLoading: true,

    deptDeleteErr: null,
    deptDeleteSucc: null,

    insertDeptErr: null,
    insertDeptSucc: null,
    insertDeptSuccCode: null,
    'filterVal': false,
    data: [],
    updateRow: [],
    insertErrorMsg: "",
    changeBeginDate: [],
    changeEndDate: [],
    updateRowSubClass: [],
    updateRowMajorClass: [],
    retriveError: ""
});

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case deptSalesSetup.GET_DEPARTMENT_SALESSETUP_LIST:

            return state.set('loading', true);

        case deptSalesSetup.GET_DEPARTMENT_SALESSETUP_LIST_SUCCESS:
            return state.set('data', action.deptList ? action.deptList.data : [])
            set('loading', false);

        case deptSalesSetup.GET_DEPARTMENT_FILTER_SUCCESS:

            return state.set('deptFilter', action.deptFilter ? action.deptFilter : [])
                .set('majorClassFilter', [])
                .set('defaultSubClassFilter', [])
                .set('subClassFilter', [])
                .set('likeDeptFilter', action.deptFilter ? action.deptFilter : [])
                .set('likeMajorClassFilter', [])
                .set('likeDefaultSubClassFilter', [])
                .set('likeSubClassFilter', [])

        case deptSalesSetup.GET_LIKE_DEPARTMENT_FILTER_SUCCESS:

            return state.set('likeDeptFilter', action.likeDeptFilter ? action.likeDeptFilter : [])
                .set('likeMajorClassFilter', [])
                .set('likeDefaultSubClassFilter', [])
                .set('likeSubClassFilter', [])

        case deptSalesSetup.GET_MAJOR_CLASS_FILTER:
            return state.set('majorClassFilterLoading', true);

        case deptSalesSetup.GET_MAJOR_CLASS_FILTER_SUCCESS:
            return state.set('majorClassFilterLoading', false)
                .set('majorClassFilter', action.majorClassFilter.MajorClass ? action.majorClassFilter.MajorClass : [])
                .set('defaultSubClassFilter', action.majorClassFilter.SubClass ? action.majorClassFilter.SubClass : [])
                .set('subClassFilter', action.majorClassFilter.SubClass ? action.majorClassFilter.SubClass : []);

        case deptSalesSetup.GET_LIKE_MAJOR_CLASS_FILTER:
            return state.set('likeMajorClassFilterLoading', true);

        case deptSalesSetup.GET_LIKE_MAJOR_CLASS_FILTER_SUCCESS:

            return state.set('likeMajorClassFilterLoading', false)
                .set('majorClassFilterLoading', true)
                .set('likeMajorClassFilter', action.likeMajorClassFilter.MajorClass ? action.likeMajorClassFilter.MajorClass : [])
                .set('likeDefaultSubClassFilter', action.likeMajorClassFilter.SubClass ? action.likeMajorClassFilter.SubClass : [])
                .set('likeSubClassFilter', action.likeMajorClassFilter.SubClass ? action.likeMajorClassFilter.SubClass : []);

        case deptSalesSetup.ON_CAPACITY_CLICKED:
            let x = null, dataVal = state.get("data");
            dataVal.map((ac, i) => {
                if (ac['likeDept'] == action.data['likeDept']) {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        x = i + 1;
                    }
                }
            });
            return state.set("updateTable", true).set("rowIndexClicked", x);

        case deptSalesSetup.ON_CAPACITY_CHANGED:
            let tableValue = state.get("data"), updateRow = state.get("updateRow");
            tableValue.map((ac, i) => {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        updateRow[i] = true;
                }
            });
            return state.set("data", state.get("data").map((ac, i) => {
                return ac['likeDeptId'] == action.data['likeDeptId'] ? { ...ac, likeDept: action.value, likeMajorClass: 0, likeSubClass: 0 } : ac;
            })).set('updatedLikeDept', updateRow).set('updatedLikeDeptRows', updateRow);
            
        case deptSalesSetup.ON_LIKE_MAJOR_CLASS_CLICK:
            let rowIndexMajor = null, majorClassData = state.get("data");
            majorClassData.map((ac, i) => {
                if (ac['likeMajorClass'] == action.data['likeMajorClass']) {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        rowIndexMajor = i + 1;
                    }
                }
            });
            return state.set("updateLikeMajorClass", true).set("rowIndexClickedMajorClass", rowIndexMajor);

        case deptSalesSetup.ON_LIKE_MAJOR_CLASS_UPDATE:
            let majorclassData = state.get("data"), updateRowMajorClass = state.get("updateRowMajorClass");
            majorclassData.map((ac, i) => {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        updateRowMajorClass[i] = true;
                }
            });
            return state.set("data", state.get("data").map((ac, i) => {
                return ac['likeDeptId'] == action.data['likeDeptId'] ? { ...ac, likeMajorClass: action.value, likeSubClass: 0 } : ac;
            })).set('updatedMajorClass', updateRowMajorClass);

        case deptSalesSetup.ON_LIKE_SUB_CLASS_CLICK:
            let rowIndexSubClass = null, subClassData = state.get("data");
            subClassData.map((ac, i) => {
                if (ac['likeSubClass'] == action.data['likeSubClass']) {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        rowIndexSubClass = i + 1;
                    }
                }
            });
            return state.set("updateLikeSubClass", true).set("rowIndexClickedSubClass", rowIndexSubClass);

        case deptSalesSetup.ON_LIKE_SUB_CLASS_UPDATE:
            let subclassData = state.get("data"), updateRowSubClass = state.get("updateRowSubClass");
            subclassData.map((ac, i) => {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        updateRowSubClass[i] = true;
                }
            });
            return state.set("data", state.get("data").map((ac, i) => {
                return ac['likeDeptId'] == action.data['likeDeptId'] ? { ...ac, likeSubClass: action.value } : ac;
            })).set('updatedSubClass', updateRowSubClass);
        
        case deptSalesSetup.CHANGE_PO_FREEZE_DATE:
            let dateValue = state.get("data"), changeBeginDate = state.get("changeBeginDate");
            dateValue.map((ac, i) => {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        changeBeginDate[i] = true;
                }
            });
            return state.set("data", state.get("data").map((ac, i) => {
                return ac['likeDeptId'] == action.data['likeDeptId'] ? { ...ac, beginDate: action.value } : ac;
            })).set('updatedBeginDate', changeBeginDate);

        case deptSalesSetup.ON_BEGIN_DATE_CLICK:
            let rowIndexbeginDate = null, beginDate = state.get("data");
            beginDate.map((ac, i) => {
                if (ac['beginDate'] == action.data['beginDate']) {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        rowIndexbeginDate = i + 1;
                    }
                }
            });
            return state.set("updateBeginDate", true).set("rowIndexClickedBeginDate", rowIndexbeginDate);
        
        case deptSalesSetup.ON_CHANGE_END_DATE:
            let endDateValue = state.get("data"), changeEndDate = state.get("changeEndDate");
            endDateValue.map((ac, i) => {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        changeEndDate[i] = true;
                }
            });
            return state.set("data", state.get("data").map((ac, i) => {
                return ac['likeDeptId'] == action.data['likeDeptId'] ? { ...ac, endDate: action.value } : ac;
            })).set('updatedEndDate', changeEndDate);
            
        case deptSalesSetup.ON_END_DATE_CLICK:
            let rowIndexEndDate = null, endDate = state.get("data");
            endDate.map((ac, i) => {
                if (ac['endDate'] == action.data['endDate']) {
                    if (ac['likeDeptId'] == action.data['likeDeptId']) {
                        rowIndexEndDate = i + 1;
                    }
                }
            });
            return state.set("updateEndDate", true).set("rowIndexClickedEndDate", rowIndexEndDate);

        case deptSalesSetup.GET_SUB_CLASS_FILTER:
            let majorClassId = action.majorClassId;
            let updatedSubClass = state.get("defaultSubClassFilter").filter((subClass) => (
                subClass.parentClassId === majorClassId
            ))
            if (action.isUpdate) {
                return state.set('updateSubClassFilter', updatedSubClass ? updatedSubClass : []);
            }
            else {
                return state.set('subClassFilter', updatedSubClass ? updatedSubClass : []);
            }

        case deptSalesSetup.GET_LIKE_SUB_CLASS_FILTER:
            let likeMajorClassId = action.likeMajorClassId;
            let likeUpdateSubClassFilter = state.get("likeDefaultSubClassFilter").filter((subClass) => (
                subClass.parentClassId === likeMajorClassId
            ))
            if (action.isUpdate) {
                return state.set('likeUpdateSubClassFilter', likeUpdateSubClassFilter ? likeUpdateSubClassFilter : []);
            }
            else {
                return state.set('likeSubClassFilter', likeUpdateSubClassFilter ? likeUpdateSubClassFilter : []);
            }


        case deptSalesSetup.GET_UPDATE_LIKE_MAJOR_CLASS_FILTER_SUCCESS:
            return state.set('updateLikeMajorClassFilter', action.likeMajorClassFilter.MajorClass ? action.likeMajorClassFilter.MajorClass : [])
                .set('updateLikeDefaultSubClassFilter', action.likeMajorClassFilter.SubClass ? action.likeMajorClassFilter.SubClass : [])
                .set('updateLikeSubClassFilter', action.likeMajorClassFilter.SubClass ? action.likeMajorClassFilter.SubClass : []);

        case deptSalesSetup.GET_UPDATE_LIKE_SUB_CLASS_FILTER:
            let updateLikeMajorClassId = action.likeMajorClassId;
            let updateLikeUpdateSubClassFilter = state.get("updateLikeDefaultSubClassFilter").filter((subClass) => {
                // subClass.parentClassId === updateLikeMajorClassId
                return subClass.displayDesc.split("-")[1] == updateLikeMajorClassId;
            });
            if (action.isUpdate) {
                return state.set('updateLikeUpdateSubClassFilter', updateLikeUpdateSubClassFilter ? updateLikeUpdateSubClassFilter : []);
            }
            else {
                return state.set('updateLikeSubClassFilter', updateLikeUpdateSubClassFilter ? updateLikeUpdateSubClassFilter : []);
            }

        case deptSalesSetup.ONCHANGE_DEPARTMENT:
            return state.set('selectedDept', action.selectedDept)
                .set('selectedMajorClass', (state.majorClassFilter && state.majorClassFilter.length > 0) ? [state.majorClassFilter[0]] : [], [])
                .set('selectedSubClass', (state.subClassFilter && state.subClassFilter.length > 0) ? [state.subClassFilter[0]] : [], [])

        case deptSalesSetup.ONCHANGE_MAJOR_CLASS:
            return state.set('selectedMajorClass', action.selectedMajorClass)
                .set('selectedSubClass', action.selectedSubClass)

        case deptSalesSetup.ONCHANGE_SUB_CLASS:
            return state.set('selectedSubClass', action.selectedSubClass)

        case deptSalesSetup.ONCHANGE_LIKE_DEPARTMENT:
            return state.set('selectedLikeDept', action.selectedLikeDept)
                .set('selectedLikeMajorClass', action.selectedLikeMajorClass)
                .set('selectedLikeSubClass', action.selectedLikeSubClass)

        case deptSalesSetup.ONCHANGE_LIKE_MAJOR_CLASS:
            return state.set('selectedLikeMajorClass', action.selectedLikeMajorClass)
                .set('selectedLikeSubClass', action.selectedLikeSubClass)

        case deptSalesSetup.ONCHANGE_LIKE_SUB_CLASS:
            return state.set('selectedLikeSubClass', action.selectedLikeSubClass)

        case deptSalesSetup.DELETE_DEPT_SALES_SETUP_ERROR:
            return state.set('deptDeleteErr', action.err)

        case deptSalesSetup.DELETE_DEPT_SALES_SETUP_SUCCESS:
            return state.set('deptDeleteSucc', action.msg)

        case deptSalesSetup.INSERT_UPDATE_DEPT_SALES_SETUP_ERROR:
            return state.set('insertDeptErr', action.err)

        case deptSalesSetup.INSERT_UPDATE_DEPT_SALES_SETUP:
            let tableData = state.get("data"), updateRowContent = state.get("updateRow");
            tableData.map((ac, i) => {
                    if (ac['likeDeptId'] == action.dept['likeDeptId']) {
                        updateRowContent[i] = false;
                }
            });
            return state.set('updatedLikeDeptRows', updateRowContent);
        
        case deptSalesSetup.SORT_DATA:
            return state.set('updatedLikeDept',false)
                        .set('updatedLikeDeptRows', [])
                        .set('updatedMajorClass', [])
                        .set('updatedSubClass', [])
                        .set('updateLikeMajorClass',false)
                        .set('updateLikeSubClass',false)
                        .set('updateBeginDate',false)
                        .set('updateEndDate', false)
                        .set('updateTable', false)

        case deptSalesSetup.INSERT_UPDATE_DEPT_SALES_SETUP_SUCCESS:
            let statusCode = null;
            if (action.statusCode) {
                statusCode = action.statusCode;
            } else {
                statusCode = null;
            }
            return state.set('insertDeptSucc', action.msg)
                .set('insertDeptSuccCode', statusCode)
                .set('majorClassFilter', [])
                .set('subClassFilter', [])
                .set('likeMajorClassFilter', [])
                .set('likeSubClassFilter', [])

        case deptSalesSetup.UPDATE_DEPT_SALES_SETUP_ERROR:
            return state.set('updateDeptErr', action.err)
        
        case deptSalesSetup.UPDATE_SAVE_COMPONENT:
            return state.set('updatedLikeDept',false)
                .set('updatedLikeDeptRows', [])
                .set('updatedMajorClass', [])
                .set('updatedSubClass', [])
                .set('updateLikeMajorClass',false)
                .set('updateLikeSubClass',false)
                .set('updateBeginDate',false)
                .set('updateEndDate', false)
                .set('updateTable', false)
        
        case deptSalesSetup.UPDATE_INSERT_ERROR_SUCCESS:
            if(action.calltype == 'insert'){
                return state.set('insertErrorMsg',action.errMsg)
            }else if(action.calltype == 'update'){
                return state.set('updateErrorMsg',action.errMsg)
            }

        case deptSalesSetup.UPDATE_DEPT_SALES_SETUP_SUCCESS:
            return state.set('updateDeptSucc', action.msg)

        case deptSalesSetup.SET_STATE:

            return action.data;

        case deptSalesSetup.FILTER:
            return state.set("filterVal", action.data)

        case deptSalesSetup.RESET_ERROR_MSG:
            return state.set(action.key, null);

        case deptSalesSetup.RETRIVE_SALES_ERROR:
            return state.set("retriveError", action.errMsg)

        default:

            return state;
    }
}