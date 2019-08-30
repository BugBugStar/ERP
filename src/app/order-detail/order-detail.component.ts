import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { RepositoryService, Product } from '../repository.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        'id',
        {
            name: 'item_code',
            searchFn: (keyword) => {
                return of(this.repositoryService.getProducts().filter(product => product.item_code.includes(keyword))
                    .map((product, index) => ({
                        id: index,
                        option: product,
                    })));
            },
            filterKey: 'item_code',
            onModelChange: (itemCode, product: Product) => {
                product.color_editing = '';
            },
        },
        {
            name: 'color',
            searchFn: (keyword, product?: Product) => {
                if (!product) {
                    return of([]);
                }
                return of(this.repositoryService.getProductColor('product_id', product.item_code_editing.id)
                    .filter(color => color.includes(keyword))
                    .map((color, index) => ({
                        id: index,
                        option: color,
                    })));
            },
        },
        {
            name: 'length',
            searchFn: (keyword, product?: Product) => {
                if (!product) {
                    return of([]);
                }
                return of(this.repositoryService.getProductLength('product_id', product.item_code_editing.id)
                    .filter(color => color.includes(keyword))
                    .map((color, index) => ({
                        id: index,
                        option: color,
                    })));
            },
        },
        {
            name: 'quantity',
            onModelChange: (value, product: Product) => {
                product.quantity_editing = value;
                product.amount_editing = (Number(product.quantity_editing) * Number(product.unit_price_editing)).toString();
            },
        },
        {
            name: 'unit_price',
            onModelChange: (value, product: Product) => {
                product.unit_price_editing = value;
                product.amount_editing = (Number(product.quantity_editing) * Number(product.unit_price_editing)).toString();
            },
        },
        {
            name: 'amount',
            readonly: true,

        }, 'style_number', 'good_date'];
    tableKey = ['order_detail'];

    constructor(
        private repositoryService: RepositoryService,
        private localStorageService: LocalStorageService) { }

    ngOnInit() {
        const { element } = this.localStorageService.getObject('route_params');
        this.tableKey.push(element.id);
    }

}
