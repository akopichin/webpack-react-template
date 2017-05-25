import * as Promise from 'bluebird';

import {LOAD_ITEMS} from './actionTypes';
//import {BEGIN, SUCCESS} from 'app/Core/Utils/ReducerUtils';

export interface IAppActions {
    loadListAsync: Function;
}

class AppActionsClass implements IAppActions {

    /**
     * Load items to show
     */
    loadListAsync = () => {
        return dispatch => {
            return  dispatch({
                type: LOAD_ITEMS,
                payload: new Promise(resolve => {
                    setTimeout(() => {
                        resolve('finish');
                    }, 5000);
                })
            });
        }
    }
}

const AppActions = new AppActionsClass();

export {
    AppActions
}
