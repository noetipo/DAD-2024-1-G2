import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

export default [
    {
        path     : '',
        component: DashboardComponent,
        children: [
            {path: 'setup', loadChildren: () => import('app/views/dashboard/setup/setup.routers')},

        ],
    },
] as Routes;
