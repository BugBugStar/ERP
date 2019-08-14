import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-repository-detail',
    templateUrl: './repository-detail.component.html',
    styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
    elementKeys = ['id', 'name', {
        name: 'product_id',
        primaryKey: true,
        getValue: () => {
            return this.productId;
        },
    }, 'color', 'length', 'unit_price', ];
    tableKey = 'repository-detail';
    itemCode = '';
    productId = '';

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const element = JSON.parse(this.route.snapshot.queryParams.element);
        this.itemCode = element.item_code;
        this.productId = element.id;

    }

}
