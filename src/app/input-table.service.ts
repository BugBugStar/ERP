import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class InputTableService {

    constructor(private localStorageService: LocalStorageService) { }

    getElementList(tableKey: string): ElementBase[] {
        let valueList = this.localStorageService.getObject(tableKey);
        if (!valueList) {
            valueList = [];
        }
        return valueList;
    }

    addElement(tableKey: string, customer: ElementBase) {
        const elementList = this.getElementList(tableKey);
        elementList.push(customer);
        this.localStorageService.setObject(tableKey, elementList);
    }

    insertElement(tableKey: string, index, customer: ElementBase) {
        const elementList = this.getElementList(tableKey);
        elementList.splice(index, 0, customer);
        this.localStorageService.setObject(tableKey, elementList);
    }

    deleteElement(tableKey: string, id: number) {
        const elementList = this.getElementList(tableKey);
        const elementIndex = elementList.findIndex(customer => customer.id === id);
        elementList.splice(elementIndex, 1);
        this.localStorageService.setObject(tableKey, elementList);
    }

    modifyElement(tableKey: string, id: number, newElement: ElementBase) {
        const elementList = this.getElementList(tableKey);
        const elementIndex = elementList.findIndex(customer => customer.id === id);
        elementList[elementIndex] = newElement;
        this.localStorageService.setObject(tableKey, elementList);
    }
}

export class ElementBase {
    id: number;
    name: string;
}

export const elementKeys = ['id', 'name', ];
