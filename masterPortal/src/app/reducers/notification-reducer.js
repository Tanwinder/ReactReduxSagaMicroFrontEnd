const initialState = {
    newNotificationMsg: null
}

export default (state= initialState, action) => {
    switch(action.type) {
        case 'IMS_NEW_SOCKET_NOTIFICATION':
            return {
                ...state,
                newNotificationMsg: action.newPo
            }
        default:
            return state;
    }
}