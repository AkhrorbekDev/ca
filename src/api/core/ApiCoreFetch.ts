import {$Fetch, $fetch, FetchHooks, FetchContext} from 'ofetch'

interface ApiCoreFetch {

    _fetch: $Fetch;

    get (url: string, params?: any): Promise<any>;
    post (url: string, data: any): Promise<any>;
    put (url: string, data: any): Promise<any>;
    delete (url: string): Promise<any>;

}

class ApiCoreFetch implements ApiCoreFetch, FetchHooks {

    _fetch: $Fetch;

    async onRequest (context: FetchContext, app) {
        context.options = context.options || {}
        context.options.headers = {
            ...context.options.headers,
            'Authorization': `Basic ${btoa('root:GJA4TI8zQciHrXq')}`,
        }
        console.log(context, 'context')
        if (app.config.globalProperties.$auth.interceptor) {
            context.options = await app.config.globalProperties.$auth.interceptor({
                ...context.options,
                url: context.request
            });
        }
    }

    constructor(context, options) {
        const fetch = $fetch.create({
            baseURL: options.baseUrl,
            onRequest: (ctx) => this.onRequest(ctx, context),
        });

        this._fetch = (url, options) => {
            return fetch(url, options);
        }
        console.log(this, 'test')
    }

    async get(url: string, params?: any): Promise<any> {
        return this._fetch(url, {params});
    }

    async post(url: string, data: any): Promise<any> {
        return this._fetch(url, {
            method: 'POST',
            body: data
        });
    }
}

export {ApiCoreFetch}
export default ApiCoreFetch;
