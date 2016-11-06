import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';
// import api from '../../common/middleware/api';

var finalCreateStore = compose(
        applyMiddleware(thunk)
    )(createStore);

export default function configureStore(initialState) {

    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
