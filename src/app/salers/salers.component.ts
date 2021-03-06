import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';

@Component({
    selector: 'app-salers',
    templateUrl: './salers.component.html',
    styleUrls: ['./salers.component.css']
})
export class SalersComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = ['id', 'name', 'tel', 'address'];
    tableKey = 'salers';

    constructor() { }

    ngOnInit() {
    }

}
