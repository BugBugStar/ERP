import { Injectable } from '@angular/core';
import { InputTableService, ElementBase } from './input-table.service';

const CUSTOMERS_KEY = 'customers';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private inputTableService: InputTableService) { }

    getCustomers(): CustomerBase[] {
        return this.inputTableService.getElementList(CUSTOMERS_KEY) as CustomerBase[];
    }

    addCustomer(customer: CustomerBase) {
        this.inputTableService.addElement(CUSTOMERS_KEY, customer);
    }

    insertCustomer(index, customer: CustomerBase) {
        this.inputTableService.insertElement(CUSTOMERS_KEY, index, customer);
    }

    deleteCustomer(id: number) {
        this.inputTableService.deleteElement(CUSTOMERS_KEY, id);
    }

    modifyCustomer(id: number, newCustomer: CustomerBase) {
        this.inputTableService.modifyElement(CUSTOMERS_KEY, id, newCustomer);
    }
}

export class CustomerBase extends ElementBase {
    name: string;
    tel: string;
    address: string;
    company: {
        id: number;
        name: string;
        tel: string;
        address: string;
    };
    fax: string;
}

export const customerKeys = ['id', 'name', 'tel', 'address', 'company', ];
