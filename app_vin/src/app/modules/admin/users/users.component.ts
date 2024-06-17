import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgregarComponent } from './agregar/agregar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
    ],
})
export class UsersComponent {
    constructor(private _matDialog: MatDialog) {}

    autoSaver: boolean = false;

    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(AgregarComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!', result);
        });
    }

    /**
     * Constructor
     */
}
