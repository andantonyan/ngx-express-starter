import { Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent, LoginComponent } from './containers';
import { AuthGuard } from './guards/auth/auth.guard';

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

