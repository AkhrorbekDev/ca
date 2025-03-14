import ApiCoreFetch from "@/api/core/ApiCoreFetch";


class Announcement extends ApiCoreFetch {

    getAnnouncement(params): Promise<any> {
        return this.get("/public/mobile/v1/advertisement", {
            ...params
        });
    }

    getUserAnnouncement(params): Promise<any> {
        return this.get("/mobile/v1/user/advertisement", {
            ...params
        });
    }

    editAnnouncement({id, data}: { id: number; data: any }): Promise<any> {
        return this.put(`/mobile/v1/advertisement`, {data});
    }
}

export default Announcement
