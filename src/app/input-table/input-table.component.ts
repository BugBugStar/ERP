import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputTableService, ElementBase } from '../input-table.service';
import { Observable } from 'rxjs';

const editingMark = '_editing';
class Element extends ElementBase {
    editing?: boolean;
    new?: boolean;
}
export class ElementProperty {
    name?: string;
    option?: string[] | any[];
    searchFn?: (keyword: string) => Observable<any[]>;
    filterKey?: string;
    readonly?: boolean;
    disabled?: boolean;
    primaryKey?: boolean;
    getValue?: () => string;
}

export class Action {
    isShow?: (element: ElementBase) => boolean;
    class?: string;
    getClass?: (element: ElementBase) => string;
    title?: string;
    click?: (element: ElementBase) => void;
}

@Component({
    selector: 'app-input-table',
    templateUrl: './input-table.component.html',
    styleUrls: ['./input-table.component.css']
})
export class InputTableComponent implements OnInit {
    @Input() elementKeys: (string | ElementProperty)[] = [];
    @Input() tableKey = '';
    @Input() actions: Action[] = [];
    @Output() onclickDetail = new EventEmitter<ElementBase>();

    elementList: Element[];
    titleHeads: string[];
    primaryKey: ElementProperty;

    constructor(private inputTableService: InputTableService) { }

    ngOnInit() {
        this.initPrimaryKey();
        this.initElementList(this.primaryKey);
        this.titleHeads = this.elementKeys.filter(elementKey => {
            if (typeof elementKey === 'object') {
                return !elementKey.primaryKey;
            } else {
                return true;
            }
        }).map(elementKey => {
            if (typeof elementKey === 'object') {
                return elementKey.name;
            } else {
                return elementKey;
            }
        });
        this.elementKeys.forEach(elementKey => {
            if (typeof elementKey !== 'object') {
                return;
            }
            if (elementKey.searchFn) {
                this.onSearch('', elementKey);
            }
            if (elementKey.primaryKey && elementKey.getValue) {
                this.elementList.forEach(element => {
                    element[elementKey.name] = elementKey.getValue();
                });
            }
        });
    }

    initElementList(primaryKey: ElementProperty) {
        this.elementList = this.inputTableService.getElementList(this.tableKey)
            .filter(element => !primaryKey || (primaryKey && element[primaryKey.name] === primaryKey.getValue()));
    }

    initPrimaryKey() {
        this.primaryKey = (this.elementKeys.find(elementKey =>
            typeof elementKey === 'object' && elementKey.primaryKey) as ElementProperty);
    }

    addRow(): void {
        const latestId = this.elementList.length === 0 ? 0 :
            this.elementList[this.elementList.length - 1].id;
        this.elementList = [
            ...this.elementList,
            this.generateEmptyElements(latestId + 1),
        ];
    }

    generateEmptyElements(id: number): Element {
        const element = new Element();
        element.id = id;
        element.editing = true;
        element.new = true;

        this.elementKeys.forEach(elementKey => {
            if (typeof elementKey !== 'object') {
                if (elementKey !== 'id') {
                    element[elementKey] = '';
                }
            } else {
                if (elementKey.primaryKey) {
                    element[elementKey.name] = elementKey.getValue();
                    return;
                }
                element[elementKey.name] = '';
            }
        });
        return element;
    }

    onclickSave(id: number) {
        const elementIndex = this.elementList.findIndex(e => e.id === id);
        const element = this.elementList[elementIndex];
        element.editing = false;
        for (const key of Object.keys(element)) {
            if (key.includes(editingMark)) {
                const originKey = key.split(editingMark)[0];
                element[originKey] = element[key];
            }
        }

        if (element.new) {
            delete element.new;
            this.inputTableService.insertElement(this.tableKey, elementIndex, element);
        } else {
            this.inputTableService.modifyElement(this.tableKey, id, element);
        }
    }

    onclickEdit(element: Element) {
        element.editing = true;
        for (const property of this.elementKeys) {
            const key = typeof property === 'object' ? property.name : property;
            element[key + editingMark] = element[key];
        }
    }

    onclickDelete(id: number) {
        const elementIndex = this.elementList.findIndex(element => element.id === id);
        this.elementList.splice(elementIndex, 1);
        this.elementList = this.elementList.concat();
        this.inputTableService.deleteElement(this.tableKey, id);
    }

    onclickCancel(element: Element) {
        element.editing = false;
    }

    onclickDetailBtn(element: Element) {
        this.onclickDetail.emit(element);
    }

    onSearch($event: string, head: ElementProperty) {
        head.searchFn($event).subscribe((itemList: any[]) => {
            head.option = itemList;
        });
    }
}
