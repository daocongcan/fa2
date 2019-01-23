import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../api/services/auth.service';
import 'rxjs/add/operator/do';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthenticationService {

  constructor(private api: AuthService, private http: HttpClient) { }

  login(name_user: string, password: string) {
    return this.api.login({ name_user, password })
      .do(resp => this.setSession(resp, name_user));
  }

  private setSession(authResponse, name_user) {
    // localStorage.setItem('token', authResponse.token);
    sessionStorage.setItem('user', JSON.stringify(authResponse));
    sessionStorage.setItem('name_user', name_user);
  }

  logout() {
    // localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
