import {handleActions} from 'redux-actions';

/**
 * Reducers
 */
import {SUCCESS} from 'app/Core/Utils/ReducerUtils';

import {LOAD_ITEMS} from '../Actions/actionTypes';
import {IItem} from '../Models/IItem';

export const initialSampleState: { items: IItem[], text: string } = {items: [], text: ''};

const sample = handleActions({

    [`${LOAD_ITEMS}${SUCCESS}`]: (state, action) => {
        console.log('load success', action.payload);
        let newState = {...state};
        newState.text = action.payload.origin || '...';

        return newState;
    }

}, initialSampleState);

export {
    sample
}