import { RoleService } from '../../../../../providers/services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HierarchyService } from 'app/providers/services/setup/hierarchy.service';
import { DirNode, FlatDirNode } from '../models/Node';
import { TreeListComponent } from '../components/lists/tree-list.component';
import { TreeNewComponent } from '../components/form/tree-new.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ConfirmDialogService } from 'app/shared/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-tree-container',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule,ReactiveFormsModule, TreeListComponent],
    template: `
        @if (tree) {
            <app-tree-list
                class="w-full"
                [tree]="tree"
                (eventNew)="eventNew($event)"
                (eventEdit)="eventEdit($event)"
                (eventDelete)="eventDelete($event)"
            ></app-tree-list>
        }
    `,
})
export class TreeContainerComponent implements OnInit {
    public error: string = '';
    public nodes: Array<FlatDirNode|DirNode> = [];
    public tree: any;

    constructor(
        private _hierarchyService: HierarchyService,
        private _matDialog: MatDialog,
        private _confirmDialogService: ConfirmDialogService,
    ) //private confirmDialogService: ConfirmDialogService
    {}

    ngOnInit() {
        this.getTree();
    }

    async getTree(): Promise<void> {
        try {
            const resp = await this._hierarchyService.getAll$().toPromise();
            this.nodes = resp.data;
            this.createTreeView(this.nodes)
        } catch (error) {
            console.error(error);
        }
    }

    public eventNew({state, currentNode}: { state: boolean, currentNode?: FlatDirNode | DirNode }): void {
        if (!state) return
        this.openModalCreate(currentNode);
    }

    async openModalCreate(currentNode?: FlatDirNode | DirNode ): Promise<void> {
        let titleDialog = "Nuevo nodo base"
        const rolForm = this._matDialog.open(TreeNewComponent);
        if (currentNode) { // Create child node
            titleDialog = `Nuevo nodo para la jerarquia: ${currentNode.nombre}`;
            rolForm.componentInstance.parentNode = currentNode;
        }
        rolForm.componentInstance.title = titleDialog;
        rolForm.afterClosed().subscribe((result: any) => {
            if (result) {
                this.saveTreeNode(result);
            }
        });
    }
    
    saveTreeNode(data: FlatDirNode): void {
        this._hierarchyService.add$(data).subscribe((resp) => {
            this.nodes = (resp && resp.data) || [];
            this.createTreeView(this.nodes)
        });
    }

    eventEdit(id: number): void {
        this.openMOdalEdit(id);
    }

    async openMOdalEdit(id: number): Promise<void> {
        try {
            const { data = null } = await this._hierarchyService.getById$(id).toPromise();
            if (!data) return
            let titleDialog = `Editar nodo: ${data.nombre}`
            const rolForm = this._matDialog.open(TreeNewComponent);
            rolForm.componentInstance.title = titleDialog;
            rolForm.componentInstance.saveNode = data
            const modalValue = await rolForm.afterClosed().toPromise();
            if (modalValue) {
                this.editTreeNode(modalValue.id, modalValue);
            }
        } catch (error) {
            console.error(error);
        }
    }

    editTreeNode(id: number, data: FlatDirNode | DirNode ) {
        this._hierarchyService.update$(id, data).subscribe((resp) => {
            this.nodes = resp.data;
            this.createTreeView(this.nodes)
        });
    }

    public eventDelete(id: number) {
        this.deleteTreeNode(id)
    }

    async deleteTreeNode(id: number) : Promise<void> {
        try {
            await this._confirmDialogService.confirmDelete({});
            const { data } = await this._hierarchyService.delete$(id).toPromise();
            this.nodes = data;
            this.createTreeView(this.nodes)
        } catch (error) {
            console.error(error);
        } 
    }

    createTreeView(treeValues: Array<FlatDirNode|DirNode>): void {
        this.tree = this.createTree(treeValues);
        // Add 'last:true' to the last child
        this.tree.treeControl.dataNodes.forEach((node: FlatDirNode, index, nodes) =>
        {
            nodes[index].last = false;
            if ( nodes[index + 1] )
            {
                nodes[index].last = nodes[index + 1].level === node.level - 1;
            }
            else
            {
                nodes[index].last = true;
            }
        });
        // Expand the first item
        this.tree.treeControl.dataNodes.forEach(node => this.tree.treeControl.expand(node));
    }

    createTree(data): { dataSource: any; treeControl: any }
    {
        // Create tree control and data source
        const treeControl = new FlatTreeControl<FlatDirNode>(node => node.level, node => node.expandable);
        const dataSource = new MatTreeFlatDataSource(
            treeControl,
            new MatTreeFlattener(
                (node: DirNode, level: number) => ({
                    expandable: !!node.children && node.children.length > 0,
                    nombre      : node.nombre,
                    level       : level,
                    id          : node.id,
                    codigo      : node.codigo,
                    nivel       : node.nivel,
                    estado      : node.estado,
                    Parent_gerarquia_id   : node.Parent_gerarquia_id,
                }),
                node => node.level, node => node.expandable, node => node.children,
            ),
        );

        // Set the data
        dataSource.data = data;
        return {
            treeControl,
            dataSource,
        };
    }

}
