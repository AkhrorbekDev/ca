import {$Fetch, $fetch, FetchContext, FetchHooks} from 'ofetch'
import {getQuery} from 'ufo'

interface ApiCoreFetchInterface {

    _fetch: $Fetch;

    get(url: string, params?: any): Promise<any>;

    post(url: string, data: any): Promise<any>;

    put(url: string, data: any): Promise<any>;

    delete(url: string): Promise<any>;

}

const getPropertyValue = (parent, child) => {
    const isInvalid = (parent !== undefined) && (parent[child] !== undefined) && (parent !== '')
    if (isInvalid) {
        return parent[child]
    }
    return ''
}

class ApiCoreFetch implements ApiCoreFetchInterface, FetchHooks {

    _fetch: $Fetch;

    async onRequest(context: FetchContext, app) {
        const query = getQuery(context.request)
        context.options = context.options || {}
        context.options.headers = {
            ...context.options.headers,

        }
        if (context.options.params && !context.options.params.noAuth) {
            context.options.headers.Authorization = `Basic ${btoa('root:GJA4TI8zQciHrXq')}`
            if (app.config.globalProperties.$auth.interceptor) {
                context.options = await app.config.globalProperties.$auth.interceptor({
                    ...context.options,
                    url: context.request
                });
            }
        } else {
            delete context.options.params?.noAuth

        }

    }

    async onResponseError({
                              response,
                              options
                          }
    ) {
        const message = getPropertyValue(response._data, 'message')
        const statusText = getPropertyValue(response, 'statusText')
        const statusCode = getPropertyValue(response, 'status')
        const sendingMessage = message !== '' ? message : statusText

        return Promise.reject({
            data: response._data,
            message: sendingMessage,
            statusText: sendingMessage,
            statusCode,
            status: statusCode,
        })
    }

    constructor(context, options) {
        const fetch = $fetch.create({
            baseURL: options.baseUrl,
            onRequest: (ctx) => this.onRequest(ctx, context),
            onResponseError: (ctx) => this.onResponseError(ctx, context),
        });
        this.context = context
        console.log(context)
        this._fetch = (url, options) => {
            return fetch(url, options);
        }
    }

    async get(url: string, params?: any): Promise<any> {
        return this._fetch(url, {params});
    }

    async post(url: string, data: any, config = {}): Promise<any> {
        let _continue = true
        if (!config.noAuth && !this.context.config.globalProperties.$auth.loggedIn) {
            if (this.context.config.globalProperties.$confirm) {
                this.context.config.globalProperties.$confirm.require({
                    message: 'Do you want to delete this record?',
                    header: 'Danger Zone',
                    icon: 'pi pi-info-circle',
                    rejectLabel: 'Cancel',
                    rejectProps: {
                        label: 'Cancel',
                        severity: 'secondary',
                        outlined: true
                    },
                    acceptProps: {
                        label: 'Delete',
                        severity: 'danger'
                    },
                    accept: () => {
                        _continue = true
                    },
                    reject: () => {
                        _continue = false
                    }
                })
            }
        }
        return this._fetch(url, {
            method: 'POST',
            body: data,
        });
    }

    async put(url: string, data: any): Promise<any> {
        return this._fetch(url, {
            method: 'PUT',
            body: data
        });
    }
}

export {ApiCoreFetch}
export default ApiCoreFetch;
