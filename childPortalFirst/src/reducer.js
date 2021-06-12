import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dashboard from './app/components/modules/dashboard/reducer';


const initialState = {};
export default combineReducers({
    'root': () => {
        return initialState
    },
    'routing': routerReducer,
    'dashboard': dashboard,
});