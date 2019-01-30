import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/node',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
  ,
  declarations: []
})
export class AppRoutingModule { }
