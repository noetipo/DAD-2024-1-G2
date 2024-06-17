import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { abcForms } from '../../../../../environments/generals';
import { Component, OnInit } from '@angular/core';
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
export class ClientComponent implements OnInit {
    public title: string = '';
    abcForms: any;
    constructor() {}
    ngOnInit() {
        this.title = 'Cliente';
        this.abcForms = abcForms;
    }
}
