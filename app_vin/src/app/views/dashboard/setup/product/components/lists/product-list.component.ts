import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import { abcForms } from '../../../../../../../environments/generals';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'app-products-list',
    imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
    standalone: true,
    template: `
        <div class="w-full mx-auto p-6 bg-white rounded overflow-hidden shadow-lg">
            <!-- Encabezado principal -->
            <div class="flex justify-between items-center mb-2 bg-slate-300 text-black p-4 rounded">
                <h2 class="text-2xl font-bold">
                    Lista de <span class="text-primary">Producto</span>
                </h2>
                <button mat-flat-button [color]="'primary'" (click)="goNew()">
                    <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                    <span class="ml-2">Nuevo Producto</span>
                </button>
            </div>
            <div class="bg-white rounded overflow-hidden shadow-lg">
                <div class="p-2 overflow-scroll px-0">
                    <table class="w-full table-fixed">
                        <thead class="bg-primary-600 text-white">
                            <tr>
                                <th class="w-1/6 table-head text-center px-5 border-r">#</th>
                                <th class="w-2/6 table-header text-center px-5 border-r">
                                    Nombre
                                </th>
                                <th class="w-2/6 table-header text-center px-5 border-r">
                                    Categoria
                                </th>
                            </tr>
                        </thead>

                        <tbody
                            class="bg-white"
                            *ngFor="let r of products; let i = index">
                            <tr class="hover:bg-gray-100">
                                <td class="w-1/6 p-2 text-center border-b">
                                    {{ i }}
                                </td>
                                <td class="w-2/6 p-2  text-start border-b text-sm">
                                    {{ r.nombre }}
                                </td>
                                <td class="w-2/6 p-2  text-start border-b text-sm">
                                    {{ r.categoria.nombre }}
                                </td>



                                <td class="w-2/6 p-2 text-center border-b text-sm">
                                    <div class="flex justify-center space-x-3">
                                        <mat-icon class="text-amber-400 hover:text-amber-500 cursor-pointer"
                                            (click)="goEdit(r.id)">edit</mat-icon>

                                        <mat-icon class="text-rose-500 hover:text-rose-600 cursor-pointer"
                                            (click)="goDelete(r.id)">delete_sweep</mat-icon>
                                       <!-- <mat-icon
                                            class="text-sky-400 hover:text-sky-600 cursor-pointer"
                                            (click)="goAssign(r.id)"
                                            >swap_horiz
                                        </mat-icon>-->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <hr>


            <form class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto" [formGroup]="productForm">
                <mat-form-field>
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="nombre" />
                </mat-form-field>
                <mat-form-field>
                    <mat-select
                        [placeholder]="'Producto'"
                        formControlName="categoria">
                        @for (r of productsCar;track r.id; let idx = $index)
                        {
                            <mat-option [value]="r.id">{{r.nombre}} {{r.categoria.nombre}} {{r.precio}}</mat-option>
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

                        <button mat-stroked-button [color]="'primary'" (click)="saveForm()">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>

            <div class="bg-white rounded overflow-hidden shadow-lg">
                <div class="p-2 overflow-scroll px-0">
                    <table class="w-full table-fixed">
                        <thead class="bg-primary-600 text-white">
                        <tr>
                            <th class="w-1/6 table-head text-center px-5 border-r">#</th>
                            <th class="w-2/6 table-header text-center px-5 border-r">
                                Nombre
                            </th>
                            <th class="w-2/6 table-header text-center px-5 border-r">
                                Categoria
                            </th>
                            <th class="w-2/6 table-header text-center px-5 border-r">
                                Precio
                            </th>
                            <th class="w-2/6 table-header text-center px-5 border-r">
                                Igv
                            </th>
                        </tr>
                        </thead>

                        <tbody
                            class="bg-white"
                            *ngFor="let r of productsCar; let i = index">
                        <tr class="hover:bg-gray-100">
                            <td class="w-1/6 p-2 text-center border-b">
                                {{ i }}
                            </td>
                            <td class="w-2/6 p-2  text-start border-b text-sm">
                                {{ r.nombre }}
                            </td>
                            <td class="w-2/6 p-2  text-start border-b text-sm">
                                {{ r.categoria.nombre }}
                            </td>
                            <td class="w-2/6 p-2  text-start border-b text-sm">
                                {{ r.precio }}
                            </td>
                            <td class="w-2/6 p-2  text-start border-b text-sm">
                                {{ r.igv }}
                            </td>



                            <td class="w-2/6 p-2 text-center border-b text-sm">
                                <div class="flex justify-center space-x-3">
                                    <mat-icon class="text-amber-400 hover:text-amber-500 cursor-pointer"
                                              (click)="goEdit(r.id)">edit</mat-icon>

                                    <mat-icon class="text-rose-500 hover:text-rose-600 cursor-pointer"
                                              (click)="goDelete(r.id)">delete_sweep</mat-icon>
                                    <!-- <mat-icon
                                         class="text-sky-400 hover:text-sky-600 cursor-pointer"
                                         (click)="goAssign(r.id)"
                                         >swap_horiz
                                     </mat-icon>-->
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    `,
})
export class ClientListComponent implements OnInit, OnChanges {
    abcForms: any;
    @Input() products: Product[] = [];

    public productsCar     :Product[]=[];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<number>();
    @Output() eventDelete = new EventEmitter<number>();
    @Output() eventAssign = new EventEmitter<number>();
    productForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        categoria: new FormControl(null, [Validators.required]),

    });
    constructor(private _matDialog: MatDialog) {}

    ngOnInit() {
        this.abcForms = abcForms;
        if (this.products){
            console.log(this.products);
        }
    }
ngOnChanges(changes: SimpleChanges) {
    if (this.products){
        console.log("this.products: list",this.products);
        this.products.forEach(data=>{
            data.precio=1000.0;
            data.igv=0.0;
            this.productsCar.push(data);
        });
        console.log("this.productsCar",this.productsCar)
    }
}
public saveForm():void{
        let product= new Product();
        product=this.productsCar.find(products=>products.id==this.productForm.value.categoria);
        product.igv=((product.precio)*1.18)-product.precio;

    this.productsCar.push(
        product
        );
}
    public goNew(): void {
        this.eventNew.emit(true);
    }

    public goEdit(id: number): void {
        this.eventEdit.emit(id);
    }

    public goDelete(id: number): void {
        this.eventDelete.emit(id);
    }

    public goAssign(id: number): void {
        this.eventAssign.emit(id);
    }
}
