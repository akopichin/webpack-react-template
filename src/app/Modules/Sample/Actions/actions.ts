import {LOAD_ITEMS} from './actionTypes';
import {ISampleApi} from '../Models/ISampleApi';

export interface ISampleActions {
    loadListAsync: Function;
}

class SampleActions implements ISampleActions {
    constructor(private service: ISampleApi, private dispatch) {}

    /**
     * Load items to show
     */
    loadListAsync = () => {
        return (dispatch => {
            return dispatch({
                type: LOAD_ITEMS,
                payload: this.service.loadList()
            });
        })(this.dispatch)
    }
}

export {
    SampleActions
}
