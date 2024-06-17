import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { abcForms } from '../../../../../../../environments/generals';
import { Acceso } from '../../models/Acceso';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//import { InputComponent } from '../input/roles-input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-access-list',
    imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule],
    standalone: true,
    template: `
        <div
        class="w-full mx-auto p-6 bg-white rounded overflow-hidden shadow-lg"
        >
        <div
                class="flex justify-between items-center mb-2 bg-slate-300 text-black p-4 rounded"
            >
                <h2 class="text-2xl font-bold">
                    Lista de <span class="text-primary">Accesos</span>
                </h2>
                <button
                        mat-flat-button
                        [color]="'primary'"
                        class="ml-4"
                        (click)="goNew()"
                    >
                        <mat-icon
                            [svgIcon]="'heroicons_outline:plus'"
                        ></mat-icon>
                        <span class="ml-2">Nuevo Acceso</span>
                    </button>
            </div>
            <div class="flex flex-col flex-auto min-w-0">
                

                <div class="flex-auto  ">
                    <div class=" overflow-scroll">
                        <table
                            class="w-full border"
                        >
                            <thead>
                                <tr class="bg-primary-600 text-white">
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-gray-800 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            #
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            NOMBRE
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            TIPO
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            ICONO
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            ORDEN
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            NIVEL
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            URL
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            ESTADO
                                        </p>
                                    </th>
                                    <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            ACCIONES
                                        </p>
                                    </th>
                                    <!-- <th
                                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <p
                                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            Pariente
                                        </p>
                                    </th> -->
                                </tr>
                            </thead>
                            <tbody class="mb-10 bgw">
                        @for (r of accesos;track r.id; let idx = $index) {
                        <tr>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{ idx + 1 }}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{ r.nombre }}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{r.tipo}}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                <mat-icon
                        class="icon-size-5"
                        matPrefix
                        [svgIcon]="r.icono"
                    ></mat-icon>
                                    
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{r.orden}}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{r.nivel}}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{r.url}}
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                            <div class="w-max">
                                    <div
                                        class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-{{r.estado ?'green':'red'}}-500/20 text-{{r.estado?'green':'red'}}-600 py-1 px-2 text-xs rounded-md"
                                        style="opacity: 1"
                                    >
                                        <span class="">{{r.estado? 'ACTIVO':'INACTIVO'}}</span>
                                    </div>
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
                                    </div>
                                </td>
                            
                        </tr>
                        } @empty {
                        <tr>
                            Sin Contenido
                        </tr>
                        }
                    </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class AccessListComponent implements OnInit {
    abcForms: any;
    @Input() accesos: Acceso[] = [];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<number>();
    @Output() eventDelete = new EventEmitter<number>();
    @Output() eventAssign = new EventEmitter<number>();

    constructor(private _matDialog: MatDialog) {}

    // openComposeDialog(): void {
    //     // Open the dialog
    //     const dialogRef = this._matDialog.open(InputComponent);
    //
    //     dialogRef.afterClosed().subscribe((result) => {
    //         console.log('Compose dialog was closed!', result, 'hello');
    //         this.eventAssign.emit(result);
    //     });
    // }

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
