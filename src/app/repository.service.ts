import { Injectable } from '@angular/core';
import { InputTableService, ElementBase } from './input-table.service';

const REPOSITORY_KEY = 'repository';
const REPOSITORY_DETAIL_KEY = 'repository-detail';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    constructor(private inputTableService: InputTableService) { }

    getProducts(): Product[] {
        return this.inputTableService.getElementList(REPOSITORY_KEY) as Product[];
    }

    getProduct(productIdKey: string, productId: number): Product {
        return this.inputTableService.getElementList(REPOSITORY_KEY).find(element =>
            element[productIdKey] === productId) as Product;
    }

    getProductColor(productIdKey: string, productId: number): string[] {
        return (this.inputTableService.getElementList(REPOSITORY_DETAIL_KEY) as ProductDetail[])
            .filter(product => product[productIdKey] === productId)
            .map(product => product.color);
    }

    getProductLength(productIdKey: string, productId: number): string[] {
        return (this.inputTableService.getElementList(REPOSITORY_DETAIL_KEY) as ProductDetail[])
            .filter(product => product[productIdKey] === productId)
            .map(product => product.length);
    }
}

export class Product extends ElementBase {
    name: string;
    item_code: string;
    item_code_editing: string | any;
    color_editing: string;
    amount_editing: string;
    quantity_editing: string;
    unit_price_editing: string;
}

export class ProductDetail extends ElementBase {
    product_id: number;
    color: string;
    length: string;
    unit_price: string;
}
