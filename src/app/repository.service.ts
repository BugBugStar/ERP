import { Injectable } from '@angular/core';
import { InputTableService, ElementBase } from './input-table.service';
import * as _ from 'lodash';

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

    getProductDetail(productIdKey: string, productId: number): ProductDetail[] {
        return (this.inputTableService.getElementList(REPOSITORY_DETAIL_KEY) as ProductDetail[])
            .filter(product => product[productIdKey] === productId);
    }

    getProductUnitPriceByLength(productId: number, length: number, priceMethod: number, option: {
        discount: number,
        productIdKey: string,
    } = {
            discount: 1,
            productIdKey: 'product_id',
        }): number {
        const product = this.getProducts().find(p => p.id === productId);
        if (priceMethod === 0) {
            if (product.base_price && product.base_length && product.unit_price_per_cm) {
                const extraLength = (length - Number(product.base_length));
                let unitPrice = Number(product.base_price) + (extraLength <= 0 ? 0 : extraLength * Number(product.unit_price_per_cm));
                unitPrice *= 0.01 * option.discount;
                return unitPrice;
            }
        } else if (priceMethod === 1 && option.productIdKey) {
            const productDetails = this.getProductDetail(option.productIdKey, productId);
            const pds: {
                greater_equal_than_length: number,
                unit_price?: string,
            }[] = _.orderBy(productDetails.map(productDetail => ({
                ...productDetail,
                greater_equal_than_length: Number(productDetail.greater_equal_than_length),
            })), 'greater_equal_than_length', 'asc');
            if (pds.length === 0) {
                return NaN;
            }
            pds.unshift({
                greater_equal_than_length: 0,
            });
            let i = 0;
            for (; i < pds.length - 1; i++) {
                if (pds[i].greater_equal_than_length <= length && length < pds[i + 1].greater_equal_than_length) {
                    break;
                }
            }
            return 0.01 * Number(pds[i].unit_price);
        }
        return NaN;
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
    unit_price: string;
    greater_equal_than_length: string;
}
