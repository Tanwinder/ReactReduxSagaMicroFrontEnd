import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => f => f);
let middleWares = null;

if (window.location.href.indexOf('localhost') !== -1) {
    middleWares = [sagaMiddleware,];
} else {
    middleWares = [sagaMiddleware];
}

const enhancers = [applyMiddleware(...middleWares)];
enhancers.push(devTools());


const store = createStore(reducers, compose(applyMiddleware(...middleWares), devTools()));
sagaMiddleware.run(rootSaga);
export default store;