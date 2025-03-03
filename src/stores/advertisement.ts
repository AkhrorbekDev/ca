import {defineStore} from "pinia";
import {ADV_TYPES} from "@/constants";

const useAdvertisementStore = defineStore({
    id: 'advertisement',
    state: () => ({
        services: {
            [ADV_TYPES.provide]: [],
            [ADV_TYPES.receive]: [],
        },
    }),
    actions: {
        setServices(key: ADV_TYPES, data: any) {
            this.services[key] = data
        }
    },
    getters: {
        getServices(state) {
            return state.services
        }
    }
})

export default useAdvertisementStore
