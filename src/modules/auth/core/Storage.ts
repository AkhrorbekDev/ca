import Cookies from 'universal-cookie'
import type {ModuleOptions} from "@/modules/auth/types";
import {defu} from 'defu'

interface StorageInterface {
    get: Cookies['get']
    set: Cookies['set']
    remove: Cookies['remove']
}


class Storage implements StorageInterface {
    _cookies: Cookies;
    options: ModuleOptions['cookie']

    constructor(options: ModuleOptions['cookie']) {
        this.options = options
        this._cookies = new Cookies();
    }

    get(name: string): string {
        const _name = this.options.prefix + '.' + name
        return this._cookies.get(_name);
    }

    set(name: string, value: string, options: any): void {
        const _name = this.options.prefix + '.' + name
        console.log({
            _name,
            name,
            value
        })
        this._cookies.set(_name, value, defu(this.options, options));
    }

    remove(name: string): void {
        this._cookies.remove(name);
    }
}

export type {StorageInterface}
export default Storage
