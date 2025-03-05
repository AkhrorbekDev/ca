import Request, {RequestInterface} from '@/modules/auth/core/Request';
import {FetchContext} from "ofetch";
import Storage, {StorageInterface} from "@/modules/auth/core/Storage";
import {Methods} from "@/modules/auth/types";
import {defineStore} from "pinia";
import Token, {TokenInterface} from "@/modules/auth/Token";
import RefreshToken, {RefreshTokenInterface} from "@/modules/auth/RefreshToken";

class Auth {

    request: RequestInterface;
    storage: StorageInterface;
    token: TokenInterface
    refreshToken: RefreshTokenInterface
    options: any

    onRequest(context: FetchContext) {
        context.options = context.options || {}
        context.options.headers = {
            ...context.options.headers,
            'Authorization': `Basic ${btoa('root:GJA4TI8zQciHrXq')}`,
        }
    }

    interceptor: null
    initialState = {
        user: null,
        isLoggedIn: false
    }

    constructor(context, options) {
        this.options = options
        this.context = context
        this.storage = new Storage(this.options.cookie)
        this.request = new Request(this.options.baseUrl);
        this.token = new Token(this.storage, this.options.token)
        this.refreshToken = new RefreshToken(this.storage, this.options.refreshToken)
        this.request.onRequest = this.onRequest;
        const initialState = this.initialState
        this.state = defineStore(options.storeID, {
            state () {
                return {
                    ...initialState
                }
            },
            actions: {
                SET(key, payload) {
                    this[key] = payload
                }
            },
            getters: {
                GET: state => {
                    return (key) => state[key]
                }
            }
        })
    }

    get loggedIn () {
        return this.state().GET('isLoggedIn')
    }

    set loggedIn (value) {
        this.state().SET('isLoggedIn', value)
    }

    get user () {
        return this.state().user
    }

    async init () {
        // return this.request._request('http://localhost:3000')
    }

    check (checkStatus = false) {
        const response = {
            valid: false,
            tokenExpired: false
        }

        // Sync token
        const token = this.token.sync()
        // console.log(token, 'token')

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

        // Token has expired. Attempt `tokenCallback`
        // console.log(tokenStatus)
        if (tokenStatus.expired()) {
            response.tokenExpired = true
            return response
        }

        response.valid = true
        return response
    }

    login (data?: any): Promise<any> {
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
        return this.request._request(request.url, options).then(res => {

            if (res.status === 200) {
                const token = res.data[this.options.token.property]
                const tokenExpiration = res.data[this.options.token.expiration] || this.options.token.expiration
                const refreshTokenExpiration = res.data[this.options.refreshToken.expiration] || this.options.refreshToken.expiration
                const refreshToken = res.data[this.options.refreshToken.property]
                this.token.set(token, tokenExpiration * 1000)
                this.refreshToken.set(refreshToken, refreshTokenExpiration)
                this.initializeRequestInterceptor(this.options.endpoints.refresh)
            }

            return Promise.resolve(res)
        })
    }

    initializeRequestInterceptor(refreshEndpoint?: string): void {
        this.interceptor = async (config) => {
            // console.log(this.options.token, 'config')
            // Don't intercept refresh token requests
            // console.log(!this._needToken(config) || config.url === refreshEndpoint)
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
            let isValid = valid
            // console.log({
            //     valid,
            //     tokenExpired,
            //     refreshTokenExpired,
            //     isRefreshable
            // })

            // Refresh token has expired. There is no way to refresh. Force reset.
            if (refreshTokenExpired) {
                this.reset()
            }

            // Token has expired.
            /*if (tokenExpired) {
                // Refresh token is not available. Force reset.
                if (!isRefreshable) {
                    this.reset()
                }

                // Refresh token is available. Attempt refresh.
                if (this.options.isRefreshable) {
                    isValid = await this
                        .refreshTokens()
                        .then(() => true)
                        .catch(() => {
                            // Tokens couldn't be refreshed. Force reset.
                            this.reset()
                            return false
                        })
                }
            }*/

            // Sync token
            const token = this.token.get()

            // Scheme checks were performed, but returned that is not valid.
            /*if (!isValid) {
                return config
            }
*/
            // Token is valid, let the request pass
            // Fetch updated token and add to current request
            return this._getUpdatedRequestConfig(config, token)
        }
    }

    reset () {
        this.token.set(false)
        this.refreshToken.set(false)
    }


    private _getUpdatedRequestConfig(config, token: string | boolean) {
        // console.log('test', token)
        if (typeof token === 'string') {
            config.headers[this.options.token.name] = token
        }

        return config
    }


    refreshTokens () {



    }

    private _needToken(config): boolean {
        const options = this.options
        return (
            options.token.global ||
            Object.values(options.endpoints).some((endpoint: HTTPRequest | string) =>
                {
                    // console.log('test1222', typeof endpoint === 'object'
                    //     ? endpoint.url === config.url
                    //     : endpoint === config.url)
                    return typeof endpoint === 'object'
                        ? endpoint.url === config.url
                        : endpoint === config.url
                }
            )
        )
    }
}

export default Auth
