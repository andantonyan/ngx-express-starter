import { Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent, LoginComponent } from './containers';
import { AuthGuard, NotAuthenticatedGuard } from './guards';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      showSidenav: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthenticatedGuard],
    data: {
      showSidenav: false
    }
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      showSidenav: false
    }
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

