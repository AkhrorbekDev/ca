import Auth from "@/modules/auth/Auth";
import {ModuleOptions} from "@/modules/auth/types";
import {moduleDefaults} from "@/modules/auth/options";
import {defu} from 'defu'

export default {
    install: async (app, options: ModuleOptions) => {
        const $auth = new Auth(app, defu(moduleDefaults, options))
        $auth.init()
        app.config.globalProperties.$auth = $auth
        app.provide('auth', $auth)

        // app.mount(options.appId)

        return {
            provide: {
                auth: $auth
            }
        }

    }
}
