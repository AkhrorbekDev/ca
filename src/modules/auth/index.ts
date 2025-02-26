import Auth from "@/modules/auth/Auth";
import {ModuleOptions} from "@/modules/auth/types";
import {moduleDefaults} from "@/modules/auth/options";
import {defu} from 'defu'
export default {
    install: async (app, options: ModuleOptions) => {
        console.log(defu(moduleDefaults, options))
        const $auth = new Auth(app, defu(moduleDefaults, options))
        console.log('log 1')
         $auth.init()
        console.log('log 2')

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
