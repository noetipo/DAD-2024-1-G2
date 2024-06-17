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

@Component({
    selector: 'app-user-tree',
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
                class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
            >
                <div class="text-lg font-medium" [innerHtml]="title"></div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>

            <!-- Compose form -->
            <div
                class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto"
                >
                hola mundo
            </div>
        </div>
    `,
})
export class UserTreeComponent implements OnInit {
    @Input() title: string = '';
    @Input() userTree: string = '';
    abcForms: any;
    rolesForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
    });

    constructor(private _matDialog: MatDialogRef<UserTreeComponent>) {}

    ngOnInit() {
        this.abcForms = abcForms;
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
