import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserListComponent } from '../components/lists/user-list.component';
import { UsersService } from '../../../../../providers/services/setup/users.service';
import { SignupService } from '../../../../../providers/services/oauth';
import { MatDialog } from '@angular/material/dialog';
import { UserNewComponent } from '../components/form/user-new.component';
import { UserRolesAsingComponent } from '../components/form/user-roles-assign.component';
import { UserTreeComponent } from '../components/form/user-tree.component';
import { DirNodeUser, FlatDirNodeUser } from '../models/userTree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
    selector: 'app-users-container',
    standalone: true,
    imports: [UserListComponent],
    template: `
        <app-user-list
            class="w-full"
            [users]="users"
            (eventNew)="eventNew($event)"
            (eventAssign)="eventAssign($event)"
            (eventChangeState)="eventChangeState($event)"
            (eventChangeTree)="eventChangeTree($event)"
        ></app-user-list>
    `,
})
export class UsersContainerComponent implements OnInit {
    public error: string = '';
    public users: User[] = [];
    public user = new User();
    public userTree: any;

    constructor(
        private _userService: UsersService,
        private _signupService: SignupService,
        private _matDialog: MatDialog // private modalService: NgbModal,
    ) // private confirmDialogService: ConfirmDialogService
    {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this._userService.getAll$().subscribe(
            (response) => {
                this.users = response.data;
            },
            (error) => {
                this.error = error;
            }
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const userForm = this._matDialog.open(UserNewComponent);
            userForm.componentInstance.title = 'Nuevo Client' || null;
            userForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.saveUser(result);
                }
            });
        }
    }

    saveUser(data: Object) {
        this._signupService.add$(data).subscribe((response) => {
            this.users = (response && response.data) || [];
            this.getUsers();
        });
    }

    eventAssign($event: number) {
        if($event){
            const userForm = this._matDialog.open(UserRolesAsingComponent);
            userForm.componentInstance.title = 'Nuevo Client' || null;
            userForm.componentInstance.idUser = $event;
            userForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.saveUser(result);
                }
            });
        }
        // let userForm = this.modalService.open(UserRolesComponent, {size: 'lg'});
        // userForm.componentInstance.title = 'Asignar Client a Usuario' || null;
        // userForm.componentInstance.idUser = $event;
        // userForm.result.then((result) => {
        //   if (result) {
        //     // this.saveUser(result);
        //   }
        // });
    }

    public eventChangeState($event: number): void {
        this._userService.updateStateUserId$($event).subscribe((response) => {
            this.users = response.data;
        });
    }

    eventChangeTree($userEvent: User): void {
        this.openModalEditUserTree($userEvent)
    }

    async openModalEditUserTree(user: User): Promise<void> {
        this._userService.getUserTreeByUserId$(user.id).subscribe( ({ data }) => {
            this.createTreeView(data)
            console.log(this.userTree)
            const userForm = this._matDialog.open(UserTreeComponent);
            userForm.componentInstance.title = `
                Modificar jerarquia para el usuario: <b>${user.name||user.email}</b>
            `;
            userForm.componentInstance.userTree = this.userTree
            userForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    console.log("Guardar cambios")
                    // this.saveUser(result);
                }
            });
        })
        // const { data = null } = await this._hierarchyService.getById$(id).toPromise();
        // if (!data) return
        // let titleDialog = `Editar nodo: ${data.nombre}`
        // const rolForm = this._matDialog.open(TreeNewComponent);
        // rolForm.componentInstance.title = titleDialog;
        // rolForm.componentInstance.saveNode = data
        // const modalValue = await rolForm.afterClosed().toPromise();
        // if (modalValue) {
        //     this.editTreeNode(modalValue.id, modalValue);
        // }

    }

    createTreeView(treeValues: Array<FlatDirNodeUser|DirNodeUser>): void {
        this.userTree = this.createTree(treeValues);
        // Add 'last:true' to the last child
        this.userTree.treeControl.dataNodes.forEach((node: FlatDirNodeUser, index, nodes) =>
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
        this.userTree.treeControl.dataNodes.forEach(node => this.userTree.treeControl.expand(node));
    }

    createTree(data): { dataSource: any; treeControl: any }
    {
        // Create tree control and data source
        const treeControl = new FlatTreeControl<FlatDirNodeUser>(node => node.level, node => node.expandable);
        const dataSource = new MatTreeFlatDataSource(
            treeControl,
            new MatTreeFlattener(
                (node: DirNodeUser, level: number) => ({
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
