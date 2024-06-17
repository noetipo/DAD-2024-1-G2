import { Routes } from '@angular/router';
import {RolesContainerComponent} from "./containers/roles-container.component";
import {RolesComponent} from "./roles.component";

export default [

  {
    path     : '',
    component: RolesComponent,
    children: [
      {
        path: '',
        component: RolesContainerComponent,
        data: {
          title: 'Roles'
        }
      },
    ],
  },
] as Routes;
