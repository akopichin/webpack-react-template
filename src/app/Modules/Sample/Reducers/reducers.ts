/**
 * Reducers
 */
import {SUCCESS} from 'app/Core/Utils/ReducerUtils';

import {LOAD_ITEMS, SET_FILTER} from '../Actions/actionTypes';
import {IItem} from '../Models';
import {EItemsFilter} from '../Models/EItemsFilter';

function items (state:IItem[], action) {
    if (state === undefined) {
        state = [];
    }
    console.log(action.type);
    switch (action.type) {
        case LOAD_ITEMS:
            console.log('load items actions');
            return state;
        case `${LOAD_ITEMS}${SUCCESS}`:
            console.log('load success', action);
            return state;
        case 'OK':
            console.log('OK actions');
            return state;
        default:
            return state;
    }
}

function filter (state:EItemsFilter, action) {
    if (state === undefined) {
        state = EItemsFilter.ALL;
    }
    switch (action.type) {
        case SET_FILTER:
            console.log('filter set');
            return state;
        default:
            return state;
    }
}

export {
    items,
    filter
}