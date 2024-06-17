import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastrModule} from "ngx-toastr";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
