import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './agregar/agregar.component';

@Component({
    selector: 'app-role',
    standalone: true,
    templateUrl: './role.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [MatIconModule, MatButtonModule],
})
export class RoleComponent {
    constructor(private _matDialog: MatDialog) {}
    autoSaver: boolean = false;

    /**
     * Constructor
     */

    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(AgregarComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!', result);
        });
    }
}
