import ApiCoreFetch from "@/api/core/ApiCoreFetch";


export default class Image extends ApiCoreFetch {

    sendImage (data): Promise<any> {
        return this.post("/mobile/v1/advertisement/images", data);
    }
}