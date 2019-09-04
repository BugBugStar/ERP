import { Component, OnInit } from '@angular/core';
import { ElementProperty, Action } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { CustomerService, CustomerBase } from '../customer.service';
import { ElementBase, InputTableService } from '../input-table.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css'],
    providers: [DatePipe],
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
                    }))
                );
            },
            onModelChange: (value, order: Order) => {
                const orders = this.inputTableService.getElementList('create_order') as Order[];
                const today = this.datePipe.transform(new Date(), 'yMMdd');
                let contractId = 0;
                orders.forEach(o => {
                    if (!o.contract || o.contract.slice(5, 5 + 8) !== today) {
                        return;
                    }
                    contractId = Math.max(Number(o.contract.slice(5 + 8)), contractId);
                });
                order.contract_editing = order.customer_editing.company.id.toString().padStart(5, '000') +
                    today + (contractId + 1).toString().padStart(5, '000');
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
        {
            name: 'contract',
            chineseName: '合同号',
            readonly: true,
        }
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
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
    }

}

export class Order extends ElementBase {
    customer_editing: CustomerBase;
    contract: string;
    contract_editing: string;
}
