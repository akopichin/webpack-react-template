import axios, {AxiosRequestConfig} from 'axios';

// Prevent rest caching.
axios.defaults.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // Prevents caching get requests.
    if(config.method === 'get') {
        config.params = config.params || {};
        config.params.ts = new Date().getTime();
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
