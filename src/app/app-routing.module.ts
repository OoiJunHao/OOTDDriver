import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'order-acceptance',
    loadChildren: () => import('./order-acceptance/order-acceptance.module').then( m => m.OrderAcceptancePageModule)
  },
  {
    path: 'order-acceptance-modal',
    loadChildren: () => import('./order-acceptance-modal/order-acceptance-modal.module').then( m => m.OrderAcceptanceModalPageModule)
  },
  {
    path: 'profile-management',
    loadChildren: () => import('./profile-management/profile-management.module').then( m => m.ProfileManagementPageModule)
  },
  {
    path: 'profile-modal',
    loadChildren: () => import('./profile-modal/profile-modal.module').then( m => m.ProfileModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
