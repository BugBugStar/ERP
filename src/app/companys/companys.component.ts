import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';

@Component({
    selector: 'app-companys',
    templateUrl: './companys.component.html',
    styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = ['id', 'name', 'tel', 'address'];
    tableKey = 'companys';

    constructor() { }

    ngOnInit() {
    }

}
