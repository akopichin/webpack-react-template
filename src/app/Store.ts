import {
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import {getRootReducer} from 'app/Core/rootReducer';
import {sample, initialSampleState} from './Modules/Sample/Reducers/reducers';
import {ISampleStoreBranch} from './Modules/Sample/Models/ISampleStoreBranch';
import {IExampleStoreBranch} from './Modules/Example/Models/IExampleStoreBranch';

export interface IAppStore extends ISampleStoreBranch, IExampleStoreBranch {
}

/**
 * Only common reducers should be here.
 * Try too keep minimal.
 */
const rootReducerMap = {
    sample
};

/**
 * Initial state of the app.
 *
 * @returns {IAppStore} Initial state of the app.
 */
const getInitialState: () => IAppStore = () => {
    return initialSampleState
}

// @todo remove in prod, add condition.
const logger = () => next => action => {
    console.log('dispatched:', action.type);
    let result = next(action);
    return result;
};

const appStore = createStore(
    getRootReducer(rootReducerMap),
    getInitialState(),
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

