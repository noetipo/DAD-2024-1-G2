import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { abcForms } from '../../../../../../../environments/generals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AccessService } from 'app/providers/services';
import { Acceso } from '../../models/Acceso';

@Component({
    selector: 'app-access-new',
    standalone: true,
    imports: [
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
    ],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div
                class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
            >
                <div class="text-lg font-medium">{{ title }}</div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>

            <!-- Compose form -->
            <form
                class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto"
                [formGroup]="accessForm"
            >
                <mat-form-field>
                    <mat-label>Nombre del acceso</mat-label>
                    <input matInput formControlName="nombre" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Icono</mat-label>
                    <input matInput formControlName="icono" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>orden</mat-label>
                    <input matInput formControlName="orden" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>nivel</mat-label>
                    <input matInput formControlName="nivel" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Url</mat-label>
                    <input matInput formControlName="url" />
                </mat-form-field>
                <mat-form-field>
                <mat-select
                        [placeholder]="'Padre Acceso'"
                        formControlName="Parent_acceso_id">
                       @for (r of accesosParent;track r.id; let idx = $index)
                            {
                                <mat-option value="{{r.id}}">{{r.nombre}}</mat-option>
                            }
                    </mat-select>
                    <mat-icon
                        class="icon-size-5"
                        matPrefix
                        [svgIcon]="'heroicons_outline:adjustments-vertical'"
                    ></mat-icon>
                    
                </mat-form-field>

                <mat-form-field class="flex-auto gt-xs:pr-3">
                    <mat-select
                        [placeholder]="'Estado'"
                        formControlName="estado">
                        <mat-option value="1">Activo</mat-option>
                        <mat-option value="0">Inactivo</mat-option>
                    </mat-select>
                    <mat-icon
                        class="icon-size-5"
                        matPrefix
                        [svgIcon]="'heroicons_outline:adjustments-vertical'"
                    ></mat-icon>
                </mat-form-field>

                <mat-form-field class="flex-auto gt-xs:pr-3">
                    <mat-select [placeholder]="'Tipo'" formControlName="tipo">
                        <mat-option value="basic">Unico</mat-option>
                        <mat-option value="aside"> Aside</mat-option>
                        <mat-option value="collapsable">Colapsable</mat-option>
                        <mat-option value="group">Grupo</mat-option>
                    </mat-select>
                    <mat-icon
                        class="icon-size-5"
                        matPrefix
                        [svgIcon]="'heroicons_outline:adjustments-horizontal'"
                    ></mat-icon>
                </mat-form-field>
                <!-- Actions -->
                <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6"
                >
                    <div class="flex space-x-2 items-center mt-4 sm:mt-0">
                        <button
                            class="border border-primary bg-primary text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-primary-800 focus:outline-none focus:shadow-outline"
                            mat-stroked-button
                            (click)="saveForm()"
                        >
                            Guardar
                        </button>
                        <button
                            class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline"
                            mat-stroked-button
                            (click)="cancelForm()"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
})
export class AccessNewComponent implements OnInit {
    @Input() title: string = '';
    public accesosParent: Array<Acceso> = [];
    abcForms: any;
    accessForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        tipo: new FormControl('', [Validators.required]),
        icono: new FormControl('', [Validators.required]),
        estado: new FormControl(null, [Validators.required]),
        orden: new FormControl(null, [Validators.required]),
        nivel: new FormControl(null, [Validators.required]),
        url: new FormControl('', [Validators.required]),
        Parent_acceso_id: new FormControl(null, [Validators.required]),
    });

    constructor(private _matDialog: MatDialogRef<AccessNewComponent>,
        private _accessService: AccessService) {}

    ngOnInit() {
        this.abcForms = abcForms;
        this.getParent();

    }
    

    public saveForm(): void {
        if (this.accessForm.valid) {
            this._matDialog.close(this.accessForm.value);
        }
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }
    getParent():void{
        this._accessService.getParent$().subscribe(
            (response) => {
                this.accesosParent = response.data;
                console.log(this.accesosParent)
            }
            // (error) => {
            //     this.error = error;
            // }
        );

    }
}
