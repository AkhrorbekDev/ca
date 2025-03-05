import {$Fetch, $fetch, FetchHooks, FetchContext} from 'ofetch'


interface RequestInterface implements FetchHooks {
    _request: $Fetch

    get (url: string, params?: any): Promise<any>;
    post (url: string, data: any): Promise<any>;
    put (url: string, data: any): Promise<any>;
    delete (url: string): Promise<any>;

}

class Request implements RequestInterface {
    _request: $Fetch;

    onRequest (context: any) {
        context.options = context.options || {}
        context.options.headers = {
            ...context.options.headers,
            'Authorization': `Basic ${btoa('root:GJA4TI8zQciHrXq')}`,
        }
    }

    onResponse (context: any) {
        return context
    }

    onRequestError (context: any) {
        return context
    }

    onResponseError (context: any) {
        return context
    }

    constructor(baseUrl: string) {
        this._request = $fetch.create({
            baseURL: baseUrl,
            onRequest: this.onRequest,
            onResponse: this.onResponse,
            onResponseError: this.onResponseError,
            onRequestError: this.onRequestError
        });
    }

    async get(url: string, params?: any): Promise<any> {
        return this._request(url, {params});
    }

    async post(url: string, data: any): Promise<any> {
        return this._request(url, {
            method: 'POST',
            body: data
        });
    }
}

export {RequestInterface};
export default Request;
