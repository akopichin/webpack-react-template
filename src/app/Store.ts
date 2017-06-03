import {
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import {getRootReducer} from 'app/Core/rootReducer';
import {sample} from './Modules/Sample/Reducers/reducers';

/**
 * Only common reducers should be here.
 * Try too keep minimal.
 */
const rootReducerMap = {
    sample
};

// @todo remove in prod, add condition.
const logger = () => next => action => {
    console.log('dispatched:', action.type);
    let result = next(action);
    return result;
};

const appStore = createStore(
    getRootReducer(rootReducerMap),
    applyMiddleware(
        thunk,
        promiseMiddleware({
            promiseTypeSuffixes: ['BEGIN', 'SUCCESS', 'FAILURE']
        }),
        logger
    )
);

export {
    appStore
}

