import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoleService } from 'app/providers/services';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'selector-name',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        QuillEditorComponent,
    ],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div
                class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
            >
                <div class="text-lg font-medium">Nuevo Rol</div>
                <button mat-icon-button (click)="discard()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>

            <!-- Compose form -->
            <form
                class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto"
                [formGroup]="composeForm"
            >
                <mat-form-field>
                    <mat-label>ROL</mat-label>
                    <input matInput [formControlName]="'rol'" />
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
                            (click)="discard()"
                        >
                            Cancelar
                        </button>
                        <button
                            class="ml-auto sm:ml-0"
                            [color]="'primary'"
                            mat-stroked-button
                            (click)="send()"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
})
export class InputComponent implements OnInit {
    composeForm: UntypedFormGroup;

    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<InputComponent>,
        private _formBuilder: UntypedFormBuilder,
        private rolService: RoleService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.composeForm = this._formBuilder.group({
            rol: ['', [Validators.required]],
        });
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {
        this.matDialogRef.close();
    }

    /**
     * Send the message
     */
    send(): void {
        console.log('ROL value:', this.composeForm.get('rol').value);

        this.rolService.add$(this.composeForm.get('rol').value).subscribe(
            (response) => {
                // Handle success
                console.log('Success:', response);
            },
            (error) => {
                // Handle error
                console.error('Error:', error);

                // Log additional details if available
            }
        );

        // Close the dialog
        this.matDialogRef.close();
    }
}
