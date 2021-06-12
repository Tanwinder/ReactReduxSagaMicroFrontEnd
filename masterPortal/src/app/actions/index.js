import axios from "axios";
import moment from 'moment';
import { userPreferenceService } from '../app.config';
import { fetchIMSDashboardData } from "./IMSDashboard-action";

export const addUserDetails = (userDetails) => {
    return (dispatch, getState) => {
        dispatch(initialPreferences(userDetails && userDetails, 'Get', {}))
        dispatch({ type: "ADD_USER_DETAILS", userDetails });
        dispatch(fetchIMSDashboardData());
    }
}
export function addPrefBgColor(color){
    return (dispatch, getState) => {
        dispatch({ type: "ADD_BG_COLOR", background_color: color });
    }
}
export function addPrefContrast(val){
    return (dispatch, getState) => {
        dispatch({ type: "ADD_CONTRAST", val });
    }
}
export function addPrefFsize(sizeVal){
    return (dispatch, getState) => {
        dispatch({ type: "ADD_FONT_SIZE", sizeVal });
    }
}
const getUserPreferenceServiceMethod = (userDetails, serviceMethod, userPreferences) => {
    let ims_user_preference_service = userDetails.imsUserPreferenceService ? userDetails.imsUserPreferenceService : userPreferenceService();
    if(serviceMethod === 'Get'){
        return axios({
            method: 'get',
            url: `${ims_user_preference_service}/getUserpreferenceByTkId/${!!userDetails? userDetails.userName : ""}`,
        })   
    }
    return axios({
        method: 'post',
        url: `${ims_user_preference_service}/upsertUserMainPreference/`,
        data: {
            "tkid": !!userDetails ? userDetails.userName : "",
            "fname": !!userDetails ? userDetails.firstName : "",
            "lname": !!userDetails ? userDetails.lastName: "",
            "app_name": "IMS",
            "text_size": !!userPreferences ? userPreferences.text_size :'',
            "contrast" : !!userPreferences ? userPreferences.contrast : '',
            "row_height" : !!userPreferences ? userPreferences.rowHeight : '',
            "background_color": !!userPreferences ? userPreferences.background_color : ''
        }
    })
}
export function initialPreferences(userDetails, serviceCallType, userPreferences) {
    return (dispatch, getState) => {
        return getUserPreferenceServiceMethod(userDetails, serviceCallType, userPreferences)
                .then((response) => {
                    let responseData = response.data;
                    let data = {
                        background_color: responseData && responseData.background_color ? responseData.background_color : 'light',
                        color: responseData &&  responseData.color ? responseData.color : '#000',
                        text_size: responseData &&  responseData.text_size ?  responseData.text_size : "13",
                        contrast: responseData &&  responseData.contrast ? responseData.contrast : '0.8',
                        rowHeight: responseData &&  responseData.row_height ? responseData.row_height : 30,
                    };
                    if (!!responseData) {
                        dispatch({type:'GET_PREFERENCES', data, firstTimeUser: false});
                    } else if(responseData === null && serviceCallType === 'Get') {
                        let defaultPrefences = {
                            background_color: 'light',
                            color: '#000',
                            text_size: "13",
                            contrast: '1',
                            rowHeight: 30,
                        };
                        dispatch({type:'GET_PREFERENCES', data: defaultPrefences, firstTimeUser: true });
                    } else {
                        let defaultPrefences = {
                            background_color: 'light',
                            color: '#000',
                            text_size: "13",
                            contrast: '1',
                            rowHeight: 30,
                        };
                        dispatch({type:'GET_PREFERENCES', data: defaultPrefences, firstTimeUser: false }); 
                    }
                })
                .catch((err) => {
                    console.log('GetUserPreferenceServiceFailed ------- ', err)
                })

    }
}

export function themeFinal(t) {
    return (dispatch, getState) => {
        dispatch({type:'NEW_THEME', t});
    }
}
export function addRowHeight(rowHeight) {
    return (dispatch, getState) => {
        dispatch({type:'ADD_ROW_HEIGHT', rowHeight});
    }
}
export const initializeHomePage = () => {
    return (dispatch, getState) => {
        let {userDetails} = getState().homePage.userData;
        let params = {
            "tk_id" : userDetails.userName,
            "limit": 100
        };
        // axios.get('/api/getHistory', params, {credentials: 'same-origin'})
        // .then( res => {
        //     if (res.data.msgCode !== 200){
        //         dispatch({ type: "GET_BROWSING_HISTORY_ERROR", res });
        //     } else {
        //         dispatch({ type: "ADD_BROWSING_HISTORY", browsingHistory: res.data.browsingHistory });
        //     }
        // })
        // .catch( err => {
        //     dispatch({ type: "GET_BROWSING_HISTORY_ERROR", err });
        // })
    }
}

export const toggleHistoryCards = (item) => {
    return (dispatch, getState) => {
    	let browsingHistoryCards = getState().homePage.userData.browsingHistoryCards;
		if (browsingHistoryCards.includes(item.page_name)) {
			browsingHistoryCards = browsingHistoryCards.filter(cardName => (cardName !== item.page_name));
		} else {
	    	browsingHistoryCards = browsingHistoryCards.concat(item.page_name);
	    }
        dispatch({ type: "SET_HISTORY_CARDS", browsingHistoryCards });
    }
}

export const addBrowsingHistory = (item) => {
    return (dispatch, getState) => {
        let {userData} = getState().homePage;
        let {browsingHistory, userDetails} = userData;
        browsingHistory = browsingHistory.filter(historyItem => (historyItem.page_name !== item.name));
        let params = {
            "tk_id" : userDetails.userName,
            "first_name": userDetails.firstName,
            "last_name": userDetails.lastName,
            "app_name" : item.app_name,
            "page_name" : item.name,
            "page_url" : item.url,
            "access_time" : item.access_time
        };
        browsingHistory = browsingHistory.concat(params);
        dispatch({ type: "ADD_BROWSING_HISTORY", browsingHistory });
        // axios.post('/api/addHistory', params, {credentials: 'same-origin'})
        // .then( res => {
        //     if (res.data.msgCode !== 200){
        //         dispatch({ type: "ADD_BROWSING_HISTORY_ERROR", res });
        //     } else {
        //         dispatch({ type: "ADD_BROWSING_HISTORY", browsingHistory });
        //     }
        // })
        // .catch( err => {
        //     dispatch({ type: "ADD_BROWSING_HISTORY_ERROR", err });
        // })
    }
}