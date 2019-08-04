import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    get(key: string): string {
        return window.localStorage.getItem(key);
    }

    set(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    getObject(key: string): any {
        try {
            return JSON.parse(this.get(key));
        } catch (error) {
            return null;
        }
    }

    setObject(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}
