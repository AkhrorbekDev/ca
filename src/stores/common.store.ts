import {defineStore} from "pinia";
import {ref} from "vue";

export const useCommonStore = defineStore("commonStore", () => {

    const activeService = ref({})

    return {
        activeService
    };
});