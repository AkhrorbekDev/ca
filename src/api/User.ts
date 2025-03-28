import ApiCoreFetch from '@/api/core/ApiCoreFetch';


export default class User extends ApiCoreFetch {
    constructor(app, options) {
        super(app, options);
    }

    getMe() {
        return this.get('/mobile/v2/user');
    }

    createReferralCode(data) {
        return this.post('/mobile/v1/referreal_code', data);
    }

    updateUserProfile(data): Promise<any> {
        return this.put('/mobile/v1/user', data);
    }

    updateReferralCode(data) {
        return this.put('/mobile/v1/referreal_code', data);
    }

    deleteReferralCode(id) {
        return this.delete('/mobile/v1/referreal_code', {
            referral_code: id
        });
    }
}
