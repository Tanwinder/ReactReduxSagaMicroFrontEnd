const initialState = {
    userData: {
        browsingHistory: [],        
        browsingHistoryCards: [],
        preferences: [],
        defaultPreferences: {
            background_color: 'light',
            color: '#000',
            text_size: "13",
            contrast: '1',
            rowHeight:30,
        },
        preferences: {
            background_color: 'light',
            color: '#000',
            text_size: "13",
            contrast: '1',
            rowHeight:30,
        },
        firstTimeUser: false,
        userDetails: {}
    },
    theme:'',
}

export default (state= initialState, action) => {
    let userData = state.userData;
    switch(action.type) {
        case "INITIALIZE_HOME_PAGE_STATE":
            return {
                ...state,
                userData
            }
        case "SET_HISTORY_CARDS":
            userData.browsingHistoryCards = action.browsingHistoryCards;
            return {
                ...state,
                userData
            }
        case "ADD_BROWSING_HISTORY":
            userData.browsingHistory = action.browsingHistory;
            return {
                ...state,
                userData
            }
        case "ADD_USER_DETAILS":
            userData.userDetails = action.userDetails;
            return {
                ...state,
                userData
            }          
            
        case "ADD_BG_COLOR":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    preferences: {
                        ...state.userData.preferences,
                        background_color: action.background_color
                    }
                }
            }
        case "ADD_CONTRAST":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    preferences: {
                        ...state.userData.preferences,
                        contrast: action.val
                    }
                }
            }
        case "ADD_FONT_SIZE":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    preferences: {
                        ...state.userData.preferences,
                        text_size: action.sizeVal
                    }
                }
            }
            case "GET_PREFERENCES":
                return {
                    ...state, 
                    userData: {
                        ...state.userData,
                        defaultPreferences: action.data,
                        preferences: action.data,
                        firstTimeUser: action.firstTimeUser
                    }
                }
                case "ADD_ROW_HEIGHT":
                return {
                    ...state, 
                    userData: {
                        ...state.userData,
                        preferences: {
                            ...state.userData.preferences,
                            contrast: state.userData.preferences.contrast,
                            text_size:state.userData.preferences.text_size,
                            background_color:state.userData.preferences.background_color,
                            rowHeight:action.rowHeight,
                        }
                    }
                }
                case 'NEW_THEME':
                    return  {
                        ...state,theme:action.t
                    }    
        default:
            return state;
    }
}