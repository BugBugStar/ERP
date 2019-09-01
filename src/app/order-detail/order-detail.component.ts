import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { RepositoryService, Product } from '../repository.service';
import { LocalStorageService } from '../local-storage.service';
import { CustomerBase } from '../customer.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            isHidden: () => {
                return this.preview;
            }
        },
        {
            name: 'item_code',
            englishName: 'ITEM CODE',
            chineseName: '产品代码',
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
            englishName: 'color',
            chineseName: '颜色',
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
            englishName: 'LENGTH',
            chineseName: '长度',
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
            englishName: 'QUANTITY',
            chineseName: '数量（米/条/个）',
            onModelChange: (value, product: Product) => {
                product.quantity_editing = value;
                product.amount_editing = (Number(product.quantity_editing) * Number(product.unit_price_editing)).toString();
            },
        },
        {
            name: 'unit_price',
            englishName: 'UNIT PRICE',
            chineseName: '单价（元）',
            onModelChange: (value, product: Product) => {
                product.unit_price_editing = value;
                product.amount_editing = (Number(product.quantity_editing) * Number(product.unit_price_editing)).toString();
            },
        },
        {
            name: 'amount',
            englishName: 'AMOUNT',
            chineseName: '合计（元）',
            readonly: true,

        },
        {
            name: 'style_number',
            englishName: '',
            chineseName: '款号',
        },
        {
            name: 'good_date',
            englishName: '',
            chineseName: '货期',
        },
    ];
    tableKey = ['order_detail'];
    customer: CustomerBase;
    saler: string;
    salesNotesNum: string;
    placeDate: string;

    preview = false;

    constructor(
        private repositoryService: RepositoryService,
        private localStorageService: LocalStorageService) { }

    ngOnInit() {
        const { element, element: {
            customer,
            saler,
            sales_notes_no,
            place_date
        } } = this.localStorageService.getObject('route_params');
        this.tableKey.push(element.id);
        this.customer = customer;
        this.saler = saler;
        this.salesNotesNum = sales_notes_no;
        this.placeDate = place_date;
    }

}
