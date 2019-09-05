import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementProperty } from '../input-table/input-table.component';

@Component({
    selector: 'app-repository-detail',
    templateUrl: './repository-detail.component.html',
    styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            hidden: true,
        },
        {
            name: 'product_id',
            primaryKey: true,
            getValue: () => {
                return this.productId;
            },
        },
        {
            name: 'greater_equal_than_length',
            chineseName: '≥该长度',
        },
        {
            name: 'unit_price',
            chineseName: '单价',
        },
    ];
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
