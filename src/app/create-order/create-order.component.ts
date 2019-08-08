import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
    elementKeys = ['id', 'name', 'customer', 'saler', 'sales_notes_no', 'place_date',];
    // 'product', 'length', 'unit_price', 'amount', 'style_number', 'good_date', 'term'];
    tableKey = 'create_order';

    constructor() { }

    ngOnInit() {
    }

}
