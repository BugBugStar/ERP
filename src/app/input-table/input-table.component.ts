import { Component, OnInit, Input } from '@angular/core';
import { InputTableService, ElementBase } from '../input-table.service';

const editingMark = '_editing';
class Element extends ElementBase {
    editing?: boolean;
    new?: boolean;
}

@Component({
    selector: 'app-input-table',
    templateUrl: './input-table.component.html',
    styleUrls: ['./input-table.component.css']
})
export class InputTableComponent implements OnInit {
    elementList: Element[];
    @Input() elementKeys: string[] = [];
    @Input() tableKey = '';

    constructor(private inputTableService: InputTableService) { }

    ngOnInit() {
        this.initElementList();
    }

    initElementList() {
        this.elementList = this.inputTableService.getElementList(this.tableKey);
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

    onclickEdit(id: number) {
        const elementIndex = this.elementList.findIndex(element => element.id === id);
        this.elementList[elementIndex].editing = true;
        for (const key of this.elementKeys) {
            this.elementList[elementIndex][key + editingMark] = this.elementList[elementIndex][key];
        }
    }

    onclickDelete(id: number) {
        const elementIndex = this.elementList.findIndex(element => element.id === id);
        this.elementList.splice(elementIndex, 1);
        this.elementList = this.elementList.concat();
        this.inputTableService.deleteElement(this.tableKey, id);
    }

    onclickCancel(id: number) {
        const elementIndex = this.elementList.findIndex(element => element.id === id);
        this.elementList[elementIndex].editing = false;
    }
}
