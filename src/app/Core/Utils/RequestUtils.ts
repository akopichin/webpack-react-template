import * as Promise from 'bluebird';
import * as request from 'superagent-bluebird-promise';
import * as _ from 'lodash';

interface IRequestOptions {
    responseType?: string;
    patchResponse?: boolean;
    [index: string]: any;
}

interface IRequestParams {
    ts?: number;
    [index: string]: any;
}

function getError (response, options) {
    let result;
    const {res} = response;
    const errorStatus = _.has(res, 'error.status') ? res.error.status : 444;

    if (!_.isObject(res)) {
        // Global error (404 etc).
        result = {
            errorCode: response.status != null ? response.status : -1,
            errorMsg: 'Connection error',
            errorStatus: errorStatus,
            uniqueCode: response.status != null ? response.status : -1,
            fields: [],
            checks: []
        };
    } else if (_.isObject(res.body) && !_.isUndefined(res.body.errorCode)) {
        result = _.assign(res.body, {errorStatus: errorStatus});
    } else {
        // Unknown response
        if (errorStatus == 401) {
            // 401-й handler.
            if (!(options && options.dontRedirect)) {
                localStorage.setItem('errorCode', '401');
            }
        } else if ([502, 503, 504].indexOf(errorStatus) >= 0) {
            // Figure out what to do.
        }
        result = {
            errorCode: response.status != null ? response.status : -3,
            errorMsg: 'Connection error',
            errorStatus: errorStatus,
            uniqueCode: response.status != null ? response.status : -3,
            fields: [],
            checks: []
        };
    }
    return result;
}

function patchResponse (response, url, params, data = undefined) {
    let result = response.body;
    if (result) {
        result.request = {url: url, params: params || {}, data: data || {}};
    } else {
        result = {request: {url: url, params: params || {}, data: data || {}}};
    }
    return result;
}

const get = function (url, params: IRequestParams = {}, options: IRequestOptions = {}) {
    params || (params = Object.create(null));
    // param ts to avoid caching, if ts at params - dont change.
    params.ts = _.isUndefined(params.ts) ? new Date().getTime() : params.ts;
        let req = request
            .get(url)
            .query(params);
    let promise = new Promise(function (resolve, reject) {
        req = req.accept(options.responseType || 'json')
            .responseType(options.responseType || '')
            .then(
                function (response) {
                    if(options.patchResponse === false) {
                        resolve(response);
                    } else {
                        resolve(patchResponse(response, url, params))
                    }
                },
                function (errors) {
                    const error = getError(errors, options);
                    reject(error);
                }
            );
    });

    return promise;
}

export {
    get
}
