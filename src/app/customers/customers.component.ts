import { Component, OnInit } from '@angular/core';
import { ElementProperty } from '../input-table/input-table.component';
import { InputTableService } from '../input-table.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    elementKeys: (string | ElementProperty)[] = ['id', 'name', 'tel', 'address',
        {
            name: 'company',
            searchFn: (keyword) => {
                return of(this.inputTableService.getElementList('companys')
                    .filter(company => company.name.includes(keyword))
                    .map((company, index) => ({
                        id: index,
                        option: company,
                    }))
                );
            },
            filterKey: 'name',
        }];
    tableKey = 'customers';

    constructor(private inputTableService: InputTableService) { }

    ngOnInit() {
    }
}
