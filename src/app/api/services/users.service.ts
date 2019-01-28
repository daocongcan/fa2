/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { User } from '../models/user';
import { CreateUser } from '../models/create-user';
import { ChangePasswordUser } from '../models/change-password-user';


@Injectable()
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Users
   */
  listUsersResponse(): Observable<HttpResponse<User[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `user/getall`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User[] = null;
        _body = _resp.body as User[]
        return _resp.clone({body: _body}) as HttpResponse<User[]>;
      })
    );
  }

  /**
   * get list of Users
   */
  listUsers(): Observable<User[]> {
    return this.listUsersResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create User
   * @param body - Created User object
   */
  createUserResponse(body?: User): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    console.log(__body);
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `user/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * Create User
   * @param body - Created User object
   */
  createUser(body?: User): Observable<User> {
    return this.createUserResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single User
   * @param userId - ID of User to return
   */
  getUserByIdResponse(userId: number): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users/${userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * Returns a single User
   * @param userId - ID of User to return
   */
  getUserById(userId: number): Observable<User> {
    return this.getUserByIdResponse(userId).pipe(
      map(_r => _r.body)
    );
  }

  getUserByCompanyResponse(idComapny: string): Observable<HttpResponse<User[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `user/getbycompany/${idComapny}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User[] = null;
        _body = _resp.body as User[]
        return _resp.clone({body: _body}) as HttpResponse<User[]>;
      })
    );
  }

  /**
   * Returns a single User
   * @param userId - ID of User to return
   */
  getUserByCompany(idComapny: string): Observable<User[]> {
    return this.getUserByCompanyResponse(idComapny).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a User
   * @param userId - user Id to delete
   */
  deleteUserResponse(userId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `user/delete/${userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * Delete a User
   * @param userId - user Id to delete
   */
  deleteUser(userId: number): Observable<void> {
    return this.deleteUserResponse(userId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param userId - ID of user that needs to be user
   * @param body - update
   */
  updateUserResponse(body: User): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `user/update/${body._id}`, 
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * @param userId - ID of user that needs to be user
   * @param body - update
   */
  updateUser(body: User): Observable<User> {
    return this.updateUserResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * change password of User
   * @param userId - ID of user that needs to be user
   * @param body - Change Password
   */
  changePasswordOfUserResponse(params: UsersService.ChangePasswordOfUserParams): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/users/${params.userId}/changepassword`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * change password of User
   * @param userId - ID of user that needs to be user
   * @param body - Change Password
   */
  changePasswordOfUser(params: UsersService.ChangePasswordOfUserParams): Observable<User> {
    return this.changePasswordOfUserResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module UsersService {
  export interface UpdateUserParams {
    userId: number;
    body: CreateUser;
  }
  export interface ChangePasswordOfUserParams {
    userId: number;
    body: ChangePasswordUser;
  }
}
