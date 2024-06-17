import { Routes } from '@angular/router';
import { AccessComponent } from './access.component';
import { AccessContainerComponent } from './containers/access-container.component';

export default [

  {
    path     : '',
    component: AccessComponent,
    children: [
      {
        path: '',
        component: AccessContainerComponent,
        data: {
          title: 'Roles'
        }
      },
    ],
  },
] as Routes;
