import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
    elementKeys = ['id', 'name', 'item_code', 'color', 'length', 'unit_price',];
    tableKey = 'repository';

    constructor() { }

    ngOnInit() {
    }

}
