import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const CUSTOMERS_KEY = "customers";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private localStorageService: LocalStorageService) { }

    getCustomers(): Customer[] {
        let customers = this.localStorageService.getObject(CUSTOMERS_KEY);
        if (!customers) {
            customers = [];
        }
        return customers;
    }

    addCustomer(customer: Customer) {
        const customers = this.getCustomers();
        customers.push(customer);
        this.localStorageService.setObject(CUSTOMERS_KEY, customers);
    }

    deleteCustomer(id: number) {
        const customers = this.getCustomers();
        const customerIndex = customers.findIndex(customer => customer.id === id);
        customers.splice(customerIndex, 1);
    }

    modifyCustomer(id: number, newCustomer: Customer) {
        const customers = this.getCustomers();
        let customer = customers.find(customer => customer.id === id);
        customer = newCustomer;
        
    }
}

export interface Customer {
    id: number;
    name: string;
    tel: string;
    address: string;
    company: string;
}

export const customerKeys = ["id", "name", "tel", "address", "company"];
