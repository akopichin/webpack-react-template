import * as Promise from 'bluebird';

import {LOAD_ITEMS} from './actionTypes';
import {IAppApi} from '../Models/IAppApi';

export interface IAppActions {
    loadListAsync: Function;
}

class AppActionsClass implements IAppActions {
    constructor(private service: IAppApi, private dispatch) {}

    /**
     * Load items to show
     */
    loadListAsync = () => {
        return (dispatch => {
            return dispatch({
                type: LOAD_ITEMS,
                payload: new Promise(resolve => {
                    this.service.loadList();
                    setTimeout(() => {
                        resolve('World');
                    }, 5000);
                })
            });
        })(this.dispatch)
    }
}

//const AppActions = new AppActionsClass(AppApi, );

export {
    AppActionsClass
}
