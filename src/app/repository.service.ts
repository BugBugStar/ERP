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
    // addProduct(customer: Product) {
    //     this.inputTableService.addElement(REPOSITORY_KEY, customer);
    // }

    // insertProduct(index, customer: Product) {
    //     this.inputTableService.insertElement(REPOSITORY_KEY, index, customer);
    // }

    // deleteProduct(id: number) {
    //     this.inputTableService.deleteElement(REPOSITORY_KEY, id);
    // }

    // modifyProduct(id: number, newProduct: Product) {
    //     this.inputTableService.modifyElement(REPOSITORY_KEY, id, newProduct);
    // }
}

export class Product extends ElementBase {
    name: string;
    item_code: string;
}

export class ProductDetail extends ElementBase {
    product_id: number
    color: string;
    length: string;
    unit_price: string;
}
// export const productKeys = ['id', 'name', 'item_code', ];
