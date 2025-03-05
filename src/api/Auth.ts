import ApiCoreFetch from "@/api/core/ApiCoreFetch";


export default class Auth extends ApiCoreFetch {

    sendSmsCode (data): Promise<any> {
        return this.post("/mobile/v1/phone/register", data);
    }
}
