import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';

@Component({
    selector: 'app-company-base-info',
    templateUrl: './company-base-info.component.html',
    styleUrls: ['./company-base-info.component.css']
})
export class CompanyBaseInfoComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = [
        {
            name: 'id',
            hidden: true,
        }, 'name',
        {
            name: 'bank_of_public_account',
            chineseName: '对公账户银行'
        },
        {
            name: 'public_account',
            chineseName: '对公账户'
        },
        {
            name: 'bank_of_self_account',
            chineseName: '个人账户银行'
        },
        {
            name: 'self_account',
            chineseName: '个人账户银行'
        },
    ];
    tableKey = 'company_base_info';

    constructor() { }

    ngOnInit() {
    }

}
