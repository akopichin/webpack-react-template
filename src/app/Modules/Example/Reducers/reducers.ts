import {handleActions} from 'redux-actions';

/**
 * Reducers
 */

import {EXAMPLE_ACTION} from '../Actions/actionTypes';
import {IExampleStore} from '../Models/IExampleStoreBranch';

export const initialExampleState: IExampleStore = {
    hello: 'Hello there'
};

const example = handleActions({

    [`${EXAMPLE_ACTION}`]: (state, action) => {
        console.log('hello', action.payload);
        let newState = {
            ...state,
            hello: action.payload
        };

        return newState;
    }

}, initialExampleState);

/**
 * Reducers to dynamic add to store.
 */
const mappedExampleReducers = {example: example};

export {
    example,
    mappedExampleReducers
}