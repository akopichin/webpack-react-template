import {EItemsFilter} from './EItemsFilter';
import {IItem} from './IItem';

export interface IStore {
    filter: EItemsFilter,
    items: IItem[]
}
