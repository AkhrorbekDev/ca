import {ModuleOptions} from './types'

const moduleDefaults: ModuleOptions = {
    watchLoggedIn: true,
    redirect: {
        login: '/login',
        logout: '/',
        home: '/',
        callback: '/login'
    },
    storeID: 'auth',
    isRefreshable: false,
    cookie: {
        prefix: 'auth',
        options: {
            path: '/'
        }
    },
    localStorage: {
        prefix: 'auth'
    },
    setLoggedIn: false,
    token: {
        property: 'token',
        name: 'Authorization',
        type: 'Bearer',
        prefix: 'authToken',
        expiration: 'token_expire_time',
        maxAge: 60 * 60 * 24,
        expirationPrefix: 'expiration'
    },
    refreshToken: {
        property: 'refreshToken',
        name: 'Authorization',
        type: 'Bearer',
        prefix: 'authRefreshToken',
        expiration: 'refresh_token_expire_time',
        maxAge: 60 * 120 * 24,
        expirationPrefix: 'expiration'
    },
    user: {
        property: 'user',
        fetchUser: true
    }
}

export {moduleDefaults}
