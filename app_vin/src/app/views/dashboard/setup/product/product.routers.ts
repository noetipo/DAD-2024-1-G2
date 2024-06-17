import { Routes } from '@angular/router';
import {ProductContainerComponent} from "./containers/product-container.component";
import {ProductComponent} from "./product.component";

export default [

  {
    path     : '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductContainerComponent,
        data: {
          title: 'Clientes'
        }
      },
    ],
  },
] as Routes;
