import { Acceso } from '../models/Acceso';
import { AccessService } from '../../../../../providers/services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccessListComponent } from '../components';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogService} from "../../../../../shared/confirm-dialog/confirm-dialog.service";
import { AccessNewComponent } from '../components/form/access-new.component';
import { AccessEditComponent } from '../components/form/access-edit.component';


@Component({
    selector: 'app-access-container',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AccessListComponent,
        AccessNewComponent,
        AccessEditComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
        <app-access-list
            class="w-full"
            [accesos]="accesos"
            (eventNew)="eventNew($event)"
            (eventEdit)="eventEdit($event)"
            (eventAssign)="eventAssign($event)"
            (eventDelete)="eventDelete($event)"
        ></app-access-list>
    `,
})
export class AccessContainerComponent implements OnInit {
    public error: string = '';
    public accesos: Array<Acceso> = [];
   
    public acceso = new Acceso();

    constructor(
        private _accessService: AccessService,

        
        private _confirmDialogService:ConfirmDialogService,
        private _matDialog: MatDialog //private confirmDialogService: ConfirmDialogService
    ) {}

    ngOnInit() {
        this.getAccess();
        
    }

    getAccess(): void {
        this._accessService.getAll$().subscribe(
            (response) => {
                this.accesos = response.data;
            },
            (error) => {
                this.error = error;
            }
        );
    }


    public eventNew($event: boolean): void {
        if ($event) {
            const rolForm = this._matDialog.open(AccessNewComponent);
            rolForm.componentInstance.title = 'Nuevo Acceso' || null;
            rolForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.saveRol(result);
                }
            });
        }
    }

    saveRol(data: Object): void {
        this._accessService.add$(data).subscribe((response) => {
            this.accesos = (response && response.data) || [];
        });
    }

    eventEdit(idRol: number): void {
        const listById = this._accessService
            .getById$(idRol)
            .subscribe(async (response) => {
                this.acceso = (response && response.data) || {};
                await this.openMOdalEdit(this.acceso);
                listById.unsubscribe();
            });
    }

    openMOdalEdit(data: Acceso) {
        if (data) {
            const rolForm = this._matDialog.open(AccessEditComponent);
            rolForm.componentInstance.title = 'Nuevo Acceso' || null;
            rolForm.componentInstance.acceso = data;
            rolForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.edit(data.id!, result);
                }
            });
        }
    }

    edit(id: number, data: Object) {
        this._accessService.update$(id, data).subscribe((response) => {
            this.accesos = (response && response.data) || [];
        });
    }

    eventAssign($event: number) {
        // const rolForm = this.modalService.open(RolesAssignComponent, {size: 'lg'});
        // rolForm.componentInstance.title = 'Asignar Acceso a Módulos' || null;
        // rolForm.componentInstance.idRol = $event;
        // rolForm.result.then((result: any) => {
        //   if (result) {// this.AsaRol(result);
        //   }
        // });
    }

    public eventDelete(id: number) {
        this._confirmDialogService.confirmDelete(
            {
                // title: 'Confirmación Personalizada',
                // message: `¿Quieres proceder con esta acción ${}?`,
            }
        ).then(() => {
            this._accessService.delete$(id).subscribe((response) => {
                this.accesos = (response && response.data) || [];
            });
        }).catch(() => {
        });

    }
}
