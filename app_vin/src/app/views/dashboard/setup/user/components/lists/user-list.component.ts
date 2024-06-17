import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { abcForms } from '../../../../../../../environments/generals';
import { User } from '../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        DatePipe,
    ],
    // imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule],
    template: `
        <div
            class="w-full mx-auto p-6 bg-white rounded overflow-hidden shadow-lg"
        >
            <!-- Encabezado principal -->
            <div
                class="flex justify-between items-center mb-2 bg-slate-300 text-black p-4 rounded"
            >
                <h2 class="text-2xl font-bold">
                    Lista de <span class="text-primary">Usuarios</span>
                </h2>
                <button mat-flat-button [color]="'primary'" (click)="goNew()">
                    <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                    <span class="ml-2">Nuevo Usuario</span>
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

                    <!-- Filtro de FECHA CREACIÓN -->
                    <div class="flex-1">
                        <div class="px-4 sm:px-6 py-2">
                            <div class="font-semibold text-lg mb-2">
                                Filtro de Fecha
                            </div>
                            <div class="mb-2">
                                <input
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                    id="fechaCreacion"
                                    type="date"
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

            <div class="table w-full p-2">
                <table class="w-full border">
                    <thead>
                        <tr class="bg-primary-600 text-white">
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
                            <th class="w-2/6 table-header text-center border-r">
                                Email
                            </th>
                            <th class="w-2/6 table-header text-center border-r">
                                Fecha Creación
                            </th>
                            <th class="w-1/6 table-header text-center border-r">
                                Estado
                            </th>
                            <th class="w-2/6 table-header text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        @for (user of users; track user.id; let idx = $index) {
                        <tr class="hover:bg-gray-100">
                            <td class="w-1/6 p-2 text-center border-b">
                                {{ idx + 1 }}
                            </td>
                            <td class="w-2/6 p-2 text-start border-b text-sm">
                                {{ user.name }}
                            </td>
                            <td class="w-2/6 p-2 text-start border-b text-sm">
                                {{ user.email }}
                            </td>
                            <td class="w-2/6 p-2 text-start border-b text-sm">
                                {{ user.created_at | date : 'dd/MM/yyyy' }}
                            </td>
                            <td class="w-1/6 p-2 text-center border-b text-sm">
                                <div class="w-max">
                                    <div
                                        class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-{{user.active===1?'green':'red'}}-500/20 text-{{user.active===1?'green':'red'}}-600 py-1 px-2 text-xs rounded-md"
                                        style="opacity: 1"
                                    >
                                        <span class="">{{user.active === 1? 'ACTIVO':'INACTIVO'}}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/6 p-2 text-center border-b text-sm">
                                <div class="flex justify-center space-x-3">
                                    <mat-slide-toggle
                                        [checked]="
                                            user.active == 1 ? true : false
                                        "
                                        [color]="'primary'"
                                        (change)="goChangeState(user.id)"
                                    ></mat-slide-toggle>
                                    <button (click)="goAssign(user.id)">
                                        <mat-icon>swap_horiz</mat-icon>
                                    </button>
                                    <button (click)="goChangeTree(user)">
                                        <mat-icon
                                            svgIcon="account_tree"
                                        ></mat-icon>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        } @empty {
                        <tr>
                            <td colspan="6" class="text-center">
                                Sin Contenido
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
                <div
                    class="px-5 py-2 bg-white border-t flex flex-col sm:flex-row items-center sm:justify-between"
                >
                    <span class="text-xs sm:text-sm text-gray-900">
                        Showing 1 to 4 of 50 Entries
                    </span>
                    <div class="inline-flex mt-2 sm:mt-0">
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
    `,
})
export class UserListComponent implements OnInit {
    abcForms: any;
    @Input() users: User[] = [];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<number>();
    @Output() eventAssign = new EventEmitter<number>();
    @Output() eventChangeState = new EventEmitter<number>();
    @Output() eventChangeTree = new EventEmitter<User>();
    activated: boolean = false;

    constructor() {}

    ngOnInit() {
        this.abcForms = abcForms;
    }

    public goNew() {
        this.eventNew.emit(true);
    }

    public goChangeState(id: number) {
        this.eventChangeState.emit(id);
    }

    public goChangeTree(user: User) {
        this.eventChangeTree.emit(user);
    }

    public goAssign(id: number) {
        this.eventAssign.emit(id);
    }
}
