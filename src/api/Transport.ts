import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Transport extends ApiCoreFetch {

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

export default Transport
