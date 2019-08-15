import { Component, OnInit } from '@angular/core';
import { ElementProperty, Action } from '../input-table/input-table.component';
import { ElementBase } from '../input-table.service';
import { of } from 'rxjs';
import { RepositoryService, Product } from '../repository.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = ['id', {
        name: 'item_code',
        searchFn: (keyword) => {
            return of(this.repositoryService.getProducts().filter(product => product.item_code.includes(keyword)));
        },
        filterKey: 'item_code',
    }, {
        name: 'color',
        searchFn: (keyword, product?: Product) => {
            if (!product) {
                return of([]);
            }
            return of(this.repositoryService.getProductColor('product_id', product.id)
                .filter(color => color.includes(keyword)));
        },
        // filterKey: 'item_code',
    }, 'saler', 'sales_notes_no', 'place_date',];
    // 'item_code', 'length', 'unit_price', 'amount', 'style_number', 'good_date', 'term'];
    tableKey = 'order_detail';
    // actions: Action[] = [{
    //     class: 'glyphicon glyphicon-list-alt',
    //     title: 'order detail',
    //     click: (element: ElementBase) => {
    //         this.router.navigate(['order_detail'], {
    //             queryParams: {
    //                 element,
    //             }
    //         });
    //     },
    // },];

    constructor(private repositoryService: RepositoryService) { }

    ngOnInit() {
    }

}
