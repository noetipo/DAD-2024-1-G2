import { Component, Input, OnInit } from '@angular/core';
import { abcForms } from '../../../../../../../environments/generals';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolAssigned } from '../../models/rolAssigned';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleService } from '../../../../../../providers/services';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'app/shared/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-user-roles-assign',
    standalone: true,
    imports: [
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div
                class="flex items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
            >
                <div class="text-lg font-medium">Nuevo Usuario</div>
                <button mat-icon-button (click)="cancelForm()">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>

            <!-- Body -->
            <div class="flex justify-center my-4">
                <ul
                    class="w-1/3  text-base font-medium bg-white border border-gray-200 rounded-lg "
                >
                    @for (item of rolAssigneds; track item.id; let idx = $index)
                    {

                    <li class="w-full border-b">
                        <div class="flex items-center ps-3">
                            <input
                                type="checkbox"
                                [(ngModel)]="item.asignado"
                                id="men{{ idx }}"
                                class="w-5 h-5"
                            />
                            <label
                                for="men{{ idx }}"
                                class="w-full py-3 ms-2"
                                >{{ item.nombre }}</label
                            >
                        </div>
                    </li>
                    }
                </ul>
            </div>

            <!-- Body -->
            <!-- <div class="flex flex-row space-x-2 m-4">
                @for (item of rolAssigneds; track item.id; let idx = $index) {
                <div
                    class="flex items-start  text-sm text-gray-900 bg-white mx-4"
                >
                    <label class="flex items-start">
                        <input
                            type="checkbox"
                            [(ngModel)]="item.asignado"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-gray-100 focus:ring-2"
                            id="men{{ idx }}"
                        />
                        <label for="men{{ idx }}" lass="ml-3 cursor-pointer">{{
                            item.nombre
                        }}</label>
                        <br />
                    </label>
                </div>
                }
            </div> -->

            <!-- footer -->

            <div
                class="flex flex-col sm:flex-row sm:items-center justify-between m-6"
            >
                <div class="flex space-x-4 items-center mt-4 sm:mt-0">
                    <button
                        [color]="'warn'"
                        mat-stroked-button
                        (click)="cancelForm()"
                    >
                        Cancelar
                    </button>
                    <button
                        [color]="'primary'"
                        mat-stroked-button
                        (click)="saveAssign()"
                    >
                        Guardar
                    </button>
                </div>
            </div>

            <!-- <div class="modal-header">
     <h6 class="modal-title">{{title}}</h6>
     <button type="button" class="close" aria-label="Close" (click)="cancelForm()">
       <span aria-hidden="true">&times;</span>
     </button>
   </div>
   <div class="modal-body">
     <div class="row">
       <div class="col-md-12">
         <div class="list-group">
           <a class="list-group-item" *ngFor="let m of rolAssigneds; let i = index">
             <div class="custom-control custom-checkbox d-flex align-items-center">
               <input type="checkbox" class="custom-control-input" id="men{{i}}"
                      [(ngModel)]="m.asignado">
               <label class="custom-control-label todo-label badge-gm" for="men{{i}}">
                 <span class="badge badge-pill text-bg-{{ m.asignado ? 'success': 'danger' }} float-right text-white">
                     {{m.nombre}}
                 </span>
               </label>
             </div>
           </a>
         </div>
       </div>
     </div>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
       <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
     </button>
     <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveAssign()">
       <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
     </button>
   </div>
  </div> -->
        </div>
    `,
})
export class UserRolesAsingComponent implements OnInit {
    @Input() title: string = '';
    @Input() idUser: number = 0;
    abcForms: any;
    rolAssigneds: RolAssigned[] = [];
    rolesIds: number[] = [];
    private subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private _rolService: RoleService,
        private _matDialog: MatDialogRef<UserRolesAsingComponent>,
        private _confirmDialogService: ConfirmDialogService
    ) {}

    ngOnInit() {
        this.abcForms = abcForms;
        this.getListRoles(this.idUser);
    }
    ngOnDestroy() {
        // Asegúrate de desuscribirte para evitar fugas de memoria
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getListRoles(idUser: number) {
        const params: any = { usuario_id: idUser };
        this.subscription = this._rolService
            .getByAssigmentRoleById$(params)
            .subscribe(
                (response) => {
                    this.rolAssigneds = (response && response.data) || [];
                },
                (error) => {
                    console.error('Error al obtener los roles:', error);
                    // Manejar el error adecuadamente
                }
            );
    }

    public saveAssign(): void {
        this.rolAssigneds.map((data) => {
            if (data.asignado) {
                this.rolesIds.push(data.id!);
                console.log(this.rolesIds);
            }
        });
        this._confirmDialogService
            .confirmSave()
            .then(() => {
                const params: any = {};
                params.usuario_id = this.idUser;
                params.roles = this.rolesIds;
                this._rolService
                    .getByAssigmentRole$(params)
                    .subscribe((response) => {
                        this._matDialog.close('');
                    });
            })
            .catch(() => {});
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }
}
