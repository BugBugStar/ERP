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
        }, 'name', 'bank', 'account'];
    tableKey = 'company_base_info';

    constructor() { }

    ngOnInit() {
    }

}
