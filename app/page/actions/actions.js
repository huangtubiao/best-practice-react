/*
 * Action，State 的变化，会导致 View 的变化。但是，用户接触不到View。所以，State 的变化必须是 View 
 * 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
 */

/*
 * action types
 */
export const GET_ARGS = 'GET_ARGS';

export const TOGGLE_SPIN_LOADING = 'TOGGLE_SPIN_LOADING';
export const TOGGLE_LIST_LOADING = 'TOGGLE_LIST_LOADING';

export const TABS_UPDATE = 'TABS_UPDATE';

export const LIKE_NEWS = 'LIKE_NEWS';
export const DISLIKE_NEWS = 'DISLIKE_NEWS';



/*
 * action creators
 */
export function getArgs(value) {
    return { type: GET_ARGS, value };
}

export function toggleListLoading(value) {
    return { type: TOGGLE_LIST_LOADING, value };
}

export function toggleSpinLoading(value) {
    return { type: TOGGLE_SPIN_LOADING, value };
}

export function updateActiveTab(value) {
    return { type: TABS_UPDATE, value};
}

export function likeNews(value) {
    return { type: LIKE_NEWS, value };
}

export function dislikeNews(value) {
    return { type: DISLIKE_NEWS, value };
}
