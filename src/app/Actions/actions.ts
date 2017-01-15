import {EItemsFilter} from '../Models';

import {LOAD_ITEMS} from './actionTypes';

/**
 * Load items to show
 * 
 * @param {EItemsFilter} filter Which items to load
 */
function loadList(filter: EItemsFilter) {
    return {
        type: LOAD_ITEMS,
        filter
    }
}

export {
    loadList
}
