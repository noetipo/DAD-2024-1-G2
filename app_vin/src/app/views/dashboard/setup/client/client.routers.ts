import { Routes } from '@angular/router';
import {ClientContainerComponent} from "./containers/client-container.component";
import {ClientComponent} from "./client.component";

export default [

  {
    path     : '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: ClientContainerComponent,
        data: {
          title: 'Clientes'
        }
      },
    ],
  },
] as Routes;
