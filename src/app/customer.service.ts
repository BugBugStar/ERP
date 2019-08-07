import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const CUSTOMERS_KEY = 'customers';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private localStorageService: LocalStorageService) { }

    getCustomers(): CustomerBase[] {
        let customers = this.localStorageService.getObject(CUSTOMERS_KEY);
        if (!customers) {
            customers = [];
        }
        return customers;
    }

    addCustomer(customer: CustomerBase) {
        const customers = this.getCustomers();
        customers.push(customer);
        this.localStorageService.setObject(CUSTOMERS_KEY, customers);
    }

    insertCustomer(index, customer: CustomerBase) {
        const customers = this.getCustomers();
        customers.splice(index, 0, customer);
        this.localStorageService.setObject(CUSTOMERS_KEY, customers);
    }

    deleteCustomer(id: number) {
        const customers = this.getCustomers();
        const customerIndex = customers.findIndex(customer => customer.id === id);
        customers.splice(customerIndex, 1);
        this.localStorageService.setObject(CUSTOMERS_KEY, customers);
    }

    modifyCustomer(id: number, newCustomer: CustomerBase) {
        const customers = this.getCustomers();
        let customerIndex = customers.findIndex(customer => customer.id === id);
        customers[customerIndex] = newCustomer;
        this.localStorageService.setObject(CUSTOMERS_KEY, customers);
    }
}

export class CustomerBase {
    id: number;
    name: string;
    tel: string;
    address: string;
    company: string;
}

export const customerKeys = ["id", "name", "tel", "address", "company"];
