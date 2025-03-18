import ApiCoreFetch from '@/api/core/ApiCoreFetch';


class Services extends ApiCoreFetch {

    getServices(): Promise<any> {
        return this.get('/public/mobile/v1/list/services', {
            noAuth: true,
        });
    }

    getService(id): Promise<any> {
        return this.get('/public/mobile/v1/list/services', {
            noAuth: true,
            id: id
        });
    }

    createService(data): Promise<any> {
        return this.post('/public/mobile/v1/list/services', data);
    }

    updateService(id, data): Promise<any> {
        return this.put(`/mobile/v1/list/services/${id}`, data);
    }

    deleteService(id): Promise<any> {
        return this.delete(`/mobile/v1/list/services/${id}`);
    }

    getFuelCompanies(params) {
        return this.get('/public/mobile/v1/list/fuels', {
            noAuth: true,
            ...params
        })
    }
}

export default Services
