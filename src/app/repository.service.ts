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
        return this.getProducts().find(element =>
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

    getProductUnitPriceByLength(productId: number, length: number, priceMethod: number, discount = 1, taxFactor = 1): number {
        const product = this.getProducts().find(p => p.id === productId);
        if (priceMethod === 0) {
            if (product.base_price && product.base_length && product.unit_price_per_cm) {
                const extraLength = (length - Number(product.base_length));
                let unitPrice = Number(product.base_price) + (extraLength <= 0 ? 0 : extraLength * Number(product.unit_price_per_cm));
                unitPrice *= 0.01 * discount * taxFactor;
                return unitPrice;
            }
        }
        return 0;
    }
}

export class Product extends ElementBase {
    name: string;
    item_code: string;
    item_code_editing: string | any;
    color_editing: string;
    amount_editing: string;
    quantity_editing: string;
    length_editing: string;
    unit_price_editing: string;
    base_price: string;
    base_length: string;
    unit_price_per_cm: string;
}

export class ProductDetail extends ElementBase {
    product_id: number;
    color: string;
    length: string;
    unit_price: string;
}
