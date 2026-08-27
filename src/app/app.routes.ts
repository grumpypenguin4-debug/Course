import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './services/auth.guard';
import { permissionGuard } from './services/permission.guard';
import { Layout } from './componets/layout/layout';
import { PagePermissions } from './services/permissions.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./componets/login/login').then(m => m.Login)
  },

  {
    path: 'unauthorized',
    loadComponent: () => import('./componets/unauthorized/unauthorized').then(m => m.Unauthorized)
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        canActivate: [permissionGuard],
        data: { permission: PagePermissions.HOME },
        loadComponent: () => import('./componets/home/home').then(m => m.Home)
      },
      {
        path: 'profile',
        canActivate: [permissionGuard],
        data: { permission: PagePermissions.PROFILE },
        loadComponent: () => import('./componets/profile/profile').then(m => m.Profile)
      },
      {
        path: 'settings',
        canActivate: [permissionGuard],
        data: { permission: PagePermissions.SETTINGS },
        loadComponent: () => import('./componets/settings/settings').then(m => m.Settings)
      }
    ]
  }
];
