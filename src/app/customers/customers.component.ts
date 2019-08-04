import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer, customerKeys } from '../customer.service';

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

}
