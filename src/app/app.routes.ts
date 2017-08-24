import { Routes } from '@angular/router';
import { DashboardComponent, NotFoundComponent } from './containers';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

