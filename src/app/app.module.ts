import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// import { AuthenticationInterceptor } from './authentication/authentication-interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthenticationModule } from './authentication/authentication.module';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './views/dashboard/dashboard-routing.module';

import { AuthGuard } from './guards/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import {
  SidebarComponent,
  AppHeaderComponent,
  AppFooterComponent
} from './components';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AuthenticationService } from './authentication/authentication.service';
import { ApiConfiguration } from './api/api-configuration';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Locale } from './locale';
import {SelectModule} from 'ng2-select';

// import { BsDatepickerModule,DatepickerModule } from 'ngx-bootstrap/datepicker';

const APP_COMPONENTS = [
  SidebarComponent,
  AppHeaderComponent,
  AppFooterComponent,
  
];

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AuthenticationRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    DashboardModule,
    DashboardRoutingModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    ModalModule.forRoot(),
    SelectModule,
    // BsDatepickerModule.forRoot(),
    // DatepickerModule.forRoot(),
    
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthGuard,ApiConfiguration,Locale],
  bootstrap: [AppComponent]
})
export class AppModule { }


