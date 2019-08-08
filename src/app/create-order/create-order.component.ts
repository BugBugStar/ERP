import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = ['id', 'name', {
        name: 'customer',
        searchFn: (keyword) => {
            return of(this.customerService.getCustomers().filter(customer => customer.name.includes(keyword)));
        },
        filterKey: 'name',
    }, 'saler', 'sales_notes_no', 'place_date', ];
    // 'product', 'length', 'unit_price', 'amount', 'style_number', 'good_date', 'term'];
    tableKey = 'create_order';

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
    }

}
