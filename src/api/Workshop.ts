import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Workshop extends ApiCoreFetch {

    getWorkshopService(): Promise<any> {
        return this.get("/mobile/v1/list/workshop_services");
    }

    getWorkshopCategory(): Promise<any> {
        return this.get(`/mobile/v1/list/workshop_categories`);
    }

    createWorkshop(data): Promise<any> {
        return this.post("/mobile/v1/advertisement", data);
    }

    updateWorkshop(id, data): Promise<any> {
        return this.put(`/mobile/v1/list/services/${id}`, data);
    }

    deleteWorkshop(id): Promise<any> {
        return this.delete(`/mobile/v1/list/services/${id}`);
    }
}

export default Workshop