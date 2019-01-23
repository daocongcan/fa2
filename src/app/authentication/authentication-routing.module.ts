import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signout',
        component: SignoutComponent
      },
      { 
        path: '**',  
        redirectTo: '/404'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AuthenticationRoutingModule { }
