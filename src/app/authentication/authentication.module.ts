import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { SignoutComponent } from './signout/signout.component';
import { AuthService } from '../api/services/auth.service';
import { ApiConfiguration } from '../api/api-configuration';
import { FormsModule } from '@angular/forms';
// import { AuthenticationInterceptor } from './authentication-interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import {
//   SidebarComponent,
//   AppHeaderComponent,
//   AppFooterComponent
// } from '../components';

// const APP_COMPONENTS = [
//   SidebarComponent,
//   AppHeaderComponent,
//   AppFooterComponent
// ];


@NgModule({
  imports: [
    // ...APP_COMPONENTS,
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    AuthService,
    ApiConfiguration,
    // AuthenticationInterceptor,
    // { provide: 
    //   HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  declarations: [SigninComponent, SignoutComponent]
})
export class AuthenticationModule { }
