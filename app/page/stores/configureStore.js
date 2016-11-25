/**
 * Redux 提供 createStore 这个函数，用来生成 Store;
 * createStore 方法可以接受整个应用的初始状态作为参数,
 * createStore 接受 Reducer 作为参数，生成一个新的 Store,
 * 以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State;
 * 中间件：就是一个函数，对store.dispatch方法进行了改造，改变Store中的dispatch方法，
 * 从而能处理不同类型的 action 输入，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能;
 * applyMiddlewares: 作用是将所有中间件组成一个数组，依次执行;
 * compose: 用于增强store，把多个 store 增强器依次执行，
 * compose做的只是让你不使用深度右括号的情况下来写深度嵌套的函数。
 */
import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/reducers';
// redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../common/devtools/DevTools';
import api from '../common/middleware/api';
import { DEBUG } from '../constants/constants';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

var finalCreateStore = null;

if (DEBUG) {
    finalCreateStore = compose(
        applyMiddleware(thunk, api, reduxRouterMiddleware),
        DevTools.instrument(),
        // persistState(getDebugSessionKey())
    )(createStore);
} else {
    finalCreateStore = compose(
        applyMiddleware(thunk, api, reduxRouterMiddleware)
    )(createStore);
}

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
