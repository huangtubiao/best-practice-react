/*
 * Reducer，Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算
 * 过程叫做 Reducer。
 */
var reducer = function(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return { count: count + 1 }
        case 'dcrement':
            return { count: count - 1 }
        default:
            return state
    }
}

export default reducer;
