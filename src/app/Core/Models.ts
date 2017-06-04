import {EProcessStatus} from './Enums';

/**
 * Describing simple action.
 */
export interface IAction {
    type: string;
    payload: any;
}

/**
 * Errors result.
 * Depend on particularly project.
 */
interface IErrorsResult {
    [index: string]: any;
}

/**
 * Interface for asyncronous loading data.
 *
 * @prop {EProcessStatus} status Loading status.
 * @prop {any} data Data, i.e. payload.
 * @prop {IErrorsResult>} [errors] Errors.
 */
export interface IAsyncData<T> {
    status: EProcessStatus;
    data: T;
    errors?: IErrorsResult;
}
