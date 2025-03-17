import type {StorageInterface} from "@/modules/auth/core/Storage";
import {addTokenPrefix} from "@/modules/auth/utils";
import type {ModuleOptions} from "@/modules/auth/types";
import {TokenStatus} from "@/modules/auth/TokenStatus";

interface RefreshTokenInterface {
    storage: StorageInterface;
    options: ModuleOptions['token']

    get(): string | false

    set(tokenValue: string | false, expiration: number | false): string | false

    sync(): string | false

    status(expireInvalid: boolean): TokenStatus
}

class RefreshToken implements RefreshTokenInterface {
    storage: StorageInterface;
    options: ModuleOptions['refreshToken']

    constructor(storage: StorageInterface, options: ModuleOptions['refreshToken']) {
        this.options = options

        this.storage = storage;
    }

    get() {
        const token = this.options.prefix
        return this.storage.get(token)
    }

    set(tokenValue: string | false, expiration: number | false): string | false {
        const token = addTokenPrefix(tokenValue)
        this._setToken(token)

        this._updateExpiration(expiration)

        return tokenValue
    }


    sync() {
        return this.get()
    }

    status(expireInvalid = false) {
        return new TokenStatus(this.get(), this._getExpiration(), expireInvalid)
    }


    private _setToken(token: string | boolean): string | false {
        const key = this.options.prefix
        this.storage.set(key, token)
        return token as string | false
    }

    private _getToken(): string | false {
        const key = this.options.prefix
        return this.storage.get(key) as string | false
    }

    private _setExpiration(expiration: number | boolean): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        this.storage.set(key, expiration)
        return expiration as number | false
    }

    private _getExpiration(): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        return this.storage.get(key) as number | false
    }

    private _updateExpiration(expiration: number | boolean | bigint | any): number | false {
        let tokenExpiration
        const _tokenIssuedAtMillis = Date.now()
        const _tokenTTLMillis = Number(this.options.maxAge) * 1000
        const _tokenExpiresAtMillis = _tokenTTLMillis
            ? _tokenIssuedAtMillis + _tokenTTLMillis
            : 0

        try {
            if (!expiration) return expiration
            tokenExpiration = expiration * 1000 || _tokenExpiresAtMillis
        } catch (error: Error | any | unknown) {
            // If the token is not jwt, we can't decode and refresh it, use _tokenExpiresAt value
            tokenExpiration = _tokenExpiresAtMillis

            if (!(error && error.name === 'InvalidTokenError')) {
                throw error
            }
        }
        return this._setExpiration(tokenExpiration || false)
    }

}

export type {RefreshTokenInterface}
export default RefreshToken
