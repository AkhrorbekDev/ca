enum Methods {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE'
}

type Endpoint = {
    url: string;
    method: Methods
} | string;

type ModuleOptions = {
    endpoints: {
        login: Endpoint;
        user: Endpoint;
        refresh: Endpoint;
        logout: Endpoint;
    },
    redirect: {
        login: string
        logout: string
        callback: string
        home: string
    },
    watchLoggedIn: boolean
    isRefreshable: boolean
    setLoggedIn: boolean
    storeID: string;
    token: {
        name: string,
        type: string,
        prefix: string,
        expiration: number
        expirationPrefix: string
        maxAge: number
    }
    refreshToken: {
        name: string,
        type: string,
        prefix: string,
        expiration: number
        expirationPrefix: string
        maxAge: number
    }
    cookie: {
        prefix: string
        options: {
            path: string
            expires?: number | Date
            maxAge?: number
            domain?: string
            secure?: boolean
        }
    },
    user: {
        property: string,
        fetchUser: boolean
    }
}

export type {ModuleOptions}
export { Methods}
