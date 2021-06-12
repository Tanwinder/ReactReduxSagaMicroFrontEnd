import { callApi, handleError } from '../../../../utilities/request';
import { endPoints } from '../../../../app.config';

export async function getDepartmentSales() {
    return callApi(endPoints.DEPT_SALES, "api/admin/likeDept", {
        'method': "GET"
    }).then((response) => {
        if (response.status == 200) {
            return response.data;
        }
        return;
    }).catch((e) => {
        return handleError(e);
    });
}

export async function getDepartmentFilterService() {
    return callApi(endPoints.MASTER_DATA, "api/getDepartment?app=FUSE_UI", {
        'method': "GET"
    }).then((response) => {
        if (response.status == 200) {
            return response.data;
        }
        return;
    }).catch((e) => {
        return handleError(e);
    });
}


export async function deleteDeptSalesService(dept) {
    return callApi(endPoints.DEPT_SALES, `api/admin/likeDept/${dept.likeDeptId}`, {
        'method': "DELETE"
    }).then((response) => {
        if (response.status == 200) {
            return response.data;
        }
        return;
    }).catch((e) => {
        return handleError(e);
    });
}

export async function insertUpdateDeptSalesSetupService(payload, callType, state, tkid) {
    let data;
    if (callType === 'create') {
        data = {
            "dept": payload.selectedDept.length > 0 ? payload.selectedDept[0].id : 0,
            "majorClass": payload.selectedMajorClass.length > 0 ? parseInt(payload.selectedMajorClass[0].displayDesc.split('-')[1]) : 0,
            "subClass": payload.selectedSubClass.length > 0 ? parseInt(payload.selectedSubClass[0].displayDesc.split('-')[2]) : 0,
            "likeDept": payload.selectedLikeDept.length > 0 ? payload.selectedLikeDept[0].id : 0,
            "likeMajorClass": payload.selectedLikeMajorClass.length > 0 ? parseInt(payload.selectedLikeMajorClass[0].displayDesc.split('-')[1]) : 0,
            "likeSubClass": payload.selectedLikeSubClass.length > 0 ? parseInt(payload.selectedLikeSubClass[0].displayDesc.split('-')[2]) : 0,
            "beginDate": payload.beginDate ? payload.beginDate.split("/")[2] + "-" + payload.beginDate.split("/")[0] + "-" + payload.beginDate.split("/")[1] : payload.beginDate,
            "endDate": payload.endDate ? payload.endDate.split("/")[2] + "-" + payload.endDate.split("/")[0] + "-" + payload.endDate.split("/")[1] : payload.endDate,
            "loggedInUser": tkid ? tkid : null
        }
    } else {
        payload.loggedInUser = tkid ? tkid : null; 
        data = payload;
    }
    return callApi(endPoints.DEPT_SALES, "api/admin/likeDept", {
        'method': "POST",
        'payload': JSON.stringify(data)
    }).then((response) => {
        if (response.status == 200) {
            return response;
        }
        return;
    }).catch((e) => {
        if(e.response.status === 409) {
            return e.response;
        }
        return handleError(e);
    });

}

export async function getMajorSubClassFilterService(payload) {
    return callApi(endPoints.MASTER_DATA, "api/getClassSubclassByDept?app=FUSE_UI", {
        'method': "POST",
        'payload': payload
    }).then((response) => {
        if (response.status == 200) {
            return response.data;
        }
        return;
    }).catch((e) => {
        return handleError(e);
    });
}
