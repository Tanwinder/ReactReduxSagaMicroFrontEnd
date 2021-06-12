import { combineReducers } from "redux"
import product from "./fuseProduct-reducer"
import demand from "./fuseDemand-reducer"
import homePage from "./homePage-reducer"
import dashboard from "./IMSDashboard-reducer"
import poNotifications from './notification-reducer';


export default combineReducers({
  product,
  demand,
  homePage,
  dashboard,
  poNotifications
})
