import {IItem} from './IItem';

export interface ISampleStore {
    sample: {
        items: IItem[],
        text: string
    }
}