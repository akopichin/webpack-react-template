import {IAsyncData} from 'app/Core/Models';
import {IItem} from './IItem';

export interface ISampleStoreBranch {
    sample: ISampleStore
}

export interface ISampleStore {
    items: IItem[],
    text: IAsyncData<string>
}
