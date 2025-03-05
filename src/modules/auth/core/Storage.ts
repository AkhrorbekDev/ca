import Cookies from 'universal-cookie'
import {ModuleOptions} from "@/modules/auth/types";
import {defu } from 'defu'
interface StorageInterface extends  Cookies {
}


class Storage implements StorageInterface {
    _cookies: Cookies;
    options: ModuleOptions['cookie']
    constructor(options) {
        this.options = options
        this._cookies = new Cookies();
    }

    get (name: string): string {
        const _name = this.options.prefix + '.' + name
        return this._cookies.get(_name);
    }

    set (name: string, value: string, options: any): void {
        const _name = this.options.prefix + '.' + name
        this._cookies.set(_name, value, defu(this.options, options));
    }

    remove (name: string): void {
        this._cookies.remove(name);
    }
}
export {StorageInterface}
export default Storage
