import { Component, OnInit } from '@angular/core';
import { ElementProperty, Action } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { CustomerService } from '../customer.service';
import { ElementBase, InputTableService } from '../input-table.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            hidden: true,
        },
        {
            name: 'customer',
            searchFn: (keyword) => {
                return of(this.customerService.getCustomers().filter(customer => customer.name.includes(keyword))
                    .map((customer, index) => ({
                        id: index,
                        option: customer,
                    })));
            },
            filterKey: 'name',
        },
        {
            name: 'saler',
            searchFn: (keyword) => {
                return of(this.inputTableService.getElementList('salers')
                    .filter(saler => saler.name.includes(keyword))
                    .map((saler, index) => ({
                        id: index,
                        option: saler,
                    }))
                );
            },
            filterKey: 'name',
        }, 'sales_notes_no', 'place_date', 'term',
        {
            name: 'price_method',
            chineseName: '定价方式',
            option: [
                {
                    id: 0,
                    name: '基本价格+附加费',
                },
                {
                    id: 1,
                    name: '一口价',
                }
            ],
            filterKey: 'name',
        },
        {
            name: 'tax',
            chineseName: '税率',
            option: [
                {
                    id: 0,
                    name: '无',
                    taxFactor: 1,
                },
                {
                    id: 1,
                    name: '1.08',
                    taxFactor: 1.08,
                },
                {
                    id: 2,
                    name: '1.13',
                    taxFactor: 1.13,
                }
            ],
            filterKey: 'name',
        },
    ];
    tableKey = 'create_order';
    actions: Action[] = [{
        class: 'glyphicon glyphicon-list-alt',
        title: 'order detail',
        click: (element: ElementBase) => {
            this.localStorageService.setObject('route_params', { element });
            this.router.navigate(['order_detail']);
        },
    }];

    constructor(
        private router: Router,
        private inputTableService: InputTableService,
        private customerService: CustomerService,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit() {
    }

}
