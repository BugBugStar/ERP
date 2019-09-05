import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';
import { of } from 'rxjs';
import { RepositoryService, Product } from '../repository.service';
import { LocalStorageService } from '../local-storage.service';
import { CustomerBase } from '../customer.service';
import { InputTableService } from '../input-table.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            hidden: true,
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
        },
        {
            name: 'length',
            englishName: 'LENGTH',
            chineseName: '长度',
            onModelChange: (value, product: Product) => {
                product.length_editing = value;
                const unitPrice = this.getUnitPriceByLength(value, product);
                product.unit_price_editing = unitPrice.toString();
                product.amount_editing = this.getAmount(Number(product.quantity_editing), unitPrice);
            },
        },
        {
            name: 'quantity',
            englishName: 'QUANTITY',
            chineseName: '数量（米/条/个）',
            onModelChange: (value, product: Product) => {
                product.quantity_editing = value;
                product.amount_editing = this.getAmount(Number(product.quantity_editing), Number(product.unit_price_editing));
            },
        },
        {
            name: 'unit_price',
            englishName: 'UNIT PRICE',
            chineseName: '单价（元）',
            readonly: true,
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
    saler: {
        id: number,
        name: string,
        tel: string,
        address: string,
    };
    salesNotesNum: string;
    placeDate: string;
    priceMethod: {
        id: number,
        name: string,
    };
    tax: {
        id: number,
        name: string,
        taxFactor: number,
    };
    contract: string;
    totalQuantity: number;
    totalAmount: number;
    company;

    preview = false;

    constructor(
        private repositoryService: RepositoryService,
        private inputTableService: InputTableService,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit() {
        const { element, element: {
            customer,
            saler,
            sales_notes_no,
            place_date,
            price_method,
            tax,
            contract,
        } } = this.localStorageService.getObject('route_params');
        this.tableKey.push(element.id);
        this.customer = customer;
        this.saler = saler;
        this.salesNotesNum = sales_notes_no;
        this.placeDate = place_date;
        this.priceMethod = price_method;
        this.tax = tax;
        this.contract = contract;
        this.company = this.inputTableService.getElementList('company_base_info')[0];
        this.initTotal();
    }

    getUnitPriceByLength(length: number, product: Product): number {
        return this.repositoryService.getProductUnitPriceByLength(product.item_code_editing.id, length, this.priceMethod.id);
    }

    getAmount(quantity: number, unitPrice: number): string {
        return (quantity * unitPrice).toFixed(2);
    }

    initTotal() {
        const elementList = this.inputTableService.getElementList(this.tableKey);
        this.totalQuantity = this.getTotalQuantity(elementList);
        this.totalAmount = this.getTotalAmount(elementList);

    }

    getTotalQuantity(elementList) {
        return elementList.reduce((previousValue, currentValue, currentIndex: number, array) =>
            Number(previousValue.quantity) + Number(currentValue.quantity)
        );
    }

    getTotalAmount(elementList) {
        return elementList.reduce((previousValue, currentValue, currentIndex: number, array) =>
            Number(previousValue.amount) + Number(currentValue.amount) * this.tax.taxFactor
        );
    }

    onsave($event) {
        const { elementList } = $event;
        this.totalQuantity = this.getTotalQuantity(elementList);
        this.totalAmount = this.getTotalAmount(elementList);
    }
}
