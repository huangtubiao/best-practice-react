/*
 * Reducers，Redux提供的combineReducers函数可以帮助我们把reducer组合在一起，这样我们就可以把Reducers拆分成一个个小的Reducer来管理Store了；
 * Reducer，Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算
 * 过程叫做 Reducer。
 */
import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import { setItem } from 'utils';
import initialState from '../stores/stores';
import { GET_ARGS, TABS_UPDATE, TOGGLE_CONTENT,
         TOGGLE_LIST_LOADING, TOGGLE_SPIN_LOADING, LIKE_NEWS, DISLIKE_NEWS } from '../actions/actions';


var news = function(state = initialState.news, action) {
    let listInfoMap = {
        10: 'listLatest',  // 最新新闻
        11: 'listLike', //  收藏新闻
    };

    switch(action.type) {

        case LIKE_NEWS:
            if (!action.value) {
                return state;
            }

            var newState = merge({}, state),
                isDuplicate = false;

            newState['listLike'].map((item, index) => {
                if (item.id === action.value.id) {
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
                return newState;
            }

            newState['listLike'] = newState['listLike'].concat(action.value);
            setItem('like-list', JSON.stringify(newState['listLike']));

            return newState;

        case DISLIKE_NEWS:
            if (!action.value) {
                return state;
            }

            var newState = merge({}, state);
            newState['listLike'] = newState['listLike'].filter((item, index) => {
                return (item.id !== action.value.id);
            });
            setItem('like-list', JSON.stringify(newState['listLike']));

            return newState;

        default:
            return state;
    }
};

var args = function(state = initialState.args, action) {
    switch(action.type) {
        case GET_ARGS:
            return merge({}, state, action.value);
        default:
            return state;
    }
};

var tabs = function(state = initialState.tabs, action) {
    switch(action.type) {
        case TABS_UPDATE:
            return action.value;
        default:
            return state;
    }
};

var listLoading = function(state = initialState.listLoading, action) {
    switch(action.type) {
        case TOGGLE_LIST_LOADING:
            return action.value;
            break;
        default:
            return state;
    }
};

var spinLoading = function(state = initialState.spinLoading, action) {
    switch(action.type) {
        case TOGGLE_SPIN_LOADING:
            return action.value;
            break;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    args,
    tabs,
    news,
    listLoading,
    spinLoading,
});

export default rootReducer;
