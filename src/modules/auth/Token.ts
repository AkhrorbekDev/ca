import {StorageInterface} from "@/modules/auth/core/Storage";
import {addTokenPrefix} from "@/modules/auth/utils";
import {ModuleOptions} from "@/modules/auth/types";
import {TokenStatus} from "@/modules/auth/TokenStatus";

interface TokenInterface {
    storage: StorageInterface;
    options: ModuleOptions['token']
    token: string | false

    get(): string | false

    set(tokenValue: string | false, expiration: number | false): string | false

    sync(): string | false

    status(): TokenStatus

}

class Token {
    storage: StorageInterface;
    options: ModuleOptions['token']

    constructor(storage: StorageInterface, options: ModuleOptions['token']) {
        this.options = options
        this.storage = storage;
    }

    get() {
        const token = this.options.prefix
        return this.storage.get(token)
    }

    set(tokenValue: string | false, expiration: number | false): string | false {
        const token = addTokenPrefix(tokenValue, this.options.type)
        this._setToken(token)
        this._updateExpiration(expiration)
        return token
    }

    sync() {
        return this.get()
    }

    status() {
        return new TokenStatus(this.get(), this._getExpiration())
    }

    private _setToken(token: string | false): string | false {
        const key = this.options.prefix
        this.storage.set(key, token)
        return token as string | false
    }

    private _getToken(): string | false {
        const key = this.options.prefix
        return this.storage.get(key) as string | false
    }

    private _setExpiration(expiration: number | false): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        this.storage.set(key, expiration)
        return expiration as number | false
    }

    private _getExpiration(): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        return this.storage.get(key) as number | false
    }

    private _updateExpiration(expiration: number | false): number | false {
        let tokenExpiration
        const _tokenIssuedAtMillis = Date.now()
        const _tokenTTLMillis = Number(this.options.maxAge) * 1000
        const _tokenExpiresAtMillis = _tokenTTLMillis
            ? _tokenIssuedAtMillis + _tokenTTLMillis
            : 0

        try {
            tokenExpiration = expiration * 1000 || _tokenExpiresAtMillis
        } catch (error) {
            // If the token is not jwt, we can't decode and refresh it, use _tokenExpiresAt value
            tokenExpiration = _tokenExpiresAtMillis

            if (!(error && error.name === 'InvalidTokenError')) {
                throw error
            }
        }
        return this._setExpiration(tokenExpiration)
    }
}

export {TokenInterface}
export default Token
