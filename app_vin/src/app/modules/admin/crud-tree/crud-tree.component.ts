import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HierarchyService } from 'app/providers/services/setup/hierarchy.service';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MailboxComposeComponent } from './compose/compose.component';




class FlatDirNode
{
    id: number;
    codigo: string;
    nombre: string;
    nivel: number;
    estado: number;
    Parent_gerarquia_id: number;
    expandable: boolean;
    level: number;
    last: boolean;
}

class DirNode
{
    id: number;
    codigo: string;
    nombre: string;
    nivel: number;
    estado: number;
    Parent_gerarquia_id: number;
    expandable?: boolean;
    level?: number;
    last?: boolean;
    children?: DirNode[];
}

@Component({
  selector: 'app-crud-tree',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatTableModule, MatIconModule, MatButtonModule, FuseAlertComponent, MatTreeModule, NgIf, RouterLink, MatCheckboxModule, MatSelectModule],
  templateUrl: './crud-tree.component.html',
  styleUrl: './crud-tree.component.scss',
  styles       : [
    `
        directory-structure .mat-tree {
            font-family: "IBM Plex Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        directory-structure .mat-tree-node {
            min-height: 32px;
        }

        directory-structure .mat-tree .mat-icon-button {
            width: 32px;
            height: 32px;
            min-height: 32px;
            line-height: 32px;
            margin-right: 8px;
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CrudTreeComponent {
    configForm: UntypedFormGroup;
    treeValues: any;
    tree: any;
    hierarchyValues: any;
    roles: any[];
    generalValues: any;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private hierarchyService: HierarchyService,
        private _matDialog: MatDialog,
    )
    {
        // tree
        this.treeValues = [];
        this.createTreeView();
        this.getHierarchy()
    }

    async getHierarchy(): Promise<void> {
        try {
            const resp = await this.hierarchyService.getAll$().toPromise();
            this.treeValues = resp.data;
            this.createTreeView();
        } catch (error) {
            console.error(error);
        }
    }

    createTreeView(): void {
        this.tree = this.createTree(this.treeValues);

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
        this.tree.treeControl.expand(this.tree.treeControl.dataNodes[0]);
    }
    ngOnInit(): void
    {
        // Build the config form
        this.configForm = this._formBuilder.group({
            title      : 'Eliminar nodo',
            message    : `
                ¿Estás seguro de que deseas eliminar este nodo permanentemente?
            `,
            icon       : this._formBuilder.group({
                show : true,
                name : 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            }),
            actions    : this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show : true,
                    label: 'Eliminar',
                    color: 'warn',
                }),
                cancel : this._formBuilder.group({
                    show : true,
                    label: 'Cancelar',
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * Has child
     *
     * @param _
     * @param node
     */
    hasChild(_: number, node: DirNode): boolean
    {
        return node.expandable;
    }

    /**
     * Create a new tree
     */
    createTree(data): { dataSource: any; treeControl: any }
    {
        // id: number,
        // codigo: string,
        // nombre: string;
        // nivel: number,
        // estado: number,
        // Parent_gerarquia_id?: number,


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
        console.log({
            treeControl,
            dataSource,
        })
        return {
            treeControl,
            dataSource,
        };
    }

    createNode(node: FlatDirNode | DirNode): void
    {
        console.log(node)
        // Open the dialog
        const dialogRef = this._matDialog.open(MailboxComposeComponent, {
            data     : {
                note: {
                    jauncho: "HOLA MUNDO"
                },
            },
        });
        dialogRef.afterClosed()
            .subscribe((result) =>
            {
                console.log(result);
                console.log('Compose dialog was closed!');
            });
    }

    openConfirmationDialog(node: FlatDirNode | DirNode): void
    {
        // Open the dialog delete node
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

        // Confirm delete node
        dialogRef.afterClosed().subscribe((result) =>
        {
            if (!"confirmed" == result) {
            }
            // this.deleteNode(node);
        });
    }
}
