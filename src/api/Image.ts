import ApiCoreFetch from "@/api/core/ApiCoreFetch";


export default class Image extends ApiCoreFetch {

    sendImage(data): Promise<any> {
        return this.post("/mobile/v1/advertisement/images", data, {
            Accept: '*/*'
        });
    }

    test(formData) {
        return this.post('https://api.carting.uz/web/v1/public/files/upload/category/advertisements', formData)
    }
}
