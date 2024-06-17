import { Routes } from '@angular/router';
import {UsersContainerComponent} from "./containers/users-containers-component";
import {UsersComponent} from "./users.component";

export default [

    {
        path     : '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: UsersContainerComponent,
                data: {
                    title: 'Users'
                }
            },
        ],
    },
] as Routes;
