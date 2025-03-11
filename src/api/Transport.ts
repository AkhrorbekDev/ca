import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Transport extends ApiCoreFetch {

    getTransportByServiceId(id): Promise<any> {
        return this.get("/public/mobile/v1/list/transportation_types", {
            service_id: id,
            noAuth: true
        });
    }

    createAdvertisement(data): Promise<any> {
        return this.post('/mobile/v1/advertisement', data)
    }

    getCars(id) {
        return this.get("/public/mobile/v1/list/cars", {
            service_id: id,
            noAuth: true

        });
    }
}

export default Transport
