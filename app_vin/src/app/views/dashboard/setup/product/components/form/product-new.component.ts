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
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-clients-new',
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
            <div class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary">
                <div class="text-lg font-medium">{{ title }}</div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>


            <!-- Compose form -->
            <form class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto" [formGroup]="productForm">
                <mat-form-field>
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="nombre" />
                </mat-form-field>
                <mat-form-field>
                    <mat-select
                        [placeholder]="'Producto'"
                        formControlName="categoria">
                        @for (r of categories;track r.id; let idx = $index)
                        {
                            <mat-option [value]="r.id">{{r.nombre}}</mat-option>
                        }
                    </mat-select>
                    <mat-icon
                        class="icon-size-5"
                        matPrefix
                        [svgIcon]="'heroicons_outline:adjustments-vertical'"
                    ></mat-icon>

                </mat-form-field>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6">
                    <div class="flex space-x-2 items-center mt-4 sm:mt-0 ml-auto">
                        <button mat-stroked-button [color]="'warn'" (click)="cancelForm()">Cancelar</button>
                        <button mat-stroked-button [color]="'primary'" (click)="saveForm()">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
})
export class ProductNewComponent implements OnInit {
    @Input() title: string = '';
    @Input() categories: Category[] = [];
    abcForms: any;
    productForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        categoria: new FormControl(null, [Validators.required]),

    });

    constructor(private _matDialog: MatDialogRef<ProductNewComponent>) {}

    ngOnInit() {
        this.abcForms = abcForms;
    }

    public saveForm(): void {
        if (this.productForm.valid) {
            this._matDialog.close(this.productForm.value);
        }
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }
}
