import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    elementKeys = ['id', 'name', 'tel', 'address', 'company'];
    tableKey = 'customers';

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
    }
}
