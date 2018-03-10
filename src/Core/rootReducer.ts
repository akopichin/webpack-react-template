import {some} from 'lodash';
import {combineReducers} from 'redux';

/**
 * Stored reducers map, to update if needed.
 */
let currentReducersMap = {};

/**
 * Check if newReducers are doesn't added yet.
 *
 * @param {Object} reducersMap New reducers.
 */
const isReplaceNeeded = (newReducers) => {
    return some(newReducers, (_value, key) => !(key in Object.keys(currentReducersMap)) );
};

/**
 * Возвращает редюсеры для replaceReducers.
 * Returns combined reducers ready for replace.
 *
 * @type {(reducersMap)=>Reducer<S>}
 */
const getRootReducer = (newReducers) => {
    currentReducersMap = Object.assign(currentReducersMap, newReducers);
    return combineReducers(currentReducersMap);
};

export {
    isReplaceNeeded,
    getRootReducer
}
