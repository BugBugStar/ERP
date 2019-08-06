import { Component, OnInit } from '@angular/core';
import { CustomerService, CustomerBase, customerKeys } from '../customer.service';

const editingMark = "_editing";

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    customers: Customer[];
    tableHeads: string[] = [];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.initCustomer();
        this.tableHeads = customerKeys;
    }

    initCustomer() {
        this.customers = this.customerService.getCustomers();
    }
    
    addRow(): void {
        const latestId = this.customers.length === 0 ? 0 :
            this.customers[this.customers.length - 1].id;
        this.customers = [
            ...this.customers,
            this.generateEmptyCustomers(latestId + 1),
        ];
    }

    generateEmptyCustomers(id: number): Customer {
        const customer = new Customer();
        customer.id = id;
        customer.editing = true;
        customer.new = true;
        return customer;
    }

    onclickSave(id: number) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        const customer = this.customers[customerIndex];
        customer.editing = false;
        for (const key of Object.keys(customer)) {
            if (key.includes(editingMark)) {
                const originKey = key.split(editingMark)[0];
                customer[originKey] = customer[key];
            }
        }

        if (customer.new) {
            delete customer.new;
            this.customerService.insertCustomer(customerIndex, customer);
        } else {
            this.customerService.modifyCustomer(id, customer);
        }
    }

    onclickEdit(id: number) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers[customerIndex].editing = true;
        for (const key of customerKeys) {
            this.customers[customerIndex][key + editingMark] = this.customers[customerIndex][key];
        }
    }

    onclickDelete(id: number) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers.splice(customerIndex, 1);
        this.customers = this.customers.concat();
        this.customerService.deleteCustomer(id);
    }

    onclickCancel(id: number) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers[customerIndex].editing = false;
    }
}

class Customer extends CustomerBase {
    editing?: boolean;
    new?: boolean;
}
