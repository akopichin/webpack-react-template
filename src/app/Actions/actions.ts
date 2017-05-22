//import * as Promise from 'bluebird';

import {EItemsFilter} from '../Models';
import {LOAD_ITEMS} from './actionTypes';

export interface IAppActions {
    loadList: Function;
}

class AppActionsClass implements IAppActions {

    /**
     * Load items to show
     *
     * @param {EItemsFilter} filter Which items to load
     */
    loadList = (filter?: EItemsFilter) => (dispatch) => {
        dispatch({
            type: LOAD_ITEMS,
            filter
        });
    }
}

const AppActions = new AppActionsClass();

export {
    AppActions
}
