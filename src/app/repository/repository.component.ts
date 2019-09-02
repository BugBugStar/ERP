import { Component, OnInit } from '@angular/core';
import { ElementBase } from '../input-table.service';
import { Router } from '@angular/router';
import { Action, ElementProperty } from '../input-table/input-table.component';

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            hidden: true,
        },
        {
            name: 'item_code',
            englishName: 'ITEM CODE',
            chineseName: '产品代码',
        },
        {
            name: 'base_price',
            englishName: 'BASE PRICE',
            chineseName: '基本价格',
        },
        {
            name: 'base_length',
            englishName: 'BASE LENGTH',
            chineseName: '长度',
        },
        {
            name: 'unit_price_per_cm',
            englishName: 'UNIT PRICE(￥/(cm*100piece))',
            chineseName: '单价(元/(cm*100条))',
        }
    ];
    tableKey = 'repository';
    actions: Action[] = [
        {
            class: 'glyphicon glyphicon-list-alt',
            title: 'repository detail',
            click: (element: ElementBase) => {
                this.router.navigate(['repository_detail'], {
                    queryParams: {
                        element: JSON.stringify(element),
                    }
                });
            },
        },
    ];

    constructor(private router: Router) { }

    ngOnInit() {
    }

}
