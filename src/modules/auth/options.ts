import { ModuleOptions } from './types'

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
        expiration: 60 * 60 * 24,
        expirationPrefix: 'expiration'
    },
    refreshToken: {
        property: 'refreshToken',
        name: 'Authorization',
        type: 'Bearer',
        prefix: 'authRefreshToken',
        expiration: 60 * 120 * 24,
        expirationPrefix: 'expiration'
    },
}

export {moduleDefaults}
