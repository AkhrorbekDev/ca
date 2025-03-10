import Request from '@/modules/auth/core/Request';
import type {RequestInterface} from '@/modules/auth/core/Request';
import type {FetchContext} from "ofetch";
import type {StorageInterface} from "@/modules/auth/core/Storage";
import Storage from "@/modules/auth/core/Storage";
import type { ModuleOptions} from "@/modules/auth/types";
import {Methods} from "@/modules/auth/types";
import {defineStore} from "pinia";
import Token from "@/modules/auth/Token";
import type {TokenInterface} from "@/modules/auth/Token";
import RefreshToken from "@/modules/auth/RefreshToken";
import type {RefreshTokenInterface} from "@/modules/auth/RefreshToken";
import type {App} from 'vue'

class Auth {

    request: RequestInterface;
    storage: StorageInterface;
    token: TokenInterface
    refreshToken: RefreshTokenInterface
    options: any

    onRequest(context: FetchContext) {
        context.options = context.options || {}
        console.log(context.options, 'options')
        context.options.headers = {
            Authorization: `Basic ${btoa('root:GJA4TI8zQciHrXq')}`,
            ...context.options.headers,
        } as any
    }
    context: App

    interceptor: null | Function
    initialState = {
        user: null,
        isLoggedIn: false
    }
    state

    constructor(context: App, options: ModuleOptions) {
        this.options = options
        this.context = context
        this.storage = new Storage(this.options.cookie)
        this.request = new Request(this.options.baseUrl);
        this.token = new Token(this.storage, this.options.token)
        this.refreshToken = new RefreshToken(this.storage, this.options.refreshToken)
        this.request.onRequest = this.onRequest;
        const initialState = this.initialState
        this.state = defineStore(options.storeID, {
            state() {
                return {
                    ...initialState
                }
            },
            actions: {
                SET(key: string, payload: any) {
                    this[key] = payload
                }
            },
            getters: {
                GET: state => {
                    return (key) => state[key]
                }
            }
        })
        this.interceptor = null
    }

    get loggedIn() {
        return this.state().GET('isLoggedIn')
    }

    set loggedIn(value) {
        this.state().SET('isLoggedIn', value)
    }

    get user() {
        return this.state().user
    }

    set user(value) {
        this.state().SET('user', value)

    }

    async init() {
        const tokenStatus = this.token.status()
        const refreshTokenStatus = this.refreshToken.status(true)
        // console.log(tokenStatus, refreshTokenStatus, 'init tokenStatus')
        // console.log([
        //     tokenStatus.valid(),
        //     tokenStatus.expired(),
        //     tokenStatus.unknown()
        // ])
        if (tokenStatus.valid()) {
            await this.initializeRequestInterceptor()
            if (this.options.user.fetchUser) {
                await this.fetchUser()
            }
            this.loggedIn = true
            return Promise.resolve()
        } else if (this.options.isRefreshable) {
            if (!refreshTokenStatus.checkDisabled()) {
                if (refreshTokenStatus.valid()) {
                    return await this.refreshTokens().then(async () => {
                        await this.initializeRequestInterceptor()
                        return Promise.resolve(true)
                    })
                } else {
                    this.reset()
                }
            } else if (!refreshTokenStatus.unknown()) {
                return await this.refreshTokens().then(async () => {
                    await this.initializeRequestInterceptor()
                    return Promise.resolve(true)
                })
            }
        }
    }

    check(checkStatus = false) {
        const response = {
            valid: false,
            tokenExpired: false,
            refreshTokenExpired: false,
            isRefreshable: true
        }

        // Sync token
        const token = this.token.sync()
        const refreshToken = this.refreshToken.sync()

        // Token is required but not available
        if (!token) {
            return response
        }

        // Check status wasn't enabled, let it pass
        if (!checkStatus) {
            response.valid = true
            return response
        }

        // Get status
        const tokenStatus = this.token.status()
        const refreshTokenStatus = this.refreshToken.status()

        // Token has expired. Attempt `tokenCallback`
        if (refreshTokenStatus.expired() && !refreshTokenStatus.checkDisabled()) {
            response.refreshTokenExpired = true
            return response
        }
        if (tokenStatus.expired()) {
            response.tokenExpired = true
            return response
        }

        response.valid = true
        return response
    }

    login(data?: any): Promise<any> {
        const request = {}, options = {}
        if (!this.options.endpoints.login) {
            throw new Error('Login endpoint is not defined')
        }
        if (typeof this.options.endpoints.login === 'string') {
            request.url = this.options.endpoints.login
        } else {
            request.url = this.options.endpoints.login.url
            request.method = Methods[this.options.endpoints.login.method?.toLocaleLowerCase()] || Methods['post']
            if (this.options.endpoints.login.method && Methods[this.options.endpoints.login.method] === 'POST') {
                options.body = data
            } else {
                options.params = data
            }
        }
        options.method = request.method
        return this.request._request(request.url, options).then(async res => {

            if (res.status === 200) {
                const token = res.data[this.options.token.property]
                const tokenExpiration = res.data[this.options.token.expiration] || this.options.token.expiration
                const refreshTokenExpiration = res.data[this.options.refreshToken.expiration] || this.options.refreshToken.expiration
                const refreshToken = res.data[this.options.refreshToken.property]
                this.token.set(token, tokenExpiration)
                this.refreshToken.set(refreshToken, refreshTokenExpiration)
                this.loggedIn = true
                this.initializeRequestInterceptor(this.options.endpoints.refresh)

                if (this.options.user.fetchUser) {
                    await this.fetchUser()
                } else {
                    this.user = {}
                }
            }

            return Promise.resolve(res)
        })
    }

    async logout() {
        // Only connect to logout endpoint if it's configured
        if (this.options.endpoints.logout) {
            const url = typeof this.options.endpoints.logout === 'object' ? this.options.endpoints.logout.url : this.options.endpoints.logout
            await this.request._request(url)
                .catch(() => {
                    //
                })
        }

        // But reset regardless
        return this.reset()
    }

    fetchUser() {
        const request = {}, options = {}
        if (!this.options.endpoints.user) {
            throw new Error('Login endpoint is not defined')
        }
        if (typeof this.options.endpoints.user === 'string') {
            request.url = this.options.endpoints.user
        } else {
            request.url = this.options.endpoints.user.url
            request.method = Methods[this.options.endpoints.user.method?.toLocaleLowerCase()] || Methods['get']
        }
        options.method = request.method
        options.headers = {}
        options.headers[this.options.token.name] = this.token.get()
        options.onRequest = (context) => console.log(context, 'fetchUser')
        return this.request._request(request.url, options)
            .then(res => {
                this.user = res.data[this.options.user.property]
                return Promise.resolve(res)
            }).catch(err => {
                if (err.status === 401) {
                    return this.refreshTokens()
                }
            })
    }

    initializeRequestInterceptor(refreshEndpoint?: string): void {
        this.interceptor = async (config) => {
            // Don't intercept refresh token requests
            if (this._needToken(config) || config.url === refreshEndpoint) {
                return config
            }

            // Perform scheme checks.
            const {
                valid,
                tokenExpired,
                refreshTokenExpired,
                isRefreshable
            } = this.check(true)
            // console.log({
            //     valid,
            //     tokenExpired,
            //     refreshTokenExpired,
            //     isRefreshable
            // })
            let isValid = valid

            // Refresh token has expired. There is no way to refresh. Force reset.
            if (refreshTokenExpired) {
                this.reset()
            }

            // Token has expired.
            if (tokenExpired) {
                // Refresh token is not available. Force reset.
                if (!isRefreshable) {
                    this.reset()
                }

                if (isRefreshable) {
                    isValid = await this
                        .refreshTokens()
                        .then(() => true)
                        .catch(() => {
                            // Tokens couldn't be refreshed. Force reset.
                            this.reset()
                            return false
                        })
                }
            }

            const token = this.token.get()
            if (!isValid) {
                return config
            }
            return this._getUpdatedRequestConfig(config, token)
        }
    }

    reset() {
        this.token.set(false, false)
        this.refreshToken.set(false, false)
        this.interceptor = null
    }


    private _getUpdatedRequestConfig(config, token: string | boolean) {
        if (typeof token === 'string') {
            config.headers[this.options.token.name] = token
        }

        return config
    }


    async refreshTokens() {

        const request = {}, options = {}
        if (!this.options.endpoints.refresh) {
            throw new Error('Refresh token endpoint is not defined')
        }
        if (typeof this.options.endpoints.refresh === 'string') {
            request.url = this.options.endpoints.refresh
            request.method = Methods.post
        } else {
            request.url = this.options.endpoints.refresh.url
            request.method = Methods[this.options.endpoints.refresh.method?.toLocaleLowerCase()] || Methods['post']
            if (request.method === 'POST') {
                options.body = {
                    refreshToken: this.refreshToken.get()
                }
            } else {
                options.params = {
                    refreshToken: this.refreshToken.get()
                }
            }
        }
        options.method = request.method
        return this.request._request(request.url, options)
            .then(res => {
                if (res.status === 200) {
                    const token = res.data[this.options.token.property]
                    const tokenExpiration = res.data[this.options.token.expiration] || this.options.token.expiration
                    const refreshTokenExpiration = res.data[this.options.refreshToken.expiration] || this.options.refreshToken.expiration
                    const refreshToken = res.data[this.options.refreshToken.property]
                    this.token.set(token, tokenExpiration)
                    this.refreshToken.set(refreshToken, refreshTokenExpiration)
                    return Promise.resolve(res)
                }

            }).catch(err => {
                this.reset()

                return Promise.reject(err)
            })
    }

    private _needToken(config): boolean {
        const options = this.options
        return (
            options.token.global ||
            Object.values(options.endpoints).some((endpoint: HTTPRequest | string) => {
                    return typeof endpoint === 'object'
                        ? endpoint.url === config.url
                        : endpoint === config.url
                }
            )
        )
    }
}

export default Auth
