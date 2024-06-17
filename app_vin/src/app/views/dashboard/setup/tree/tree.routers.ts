import { Routes } from '@angular/router';
import { TreeContainerComponent } from "./containers/tree-container.component";
import { TreeComponent } from "./tree.component";

export default [

  {
    path     : '',
    component: TreeComponent,
    children: [
      {
        path: '',
        component: TreeContainerComponent,
        data: {
          title: 'Tree'
        }
      },
    ],
  },
] as Routes;
