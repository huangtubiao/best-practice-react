/*
 * Action，State 的变化，会导致 View 的变化。但是，用户接触不到View。所以，State 的变化必须是 View 
 * 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
 */
const INCREASE = 'increase';
const DCREMENT = 'dcrement';

export function increase(value) {
    return {
        type: INCREASE,
        value
    }
}

export function dcrement(value) {
    return {
        type: DCREMENT,
        value
    }
}
