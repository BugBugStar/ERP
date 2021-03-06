import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputTableService, ElementBase } from '../input-table.service';
import { Observable } from 'rxjs';

const editingMark = '_editing';
class Element extends ElementBase {
    editing?: boolean;
    new?: boolean;
}
export class ElementProperty {
    name: string;
    englishName?: string;
    chineseName?: string;
    option?: string[] | any[];
    searchFn?: (keyword: string, element: ElementBase) => Observable<{
        id: number,
        option: any,
    }[]>;
    filterKey?: string;
    onModelChange?: (value: any, element: ElementBase, elementList: ElementBase[]) => void;
    readonly?: boolean;
    disabled?: boolean;
    primaryKey?: boolean;
    getValue?: () => string; // when the element is primaryKey, it would get value from getValue()
    compareWith?: (o1: any, o2: any) => boolean;
    hidden?: boolean;
    isHidden?: () => boolean;
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
    @Input() tableKey: string | string[] = '';
    @Input() actions: Action[] = [];
    @Input() preview = false;
    @Output() onclickDetail = new EventEmitter<ElementBase>();
    @Output() onsave = new EventEmitter<{
        element: Element,
        elementList: Element[],
    }>();

    elementList: Element[];
    titleHeads: (string | {
        name: string | { chineseName: string, englishName: string },
        hidden: boolean,
        isHidden: () => boolean,
    })[];
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
                return {
                    name: elementKey.englishName || elementKey.chineseName ? {
                        englishName: elementKey.englishName ? elementKey.englishName : '',
                        chineseName: elementKey.chineseName ? elementKey.chineseName : '',
                    } : elementKey.name,
                    hidden: elementKey.hidden,
                    isHidden: elementKey.isHidden,
                };
            } else {
                return elementKey;
            }
        });
        this.elementKeys.forEach(elementKey => {
            if (typeof elementKey !== 'object') {
                return;
            }
            if (elementKey.searchFn) {
                this.onSearch('', elementKey, null);
            }
            if (elementKey.primaryKey && elementKey.getValue) {
                this.elementList.forEach(element => {
                    element[elementKey.name] = elementKey.getValue();
                });
            }
            elementKey.compareWith = (o1: any, o2: any) => {
                if (elementKey.option && elementKey.option.length > 0) {
                    if (typeof elementKey.option[0] === 'string') {
                        return o1 === o2;
                    } else {
                        return o1 && o2 && o1[elementKey.filterKey] === o2[elementKey.filterKey];
                    }
                }
                return false;
            };
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
                if (elementKey.name !== 'id') {
                    element[elementKey.name] = '';
                }
            }
        });
        return element;
    }

    onclickSave(id: number) {
        const elementIndex = this.elementList.findIndex(e => e.id === id);
        const element = this.elementList[elementIndex];
        delete element.editing;
        for (const key of Object.keys(element)) {
            if (key.includes(editingMark)) {
                const originKey = key.split(editingMark)[0];
                element[originKey] = element[key];
                delete element[key];
            }
        }

        if (element.new) {
            delete element.new;
            this.inputTableService.insertElement(this.tableKey, elementIndex, element);
        } else {
            this.inputTableService.modifyElement(this.tableKey, id, element);
        }
        this.onsave.emit({ element, elementList: this.elementList });
    }

    onclickEdit(element: Element) {
        element.editing = true;
        for (const property of this.elementKeys) {
            const key = typeof property === 'object' ? property.name : property;
            element[key + editingMark] = element[key];
            if (typeof property !== 'string') {
                if (property.searchFn) {
                    property.searchFn('', element);
                }
            }
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

    onSearch($event: string, head: ElementProperty, element: ElementBase) {
        if (!head.searchFn) {
            return;
        }
        head.searchFn($event, element).subscribe(itemList => {
            head.option = itemList;
        });
    }

    getOptionValue(item: any, filterKey: string | undefined): string {
        if (typeof item === 'string') {
            return item;
        }
        return filterKey ? (item.option ? item.option[filterKey] : item[filterKey]) : item.option;
    }

    onModelChange($event, head, data) {
        if (head.name) {
            data[head.name + '_editing'] = $event;
        } else {
            data[head + '_editing'] = $event;
        }
        if (head.onModelChange) {
            head.onModelChange($event, data, this.elementList);
        }
    }

    getDisplayValue(head, data) {
        return head.name ? (head.filterKey ? (data[head.name] ? data[head.name][head.filterKey] : '') : data[head.name]) : data[head];
    }

}
