import {handleActions} from 'redux-actions';

/**
 * Reducers
 */
import {BEGIN, SUCCESS} from 'Core/Utils/ReducerUtils';
import {EProcessStatus} from 'Core/Enums';

import {LOAD_ITEMS} from '../Actions/actionTypes';
import {ISampleStoreBranch, ISampleStore} from '../Models/ISampleStoreBranch';

export const initialSampleState: ISampleStoreBranch = {
    sample: {
        items: [],
        text: {
            status: EProcessStatus.IDLE,
            data: '',
            errors: null
        }
    }
};

const sample = handleActions<ISampleStore, any>({

    [`${LOAD_ITEMS}${BEGIN}`]: (state, action) => {
        console.log('load begin', action.payload);
        let newState = {
            ...state,
            text: {
                ...state.text,
                status: EProcessStatus.RUNNING
            }
        };

        return newState;
    },

    [`${LOAD_ITEMS}${SUCCESS}`]: (state, action) => {
        console.log('load success', action.payload);
        let newState = {
            ...state,
            text: {
                ...state.text,
                data: action.payload.origin || '...',
                status: EProcessStatus.SUCCESS
            }
        };

        return newState;
    }

}, initialSampleState as any);

export {
    sample
}