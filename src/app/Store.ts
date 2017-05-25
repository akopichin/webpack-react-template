import {
    combineReducers,
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
//import {BEGIN, SUCCESS, FAILURE} from 'app/Core/Utils/ReducerUtils';

import {items} from './Modules/Sample/Reducers/reducers';

const rootReducer = combineReducers({
    items
});

// @todo remove in prod, add condition.
const logger = () => next => action => {
    console.log('dispatched:', action.type);
    let result = next(action);
    return result;
};

const appStore = createStore(
    rootReducer,
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

