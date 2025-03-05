import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Advertisement extends ApiCoreFetch {

    getAdvertisement(params): Promise<any> {
        return this.get("/mobile/v1/advertisement", {
            adv_type: 'PROVIDE', // RECEIVE,
            ...params
        });
    }

    createAdvertisement(data): Promise<any> {
        return this.post('/mobile/v1/advertisement', data)
    }
}

export default Advertisement
