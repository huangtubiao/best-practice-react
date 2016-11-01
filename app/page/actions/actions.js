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
