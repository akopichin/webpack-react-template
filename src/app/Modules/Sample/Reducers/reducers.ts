import {handleActions} from 'redux-actions';

/**
 * Reducers
 */
import {SUCCESS} from 'app/Core/Utils/ReducerUtils';

import {LOAD_ITEMS} from '../Actions/actionTypes';
import {IItem} from '../Models';

const initialItemsState:IItem[] = [];

const items = handleActions({

    [`${LOAD_ITEMS}${SUCCESS}`]: (state, action) => {
        console.log('load success', action.payload);
        return state;
    },

    [`${LOAD_ITEMS}_FULFILLED`]: (state, action) => {
        console.log('load success', action.payload);
        return state;
    }

}, initialItemsState);

export {
    items
}