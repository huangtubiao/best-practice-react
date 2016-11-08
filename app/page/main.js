/*
 * Main，入口文件
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

import IndexWrapper from './container/index';

require('../css/common/common.scss');


let store = configureStore();

export default class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <IndexWrapper />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
);
