import {combineReducers, createStore} from 'redux';

import {items, filter} from './Reducers/reducers';

const appReducers = combineReducers({
    items,
    filter
});
//const appReducers = function(state = {}, action)

const appStore = createStore(appReducers, {});

export {
    appStore
}

