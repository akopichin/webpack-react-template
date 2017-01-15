/**
 * Reducers
 */
import {LOAD_ITEMS} from '../Actions/actionTypes';
import {IItem} from '../Models'
import {EItemsFilter} from '../Models/EItemsFilter';

function items (state:IItem[], action) {
    if (state === undefined) {
        state = [];
    }
    switch (action.type) {
        case LOAD_ITEMS:
            console.log('load items actions');
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
        case LOAD_ITEMS:
            console.log('load items actions');
            return state;
        default:
            return state;
    }
}

export {
    items,
    filter
}