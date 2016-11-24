/*
 * Main，入口文件
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

import IndexWrapper from './container/index';
import App from './container/app';
// redux-devtools 可以让你实时的监控Redux的状态树的Store
import DevTools from './common/devtools/DevTools';
import { DEBUG } from './constants/constants';

import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';

require('../css/common/common.scss');


let store = configureStore();

// let history = syncHistoryWithStore(browserHistory, store);

var DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={browserHistory}>
                        <Route path="/index.html" component={App}>
                            <IndexRoute component={IndexWrapper}/>
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
