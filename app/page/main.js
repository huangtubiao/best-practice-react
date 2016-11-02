import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Counter from './components/counter/index';
import App from './connect/connect';
import reducers from './reducers/reducers';
import IndexWrapper from './container/index';

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
