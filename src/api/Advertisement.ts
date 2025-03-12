import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Advertisement extends ApiCoreFetch {

    getAdvertisement(params): Promise<any> {
        return this.get("/public/mobile/v1/advertisement", {
            adv_type: 'PROVIDE', // RECEIVE,
            noAuth: true,
            ...params
        });
    }

    createAdvertisement(data): Promise<any> {
        return this.post('/mobile/v1/advertisement', data).then(res => {
            if (this.context.config.globalProperties.$toast) {
                this.context.config.globalProperties.$toast.add({
                    severity: 'success',
                    summary: 'E\'lon yaratildi',
                    life: 2000,
                    group: 'br'
                })
            }
            return Promise.resolve(res)
        })
    }
}

export default Advertisement
