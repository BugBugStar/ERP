import { Component, OnInit } from '@angular/core';
import { ElementBase } from '../input-table.service';
import { Router } from '@angular/router';
import { Action } from '../input-table/input-table.component';

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
    elementKeys = ['id', 'name', 'item_code', ];
    tableKey = 'repository';
    actions: Action[] = [{
        class: 'glyphicon glyphicon-list-alt',
        title: 'repository detail',
        click: (element: ElementBase) => {
            this.router.navigate(['repository_detail'], {
                queryParams: {
                    element: JSON.stringify(element),
                }
            });
        },
    }, ];

    constructor(private router: Router) { }

    ngOnInit() {
    }

}
