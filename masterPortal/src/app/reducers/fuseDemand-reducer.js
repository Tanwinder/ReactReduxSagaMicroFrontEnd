

const initialState = {
    data: [],
    activeResultColumn: [],
    fusedata: []
}

export default (state= initialState, action) => {
    switch(action.type) {
        case 'Data':
        return {
            ...state,
        }
        default:
        return state;
    }
}