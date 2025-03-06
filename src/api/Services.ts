import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Services extends ApiCoreFetch {

    getServices(): Promise<any> {
        return this.get("/mobile/v1/list/services");
    }

    getService(id): Promise<any> {
        return this.get(`/mobile/v1/list/services/${id}`);
    }

    createService(data): Promise<any> {
        return this.post("/mobile/v1/list/services", data);
    }

    updateService(id, data): Promise<any> {
        return this.put(`/mobile/v1/list/services/${id}`, data);
    }

    deleteService(id): Promise<any> {
        return this.delete(`/mobile/v1/list/services/${id}`);
    }

    getFuelCompanies(params) {
        return this.get('/mobile/v1/list/fuels', params)
    }
}

export default Services
