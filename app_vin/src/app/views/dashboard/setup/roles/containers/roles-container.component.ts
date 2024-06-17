import { Rol } from '../models/Rol';
import { RoleService } from '../../../../../providers/services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RolesAssignComponent, RolesListComponent } from '../components';
import { MatDialog } from '@angular/material/dialog';
import { RolesNewComponent } from '../components/form/roles-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesEditComponent } from '../components/form/roles-edit.component';
import {ConfirmDialogService} from "../../../../../shared/confirm-dialog/confirm-dialog.service";

@Component({
    selector: 'app-roles-container',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RolesListComponent,
        RolesNewComponent,
        RolesEditComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
        <app-roles-list
            class="w-full"
            [rols]="rols"
            (eventNew)="eventNew($event)"
            (eventEdit)="eventEdit($event)"
            (eventAssign)="eventAssign($event)"
            (eventDelete)="eventDelete($event)"
        ></app-roles-list>
    `,
})
export class RolesContainerComponent implements OnInit {
    public error: string = '';
    public rols: Rol[] = [];
    public rol = new Rol();

    constructor(
        private _rolService: RoleService,
        private _confirmDialogService:ConfirmDialogService,
        private _matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this.getRols();
    }

    getRols(): void {
        this._rolService.getAll$().subscribe(
            (response) => {
                this.rols = response.data;
            },
            (error) => {
                this.error = error;
            }
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const rolForm = this._matDialog.open(RolesNewComponent);
            rolForm.componentInstance.title = 'Nuevo Client' || null;
            rolForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.saveRol(result);
                }
            });
        }
    }

    saveRol(data: Object): void {
        this._rolService.add$(data).subscribe((response) => {
            this.rols = (response && response.data) || [];
        });
    }

    eventEdit(idRol: number): void {
        const listById = this._rolService
            .getById$(idRol)
            .subscribe(async (response) => {
                this.rol = (response && response.data) || {};
                await this.openMOdalEdit(this.rol);
                listById.unsubscribe();
            });
    }

    openMOdalEdit(data: Rol) {
        if (data) {
            const rolForm = this._matDialog.open(RolesEditComponent);
            rolForm.componentInstance.title =`Editar <b>${data.nombre||data.id} </b>`;
            rolForm.componentInstance.rol = data;
            rolForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.editRol(data.id!, result);
                }
            });
        }
    }

    editRol(idRol: number, data: Object) {
        this._rolService.update$(idRol, data).subscribe((response) => {
            this.rols = (response && response.data) || [];
        });
    }

    eventAssign($event: number) {
        if ($event) {
            const rolForm = this._matDialog.open(RolesAssignComponent);
            rolForm.componentInstance.title =`Asignar Acceso a Módulos <b>${$event} </b>`;
            rolForm.componentInstance.idRol = $event;
            rolForm.afterClosed().subscribe((result: any) => {
                if (result) {

                }
            });
        }
        // const rolForm = this.modalService.open(RolesAssignComponent, {size: 'lg'});
        // rolForm.componentInstance.title = 'Asignar Acceso a Módulos' || null;
        // rolForm.componentInstance.idRol = $event;
        // rolForm.result.then((result: any) => {
        //   if (result) {// this.AsaRol(result);
        //   }
        // });
    }

    public eventDelete(idRol: number) {
        this._confirmDialogService.confirmDelete(
            {
                // title: 'Confirmación Personalizada',
                // message: `¿Quieres proceder con esta acción ${}?`,
            }
        ).then(() => {
            this._rolService.delete$(idRol).subscribe((response) => {
                this.rols = (response && response.data) || [];
            });
        }).catch(() => {
        });

    }
}
