import moment from 'moment';
const currNumber = moment().isoWeekday();
const currDay = moment().format("dddd");

const initialState = {
    departments: [],
    userLoadType: 'Hour',
    POTrendType: 'Day',
    AllocTrendType: 'Day',
    userLoadIMSHr: [],
    userLoadIMSHrFS: '',
    userLoadIMSDay: [],
    userLoadIMSDayFS: '',
    userLoadIMSMonth: [],
    userLoadIMSMonthFS: '',
    selectedDay: {"label": currDay, "value": String(currNumber)},
    hourDropdownOptions: [
        {
            "label": "Monday", 
            "value" : "1"
        },
        {
            "label": "Tuesday", 
            "value" : "2"
        },{
            "label": "Wednesday", 
            "value" : "3"
        },{
            "label": "Thursday", 
            "value" : "4"
        },{
            "label": "Friday", 
            "value" : "5"
        },{
            "label": "Saturday", 
            "value" : "6"
        },{
            "label": "Sunday", 
            "value" : "7"
        }
    ],
    allocDetailCount: [],
    POCardDetails: [],
    AllocCardDetails: [],
    ReplenCardDetails: [],
    PODeptChart: [],
    AllocDeptChart: [],
    POTrend: [],
    POYearTrend: [],
    AllocTrend: [],
    AllocYearTrend: [],
    POCardDetailsFS: "",
    AllocCardDetailsFS: "",
    ReplenCardDetailsFS: "",
    PODeptChartFS: "",
    AllocDeptChartFS: "",
    POTrendFS: "",
    AllocTrendFS: ""
}

export default (state= initialState, action) => {
    switch(action.type) {
        case "IMSD_SET_DEPARTMENTS":
            return {
                ...state,
                departments: action.data
            }
        case "IMSD_SET_PO_CARD_DETAILS":
            return {
                ...state,
                POCardDetails: action.data,
                POCardDetailsFS: ""
            }
        case "IMSD_SET_ALLOC_CARD_DETAILS":
            return {
                ...state,
                AllocCardDetails: action.data,
                AllocCardDetailsFS: ""
            }
        case "IMSD_SET_REPLEN_CARD_DETAILS":
            return {
                ...state,
                ReplenCardDetails: action.data,
                ReplenCardDetailsFS: ""
            }
        case "IMSD_SET_PO_DEPT_CHART":
            return {
                ...state,
                PODeptChart: action.data,
                PODeptChartFS: ""
            }
        case "IMSD_SET_ALLOC_DEPT_CHART":
            return {
                ...state,
                AllocDeptChart: action.data,
                AllocDeptChartFS: ""
            }
        case "IMSD_SET_PO_TREND":
            return {
                ...state,
                POTrend: action.data,
                POTrendFS: ""
            }
        case "IMSD_SET_PO_YEAR_TREND":
            return {
                ...state,
                POYearTrend: action.data,
                POYearTrendFS: ""
            }
        case "IMSD_SET_ALLOC_TREND":
            return {
                ...state,
                AllocTrend: action.data,
                AllocTrendFS: ""
            }
        case "IMSD_SET_ALLOC_YEAR_TREND":
            return {
                ...state,
                AllocYearTrend: action.data,
                AllocYearTrendFS: ""
            }
        case "IMSD_SET_PO_CARD_DETAILS_FS":
            return {
                ...state,
                POCardDetailsFS: action.status
            }
        case "IMSD_SET_ALLOC_CARD_DETAILS_FS":
            return {
                ...state,
                AllocCardDetailsFS: action.status
            }
        case "IMSD_SET_REPLEN_CARD_DETAILS_FS":
            return {
                ...state,
                ReplenCardDetailsFS: action.status
            }
        case "IMSD_SET_PO_DEPT_CHART_FS":
            return {
                ...state,
                PODeptChartFS: action.status
            }
        case "IMSD_SET_ALLOC_DEPT_CHART_FS":
            return {
                ...state,
                AllocDeptChartFS: action.status
            }
        case "IMSD_SET_PO_TREND_FS":
            return {
                ...state,
                POTrendFS: action.status
            }
        case "IMSD_SET_PO_YEAR_TREND_FS":
            return {
                ...state,
                POYearTrendFS: action.status
            }
        case "IMSD_SET_ALLOC_TREND_FS":
            return {
                ...state,
                AllocTrendFS: action.status
            }
        case "IMSD_SET_ALLOC_YEAR_TREND_FS":
            return {
                ...state,
                AllocYearTrendFS: action.status
            }
        case "IMSD_SET_USER_LOAD_HR_FS":
            return {
                ...state,
                userLoadIMSHrFS: action.status
            }
        case "IMSD_SET_USER_LOAD_DAY_FS":
            return {
                ...state,
                userLoadIMSDayFS: action.status
            }
        case "IMSD_SET_USER_LOAD_MONTH_FS":
            return {
                ...state,
                userLoadIMSMonthFS: action.status
            }
        case "IMSD_SET_USER_LOAD_DAY":
            return {
                ...state,
                userLoadIMSDay: action.data,
                userLoadIMSDayFS: ''
            }
        case "IMSD_SET_USER_LOAD_MONTH":
            return {
                ...state,
                userLoadIMSMonth: action.data,
                userLoadIMSMonthFS: ''
            }
        case "IMSD_SET_USER_LOAD_HR":
            return {
                ...state,
                userLoadIMSHr: action.data,
                userLoadIMSHrFS: ''
            }
        case "IMSD_SET_ULC_DAY":
            return {
                ...state,
                selectedDay: action.selectedDay.selectedDay
            }
        case "IMSD_TOGGLE_USER_LOAD_TYPE":
            return {
                ...state,
                userLoadType: action.userLoadType
            }
        case "IMSD_TOGGLE_PO_TREND_TYPE":
            return {
                ...state,
                POTrendType: action.POTrendType
            }
        case "IMSD_TOGGLE_ALLOC_TREND_TYPE":
            return {
                ...state,
                AllocTrendType: action.AllocTrendType
            }
        default:
            return state;
    }
}