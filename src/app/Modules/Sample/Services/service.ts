import * as Promise from 'bluebird';
import {get} from 'app/Core/Utils/RequestUtils';

import {IAppApi} from '../Models';

class AppApiClass implements IAppApi {
    loadList(): Promise<any> {
        return get('https://httpbin.org/get');
    }
}

const AppApi = new AppApiClass();

export {
    AppApi
}
