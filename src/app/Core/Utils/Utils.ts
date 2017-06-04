/**
 * Utils for emit async redux actions.
 */
import {} from 'app/Core/Models';

/**
 * @TODO add props here.
 */
interface IErrorsResult {
    [index: string]: any;
}

export function dispatchAsync<TBeginPayload, TResponsePayload>(
    actionType: string,
    asyncCall: () => TResponsePayload|any,
    beginPayload?: TBeginPayload) {

    dispatch => {
        dispatch({type: `${actionType}_BEGIN`, beginPayload});

        const p: Promise<any> = asyncCall();
        if (p) {
            p.then(
                dispatchSuccess(actionType, dispatch),
                dispatchError(actionType, dispatch)
            )
        }

        return p;
    }
}

/**
 * Returns success promise handler function dispatches actionType_SUCCESS action.
 *
 * @param {string} actionType Actions type.
 * @param {Dispatch} dispatch Redux dispatch function (commonly set via thunk middleware).
 * @param {?Function} [payloadConverter] Optional converter promise's result to action's payload.
 */
export function dispatchSuccess<T>(actionType: string, dispatch, payloadConverter?: (payload: any) => T) {
    return (payload: T) => {
        dispatch({
            type: `${actionType}_SUCCESS`,
            payload: payloadConverter ? payloadConverter(payload) : payload
        });

        return payload;
    }
}

/**
 * Returns failure promise handler function dispatches actionType_FAILURE action.
 *
 * @param {string} actionType Actions type.
 * @param {Dispatch} dispatch Redux dispatch function (commonly set via thunk middleware).
 */
export function dispatchError(actionType: string, dispatch) {
    return (error: IErrorsResult) => {
        dispatch({
            type: `${actionType}_FAILURE`,
            payload: error,
            error: true
        });

        return Promise.reject(error);
    }
}
