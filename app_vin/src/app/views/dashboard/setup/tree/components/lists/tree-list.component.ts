import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { abcForms } from '../../../../../../../environments/generals';
import { DirNode, FlatDirNode } from '../../models/Node';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-tree-list',
    imports: [CommonModule, RouterOutlet, MatMenuModule, MatButtonModule, MatIconModule, MatTreeModule],
    standalone: true,
    templateUrl: './tree-list.component.html',
    
})
export class TreeListComponent implements OnInit {
    abcForms: any;
    @Input() tree: any = {};
    @Output() eventNew = new EventEmitter<Object>();
    @Output() eventEdit = new EventEmitter<number>();
    @Output() eventDelete = new EventEmitter<number>();
    ngOnInit() {
        this.abcForms = abcForms;
    }

    hasChild(_: number, node: DirNode): boolean
    {
        return node.expandable;
    }

    public goNew(currentNode?: FlatDirNode | DirNode): void {
        this.eventNew.emit({
            state: true,
            currentNode: currentNode,
        });
    }

    public goEdit(id: number): void {
        this.eventEdit.emit(id);
    }

    public goDelete(id: number): void {
        this.eventDelete.emit(id);
    }
}
