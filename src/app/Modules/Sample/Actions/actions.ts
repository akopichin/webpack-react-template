import {EItemsFilter} from '../Models';
import {LOAD_ITEMS} from './actionTypes';
import {BEGIN, SUCCESS} from 'app/Core/Utils/ReducerUtils';

export interface IAppActions {
    loadList: Function;
    loadListAsync: Function;
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

    loadListAsync = (filter?: EItemsFilter) => (dispatch) => {
        dispatch({type: `${LOAD_ITEMS}${BEGIN}`});
        setTimeout(() => {
            dispatch({type: `${LOAD_ITEMS}${SUCCESS}`, filter});
        }, 5000);
    }
}

const AppActions = new AppActionsClass();

export {
    AppActions
}
