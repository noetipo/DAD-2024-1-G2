import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {abcForms} from '../../../../../../../environments/generals';
import {Rol} from '../../models/Rol';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-roles-edit',
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
        <div class="text-lg font-medium" [innerHTML]="title"></div>
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
          <mat-label>ROL</mat-label>
          <input matInput formControlName="nombre"/>
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
export class RolesEditComponent implements OnInit {
  rolesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  @Input() title: string = '';
  @Input() rol = new Rol();
  abcForms: any;

  constructor(
      private formBuilder: FormBuilder,
      private _matDialog: MatDialogRef<RolesEditComponent>,
  ) {
  }

  ngOnInit() {
    this.abcForms = abcForms;

    if (this.rol) {
      this.rolesForm.patchValue({
        nombre: this.rol.nombre,

      });
    }
  }

  public saveForm(): void {
    if (this.rolesForm.valid) {
      this._matDialog.close(this.rolesForm.value);
    }
  }

  public cancelForm(): void {
    this._matDialog.close('');
  }
}
