import {get} from 'app/Core/Utils/RequestUtils';

import {ISampleApi} from '../Models/ISampleApi';

class SampleApiClass implements ISampleApi {
    loadList(): Promise<any> {
        return get('https://httpbin.org/get');
    }
}

const SampleApi = new SampleApiClass();

export {
    SampleApi
}
