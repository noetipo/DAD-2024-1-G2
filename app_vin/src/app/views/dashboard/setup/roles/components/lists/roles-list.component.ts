import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { abcForms } from '../../../../../../../environments/generals';
import { Rol } from '../../models/Rol';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../input/roles-input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-roles-list',
    imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule],
    standalone: true,
    template: `
        <div
            class="w-full mx-auto p-6 bg-white rounded overflow-hidden shadow-lg"
        >
            <!-- Encabezado principal -->
            <div
                class="flex justify-between items-center mb-2 bg-slate-300 text-black p-4 rounded"
            >
                <h2 class="text-2xl font-bold">
                    Lista de <span class="text-primary">Roles</span>
                </h2>
                <button mat-flat-button [color]="'primary'" (click)="goNew()">
                    <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                    <span class="ml-2">Nuevo Rol</span>
                </button>
            </div>

            <!-- Filtros -->
            <div class="bg-gray-100 rounded p-2 mb-2">
                <div class="sm:flex sm:space-x-4">
                    <!-- Filtro de NOMBRE -->
                    <div class="flex-1">
                        <div class="px-4 sm:px-6 py-2">
                            <div class="font-semibold text-lg mb-2">
                                Filtro de Nombre
                            </div>
                            <div class="mb-2">
                                <input
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                    id="nombre"
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Filtro de ESTADO -->
                    <div class="flex-1">
                        <div class="px-4 sm:px-6 py-2">
                            <div class="font-semibold text-lg mb-1">
                                Filtro de Estado
                            </div>
                            <div class="mb-2">
                                <select
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                    id="estado"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded overflow-hidden shadow-lg">
                <div class="p-2 overflow-scroll px-0">
                    <table class="w-full table-fixed">
                        <thead class="bg-primary-600 text-white">
                            <tr>
                                <th
                                    class="w-1/6 table-head text-center px-5 border-r"
                                >
                                    #
                                </th>
                                <th
                                    class="w-2/6 table-header text-center px-5 border-r"
                                >
                                    Nombre
                                </th>
                                <th
                                    class="w-1/6 table-header text-center border-r"
                                >
                                    Estado
                                </th>
                                <th class="w-2/6 table-header text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white"
                            *ngFor="let r of rols; let i = index"
                        >
                            <tr class="hover:bg-gray-100">
                                <td class="w-1/6 p-2 text-center border-b">
                                    {{ i }}
                                </td>
                                <td
                                    class="w-2/6 p-2  text-start border-b text-sm"
                                >
                                    {{ r.nombre }}
                                </td>
                                <td
                                    class="w-1/6 p-2 text-center border-b text-sm"
                                >
                                    <div
                                        class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
                                        style="opacity: 1"
                                    >
                                        <span class="">ACTIVO</span>
                                    </div>
                                </td>

                                <td
                                    class="w-2/6 p-2 text-center border-b text-sm"
                                >
                                    <div class="flex justify-center space-x-3">
                                        <mat-icon
                                            class="text-amber-400 hover:text-amber-500 cursor-pointer"
                                            (click)="goEdit(r.id)"
                                            >edit</mat-icon
                                        >

                                        <mat-icon
                                            class="text-rose-500 hover:text-rose-600 cursor-pointer"
                                            (click)="goDelete(r.id)"
                                            >delete_sweep</mat-icon
                                        >
                                    

                                        
                                        <!--                                        <mat-icon-->
                                        <!--                                            class="text-sky-400 hover:text-sky-600 cursor-pointer"-->
                                        <!--                                            (click)="openComposeDialog()"-->
                                        <!--                                            >swap_horiz-->
                                        <!--                                        </mat-icon>-->
                                        <mat-icon
                                            class="text-sky-400 hover:text-sky-600 cursor-pointer"
                                            (click)="goAssign(r.id)"
                                            >swap_horiz
                                        </mat-icon>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        class="px-5 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
                    >
                        <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0">
                            <button
                                class="text-sm text-primary-50 transition duration-150 hover:bg-primary-500 bg-primary-600 font-semibold py-2 px-4 rounded-l"
                            >
                                Prev
                            </button>
                            &nbsp; &nbsp;
                            <button
                                class="text-sm text-primary-50 transition duration-150 hover:bg-primary-500 bg-primary-600 font-semibold py-2 px-4 rounded-r"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class RolesListComponent implements OnInit {
    abcForms: any;
    @Input() rols: Rol[] = [];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<number>();
    @Output() eventDelete = new EventEmitter<number>();
    @Output() eventAssign = new EventEmitter<number>();

    constructor(private _matDialog: MatDialog) {}

    ngOnInit() {
        this.abcForms = abcForms;
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
