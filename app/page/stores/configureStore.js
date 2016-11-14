import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../common/devtools/DevTools';
import api from '../common/middleware/api';
import { DEBUG } from '../constants/constants';

var finalCreateStore = null;
if (DEBUG) {
    finalCreateStore = compose(
        applyMiddleware(thunk, api),
        DevTools.instrument(),
        // persistState(getDebugSessionKey())
    )(createStore);
}
else {
    finalCreateStore = compose(
        applyMiddleware(thunk, api)
    )(createStore);
}

export default function configureStore(initialState) {

    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
