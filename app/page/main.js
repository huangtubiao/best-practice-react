/*
 * Main，入口文件
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import { initialStore } from './stores/stores';

import IndexWrapper from './container/index';
import DetailWrapper from './container/detail';

import App from './container/app';
// redux-devtools 可以让你实时的监控Redux的状态树的Store
import DevTools from './common/devtools/DevTools';
import { DEBUG } from './constants/constants';

// Redux 和 React Router 不能协同工作
// react-router-redux 可以协调这两个库，保持路由与应用状态（state）同步
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';

require('../css/common/common.scss');


let store = configureStore(initialStore);

let history = syncHistoryWithStore(browserHistory, store);

var DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            // Provider 的作用就是把 store 放在了上下文对象 context 上面。然后，子组件就可以从 context 拿到 store
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path="/index.html" component={App}>
                            <IndexRoute component={IndexWrapper}/>
                            <Route path="/index/detail/:id/:commentid" component={DetailWrapper}/>
                        </Route>
                    </Router>
                    { DevToolsWrapper }
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('pages')
);
