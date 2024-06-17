import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { abcForms } from '../../../../../../../environments/generals';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DirNode, FlatDirNode } from '../../models/Node';

@Component({
  selector: 'app-tree-new',
  standalone: true,
  imports: [FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule, MatFormFieldModule, MatInputModule],
  template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
      <!-- Header -->
      <div
          class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
      >
        <div class="text-lg font-medium">{{title}}</div>
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
          [formGroup]="rolesForm"
      >
        <mat-form-field>
          <mat-label>Nombre de la Jerarquia</mat-label>
          <input matInput formControlName="nombre"/>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Código</mat-label>
          <input matInput formControlName="codigo"/>
        </mat-form-field>

        <!-- Actions -->
        <div
            class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6"
        >
          <div class="flex space-x-2 items-center mt-4 sm:mt-0">
            <button
                class="ml-auto sm:ml-0"
                [color]="'warn'"
                mat-stroked-button
                (click)="cancelForm()"
            >
              Cancelar
            </button>
            <button
                class="ml-auto sm:ml-0"
                [color]="'primary'"
                mat-stroked-button
                (click)="saveForm()"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class TreeNewComponent implements OnInit {
  @Input() title: string = '';
  @Input() parentNode: FlatDirNode | DirNode = null
  @Input() saveNode: FlatDirNode | DirNode = {
    id: null,
    nombre: "",
    codigo: null,
    nivel: 1,
    estado: 1,
    Parent_gerarquia_id: null,
  };

  abcForms: any;
  rolesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  });

  constructor(
      private _matDialog: MatDialogRef<TreeNewComponent>,
  ) { }

  ngOnInit() {
    this.abcForms = abcForms;
    // Editing load values
    this.rolesForm.patchValue({
      nombre: this.saveNode.nombre,
      codigo: this.saveNode.codigo,
    });
  }

  public saveForm(): void {
    if (this.rolesForm.valid && this.saveNode.id) {
      let node = Object.assign({}, this.saveNode, this.rolesForm.value)
      this._matDialog.close(node);
    } else if (this.rolesForm.valid) {
      this.saveNode.Parent_gerarquia_id = this.parentNode?.id?? null
      this.saveNode.nivel = this.parentNode?.nivel?? 0
      this.saveNode.nivel += 1
      let node = Object.assign({}, this.saveNode, this.rolesForm.value)
      this._matDialog.close(node);
    }
  }
  public cancelForm(): void {
      this._matDialog.close('');
  }
}
