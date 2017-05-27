import * as Promise from 'bluebird';
//import request from 'superagent-bluebird-promise';

import {IAppApi} from '../Models';

class AppApiClass implements IAppApi {
    loadList(): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('finish');
            }, 5000);
        });
        //return request.get('http://google.com').promise();
    }
}

const AppApi = new AppApiClass();

export {
    AppApi
}
