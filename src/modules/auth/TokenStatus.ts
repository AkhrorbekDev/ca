
export enum TokenStatusEnum {
    UNKNOWN = 'UNKNOWN',
    VALID = 'VALID',
    EXPIRED = 'EXPIRED',
    CHECK_DISABLED = 'DISABLED'
}

export class TokenStatus {
    private readonly _status: TokenStatusEnum

    constructor(token: string | boolean, tokenExpiresAt: number | false, checkDisabled: boolean | undefined = false) {
        this._status = this._calculate(token, tokenExpiresAt, checkDisabled)
    }

    unknown(): boolean {
        return TokenStatusEnum.UNKNOWN === this._status
    }

    valid(): boolean {
        return TokenStatusEnum.VALID === this._status
    }

    expired(): boolean {
        return TokenStatusEnum.EXPIRED === this._status
    }

    checkDisabled(): boolean {
        return TokenStatusEnum.CHECK_DISABLED === this._status
    }

    private _calculate(
        token: string | boolean,
        tokenExpiresAt: number | false,
        checkDisabled: boolean
    ): TokenStatusEnum {
        if (checkDisabled) {
            return TokenStatusEnum.CHECK_DISABLED
        }
        const now = Date.now()
        try {
            if (!token || !tokenExpiresAt) {
                return TokenStatusEnum.UNKNOWN
            }
        } catch (error) {
            return TokenStatusEnum.UNKNOWN
        }

        // Give us some slack to help the token from expiring between validation and usage
        const timeSlackMillis = 500
        tokenExpiresAt -= timeSlackMillis
        // Token is still valid
        if (now < tokenExpiresAt) {
            return TokenStatusEnum.VALID
        }

        return TokenStatusEnum.EXPIRED
    }
}
