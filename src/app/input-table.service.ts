import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class InputTableService {

    constructor(private localStorageService: LocalStorageService) { }

    getElementList(tableKey: string | string[]): ElementBase[] {
        let valueList;
        if (typeof tableKey === 'string') {
            valueList = this.localStorageService.getObject(tableKey);
        } else {
            if (tableKey.length === 0) {
                return [];
            }
            valueList = this.localStorageService.getObject(tableKey[0]);
            if (!valueList) {
                return [];
            }
            for (let i = 1; i < tableKey.length; i++) {
                valueList = valueList[tableKey[i]];
                if (!valueList) {
                    return [];
                }
            }
        }
        if (!valueList) {
            valueList = [];
        }
        return valueList;
    }

    addElement(tableKey: string | string[], element: ElementBase): void {
        if (typeof tableKey === 'string') {
            const elementList = this.getElementList(tableKey);
            elementList.push(element);
            this.localStorageService.setObject(tableKey, elementList);
        } else {
            if (tableKey.length === 0) {
                return;
            }
            const value = this.localStorageService.getObject(tableKey[0]);
            let elementList = { ...value };
            for (let i = 1; i < tableKey.length; i++) {
                elementList = elementList[i];
                if (!elementList) {
                    return;
                }
            }
            elementList.push(element);
            this.localStorageService.setObject(tableKey[0], value);
        }
    }

    insertElement(tableKey: string | string[], index, element: ElementBase) {
        this.doSomethingToElementList(tableKey, (elementList) => {
            elementList.splice(index, 0, element);
        });
    }

    deleteElement(tableKey: string | string[], id: number) {
        this.doSomethingToElementList(tableKey, (elementList) => {
            const elementIndex = elementList.findIndex(element => element.id === id);
            elementList.splice(elementIndex, 1);
        });
    }

    modifyElement(tableKey: string | string[], id: number, newElement: ElementBase) {
        this.doSomethingToElementList(tableKey, (elementList) => {
            const elementIndex = elementList.findIndex(element => element.id === id);
            elementList[elementIndex] = newElement;
        });
    }

    doSomethingToElementList(tableKey: string | string[], callback: (elementList: ElementBase[]) => void) {
        if (typeof tableKey === 'string') {
            const elementList = this.getElementList(tableKey);
            callback(elementList);
            this.localStorageService.setObject(tableKey, elementList);
        } else {
            if (tableKey.length === 0) {
                return;
            }
            let value = this.localStorageService.getObject(tableKey[0]);
            if (!value) {
                value = {};
            }
            let elementList = value;
            for (let i = 1; i < tableKey.length; i++) {
                let newElementList = elementList[tableKey[i]];
                if (!newElementList) {
                    elementList[tableKey[i]] = [];
                    newElementList = elementList[tableKey[i]];
                    // return;
                }
                elementList = newElementList;
            }
            callback(elementList);
            this.localStorageService.setObject(tableKey[0], value);
        }
    }
}

export class ElementBase {
    id: number;
    name: string;
}

export const elementKeys = ['id'];
