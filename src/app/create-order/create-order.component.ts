import { Component, OnInit } from '@angular/core';
import { ElementProperty, Action } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { CustomerService } from '../customer.service';
import { ElementBase } from '../input-table.service';
import { Router } from '@angular/router';

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
    tableKey = 'create_order';
    actions: Action[] = [{
        class: 'glyphicon glyphicon-list-alt',
        title: 'order detail',
        click: (element: ElementBase) => {
            this.router.navigate(['order_detail'], {
                queryParams: {
                    element,
                }
            });
        },
    }, ];

    constructor(private router: Router, private customerService: CustomerService) { }

    ngOnInit() {
    }

}
