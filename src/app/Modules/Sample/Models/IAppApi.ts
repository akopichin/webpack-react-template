import * as Promise from 'bluebird';
//import {IItem} from './IItem';

/**
 * App's api interface
 */
export interface IAppApi {
    /**
     * Loads items list.
     *
     * @returns Promise<IItem[]> List of items.
     */
    // @TODO replace with IItem[]
    loadList(): Promise<any>;
}
