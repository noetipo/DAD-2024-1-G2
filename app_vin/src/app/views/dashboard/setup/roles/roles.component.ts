// import {Component, OnInit} from '@angular/core';
// import {abcForms} from "../../../../../environments/generals";
// @Component({
//   template: `
//     <div class="card shadow-gm-card m-1">
//       <h1 class="fa-3x icon-gm-float"><i class="{{abcForms.btnUser.icon}}"></i></h1>
//       <div class="card-body">
//         <router-outlet></router-outlet>
//       </div>
//     </div>
//   `,
// })
// export class ClientComponent implements OnInit {
//
//   public title: string = '';
//   abcForms:any;
//   constructor() {
//   }
//
//   ngOnInit() {
//     this.title = 'Roles';
//     this.abcForms = abcForms;
//   }
//
// }

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { abcForms } from '../../../../../environments/generals';
import { Component, OnInit } from '@angular/core';
import { RolesContainerComponent } from './containers/roles-container.component';

@Component({
    selector: 'app-setup',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
        <div class="card shadow-gm-card m-1 w-full flex-none">
            <h1 class="fa-3x icon-gm-float">
                <i class="{{ abcForms.btnUser.icon }}"></i>
            </h1>
            <div class="card-body">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    // styleUrl: './setup.component.scss'
})
export class RolesComponent implements OnInit {
    public title: string = '';
    abcForms: any;
    constructor() {}
    ngOnInit() {
        this.title = 'Roles';
        this.abcForms = abcForms;
    }
}
