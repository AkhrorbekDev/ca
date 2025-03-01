import * as Classes from '@/api'

const _container = {}


export default {
    install: (app, options) => {
        const classes = {}
        Object.keys(Classes.default).forEach((key) => {
            classes[key.toLowerCase()] = Classes.default[key]
        })
        const api = new Proxy(_container, {
            get: (t, n) => {
                if (!t[n]) {
                    console.trace('new', n, classes, Classes, options)
                    t[n] = new classes[n](app, options)
                }
                return t[n]
            },
        })

        app.provide('api', api)

        return {
            provide: {
                api: api
            }
        }


    }
}
