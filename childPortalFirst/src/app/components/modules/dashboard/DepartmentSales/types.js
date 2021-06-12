import deptAction from './constants';

export function getDepartmentSalesSetupList() {
    return {
        type: deptAction.GET_DEPARTMENT_SALES_SETUP_LIST
    }
};

export const getDepartmentSalesSetupListSuccess = deptList => (
    {
        type: deptAction.GET_DEPARTMENT_SALESSETUP_LIST_SUCCESS,
        deptList
    }
)

export const getDepartmentFilter = () => {
    return {
        type: deptAction.GET_DEPARTMENT_FILTER
    }
};

export const getDepartmentFilterSuccess = (deptFilter) => {
    return {
        type: deptAction.GET_DEPARTMENT_FILTER_SUCCESS,
        deptFilter
    }
};

export const getLikeDepartmentFilter = () => {
    return {
        type: deptAction.GET_LIKE_DEPARTMENT_FILTER
    }
};

export const getLikeDepartmentFilterSuccess = (likeDeptFilter) => {
    return {
        type: deptAction.GET_LIKE_DEPARTMENT_FILTER_SUCCESS,
        likeDeptFilter
    }
};

export const deleteDepartmentSales = dept => {
    return {
        type: deptAction.DELETE_DEPT_SALES_SETUP,
        dept
    }
};

export const deleteDepartmentSalesError = err => {
    return {
        type: deptAction.DELETE_DEPT_SALES_SETUP_ERROR,
        err
    }
};

export const deleteDepartmentSalesSuccess = msg => {
    return {
        type: deptAction.DELETE_DEPT_SALES_SETUP_SUCCESS,
        msg
    }
};

export const getMajorClassFilter = (deptId) => {
    return {
        type: deptAction.GET_MAJOR_CLASS_FILTER,
        deptId
    }
};


export const getMajorClassFilterSuccess = (majorClassFilter) => {
    return {
        type: deptAction.GET_MAJOR_CLASS_FILTER_SUCCESS,
        majorClassFilter
    }
};

export const getSubClassFilter = (majorClassId, isUpdate) => {
    return {
        type: deptAction.GET_SUB_CLASS_FILTER,
        majorClassId,
        isUpdate
    }
};

export const getSubClassFilterSuccess = subClassFilter => {
    return {
        type: deptAction.GET_SUB_CLASS_FILTER_SUCCESS,
        subClassFilter
    }
};
export const getLikeMajorClassFilter = (deptId) => {
    return {
        type: deptAction.GET_LIKE_MAJOR_CLASS_FILTER,
        deptId
    }
};


export const getLikeMajorClassFilterSuccess = (likeMajorClassFilter) => {
    return {
        type: deptAction.GET_LIKE_MAJOR_CLASS_FILTER_SUCCESS,
        likeMajorClassFilter
    }
};

export const getUpdateLikeMajorClassFilter = (deptId) => {
    return {
        type: deptAction.GET_UPDATE_LIKE_MAJOR_CLASS_FILTER,
        deptId
    }
};

export const getUpdateLikeMajorClassFilterSuccess = (likeMajorClassFilter) => {
    return {
        type: deptAction.GET_UPDATE_LIKE_MAJOR_CLASS_FILTER_SUCCESS,
        likeMajorClassFilter
    }
};

export const getUpdateLikeSubClassFilter = (likeMajorClassId, isUpdate) => {
    return {
        type: deptAction.GET_UPDATE_LIKE_SUB_CLASS_FILTER,
        likeMajorClassId,
        isUpdate
    }
};

export const getUpdateLikeSubClassFilterSuccess = likeSubClassFilter => {
    return {
        type: deptAction.GET_UPDATE_LIKE_SUB_CLASS_FILTER_SUCCESS,
        likeSubClassFilter
    }
};

export const getLikeSubClassFilter = (likeMajorClassId, isUpdate) => {
    return {
        type: deptAction.GET_LIKE_SUB_CLASS_FILTER,
        likeMajorClassId,
        isUpdate
    }
};

export const getLikeSubClassFilterSuccess = likeSubClassFilter => {
    return {
        type: deptAction.GET_LIKE_SUB_CLASS_FILTER_SUCCESS,
        likeSubClassFilter
    }
};

export const insertUbdateDeptSalesSetup = (dept, callType, userdetailsobj) => {
    return {
        type: deptAction.INSERT_UPDATE_DEPT_SALES_SETUP,
        dept,
        callType,
        userdetailsobj
    }
}

export const insertUbdateDeptSalesSetupSuccess = (msg, statusCode) => {
    return {
        type: deptAction.INSERT_UPDATE_DEPT_SALES_SETUP_SUCCESS,
        msg,
        statusCode
    }
}

export const ubdateDeptSalesSetupSuccess = (msg) => {
    return {
        type: deptAction.UPDATE_DEPT_SALES_SETUP_SUCCESS,
        msg
    }
}

export const insertUbdateDeptSalesSetupErr = (err) => {
    return {
        type: deptAction.INSERT_UPDATE_DEPT_SALES_SETUP_ERROR,
        err
    }
}

export const ubdateDeptSalesSetupErr = (err) => {
    return {
        type: deptAction.UPDATE_DEPT_SALES_SETUP_ERROR,
        err
    }
}

export const updateSaveComponent = () => {
    return {
        type: deptAction.UPDATE_SAVE_COMPONENT
    }
}

export const updateAndInsertError = (errMsg, calltype) => {
    return {
        type: deptAction.UPDATE_INSERT_ERROR,
        errMsg,
        calltype
    }
}

export const updateInsertErrorSuccess = (errMsg, calltype) => {
    return {
        type: deptAction.UPDATE_INSERT_ERROR_SUCCESS,
        errMsg,
        calltype
    }
}

export const retriveSalesError = (errMsg) => {
    return {
        type: deptAction.RETRIVE_SALES_ERROR,
        errMsg
    }
}

export const onChangeDept = (selectedDept, selectedMajorClass, selectedSubClass) => {
    return {
        type: deptAction.ONCHANGE_DEPARTMENT,
        selectedDept,
        selectedMajorClass,
        selectedSubClass,
    }
}

export const onChangeMajorClass = (selectedMajorClass, selectedSubClass) => {
    return {
        type: deptAction.ONCHANGE_MAJOR_CLASS,
        selectedMajorClass,
        selectedSubClass
    }
}

export const onChangeSubClass = (selectedSubClass) => {
    return {
        type: deptAction.ONCHANGE_MAJOR_CLASS,
        selectedSubClass
    }
}

export const onChangeLikeDept = (selectedLikeDept, selectedLikeMajorClass, selectedLikeSubClass) => {
    return {
        type: deptAction.ONCHANGE_LIKE_DEPARTMENT,
        selectedLikeDept,
        selectedLikeMajorClass,
        selectedLikeSubClass,
    }
}

export const onChangeLikeMajorClass = (selectedLikeMajorClass, selectedLikeSubClass) => {
    return {
        type: deptAction.ONCHANGE_LIKE_MAJOR_CLASS,
        selectedLikeMajorClass,
        selectedLikeSubClass
    }
}

export const onChangeLikeSubClass = (selectedLikeSubClass) => {
    return {
        type: deptAction.ONCHANGE_LIKE_MAJOR_CLASS,
        selectedLikeSubClass
    }
}

export function setState(data) {
    return {
        type: deptAction.SET_STATE,
         data
    }
}

export function sortData() {
    return {
        type: deptAction.SORT_DATA
    }
}

export function filterChange(data) {
    return {
        type: deptAction.FILTER,
        data
    }
}

export function onCapacityClicked(val, data) {
    return {
        type: deptAction.ON_CAPACITY_CLICKED,
        val,
        data
    }
}

export function onCapacityChanged(value, data, rowIndex) {
    return {
        type: deptAction.ON_CAPACITY_CHANGED,
        value,
        data,
        rowIndex
    }
}
export function onLikeMajorClassClicked(val, data) {
    return {
        type: deptAction.ON_LIKE_MAJOR_CLASS_CLICK,
        val,
        data
    }
}

export function onLikeMajorClassUpdate(value, data, rowIndex) {
    return {
        type: deptAction.ON_LIKE_MAJOR_CLASS_UPDATE,
        value,
        data,
        rowIndex
    }
}
export function onLikeSubClassClicked(val, data) {
    return {
        type: deptAction.ON_LIKE_SUB_CLASS_CLICK,
        val,
        data
    }
}

export function onLikeSubClassUpdate(value, data, rowIndex) {
    return {
        type: deptAction.ON_LIKE_SUB_CLASS_UPDATE,
        value,
        data,
        rowIndex
    }
}

export function onChangePOFreezeDate(value, data) {
    return {
        type: deptAction.CHANGE_PO_FREEZE_DATE,
        value,
        data
    }
}

export function onBeginDateClick(val, data) {
    return {
        type: deptAction.ON_BEGIN_DATE_CLICK,
        val,
        data
    }
}

export function onChangeEndDate(value, data) {
    return {
        type: deptAction.ON_CHANGE_END_DATE,
        value,
        data
    }
}

export function onEndDateClick(val, data) {
    return {
        type: deptAction.ON_END_DATE_CLICK,
        val,
        data
    }
}

export const resetErrorMessage = (key) => {
    return {
        type: deptAction.RESET_ERROR_MSG,
        key
    }
}