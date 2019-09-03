import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-salers',
    templateUrl: './salers.component.html',
    styleUrls: ['./salers.component.css']
})
export class SalersComponent implements OnInit {
    elementKeys = ['id', 'name', 'tel', 'address'];
    tableKey = 'salers';

    constructor() { }

    ngOnInit() {
    }

}
