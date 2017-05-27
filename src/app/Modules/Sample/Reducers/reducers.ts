import * as _ from 'lodash';
import {handleActions} from 'redux-actions';

/**
 * Reducers
 */
import {SUCCESS} from 'app/Core/Utils/ReducerUtils';

import {LOAD_ITEMS} from '../Actions/actionTypes';
import {IItem} from '../Models';

const initialItemsState: { items: IItem[], text: string } = {items: [], text: ''};

const sample = handleActions({

    [`${LOAD_ITEMS}${SUCCESS}`]: (state, action) => {
        console.log('load success', action.payload);
        let newState = _.assign({}, state);
        newState.text = action.payload;

        return newState;
    }

}, initialItemsState);

export {
    sample
}