import {IItem} from './IItem';

export interface IStore {
    sample: {
        items: IItem[],
        text: string
    }
}