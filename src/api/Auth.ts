import ApiCoreFetch from '@/api/core/ApiCoreFetch';


export default class Auth extends ApiCoreFetch {
    constructor(app, options) {
        super(app, options);
    }

    sendSmsCode(data): Promise<any> {
        return this.post('/mobile/v1/phone/register', data);
    }

    verifySmsCode(data): Promise<any> {
        return this.post('/mobile/v1/phone/verify', data);
    }


}
