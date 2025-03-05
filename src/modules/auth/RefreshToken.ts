
import { StorageInterface} from "@/modules/auth/core/Storage";
import { addTokenPrefix } from "@/modules/auth/utils";
import {ModuleOptions} from "@/modules/auth/types";
import {TokenStatus} from "@/modules/auth/TokenStatus";

interface RefreshTokenInterface {
    storage: StorageInterface;
    options: ModuleOptions['token']
    token: string | false
}

class RefreshToken {
    storage: StorageInterface;
    options: ModuleOptions['refreshToken']
    constructor(storage: StorageInterface, options: ModuleOptions['refreshToken']) {
        this.options = options

        this.storage = storage;
    }

    get () {
        const token = this.options.prefix
        return this.storage.get(token)
    }

    set(tokenValue: string | false, expiration: number | false): string | false {
        const token = addTokenPrefix(tokenValue, this.options.type)
        this._setToken(token)

        this._updateExpiration(expiration)

        return token
    }


    sync () {
        return this.get()
    }

    status () {
        return new TokenStatus(this.get(), this._getExpiration())
    }


    private _setToken (token: string | false): string | false {
        const key = this.options.prefix
        this.storage.set(key, token)
        return token as string | false
    }

    private _getToken (): string | false {
        const key = this.options.prefix
        return this.storage.get(key) as string | false
    }

    private _setExpiration (expiration: number | false): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        this.storage.set(key, expiration)
        return expiration as number | false
    }
    private _getExpiration (): number | false {
        const key = this.options.prefix + '.' + this.options.expirationPrefix
        return this.storage.get(key) as number | false
    }

    private _updateExpiration (expiration: number | false): number | false {
        return this._setExpiration(expiration)
    }
}

export {RefreshTokenInterface}
export default RefreshToken
