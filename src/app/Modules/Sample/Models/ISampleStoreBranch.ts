import {IAsyncData} from 'app/Core/Models';
import {IItem} from './IItem';

export interface ISampleStoreBranch {
    sample: {
        items: IItem[],
        text: IAsyncData<string>
    }
}