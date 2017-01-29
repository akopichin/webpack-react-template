import * as Promise from 'bluebird';
import request from 'superagent-bluebird-promise';

import {IAppApi} from '../Models';
//import {IItem} from '../Models/IItem';

class AppApiClass implements IAppApi {
    loadList(): Promise<any> {
        return request.get('http://google.com').promise();
    }
}

const AppApi = new AppApiClass();

export {
    AppApi
}
