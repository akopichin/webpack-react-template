import {
    combineReducers,
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import {items, filter} from './Reducers/reducers';

const rootReducer = combineReducers({
    items,
    filter
});

const appStore = createStore(rootReducer, applyMiddleware(thunk));

export {
    appStore
}

