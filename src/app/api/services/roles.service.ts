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

import { Role } from '../models/role';
import { CreateRole } from '../models/create-role';
import { UpdateRole } from '../models/update-role';


@Injectable()
export class RolesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of roles
   */
  listRolesResponse(): Observable<HttpResponse<Role[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `role/getall`,
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
        let _body: Role[] = null;
        _body = _resp.body as Role[]
        return _resp.clone({body: _body}) as HttpResponse<Role[]>;
      })
    );
  }

  /**
   * get list of roles
   */
  listRoles(): Observable<Role[]> {
    return this.listRolesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Role
   * @param body - Created role object
   */
  createRoleResponse(body: CreateRole): Observable<HttpResponse<Role>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `role/create`,
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
        let _body: Role = null;
        _body = _resp.body as Role
        return _resp.clone({body: _body}) as HttpResponse<Role>;
      })
    );
  }

  /**
   * Create Role
   * @param body - Created role object
   */
  createRole(body: CreateRole): Observable<Role> {
    return this.createRoleResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateRoleResponse(body?: UpdateRole): Observable<HttpResponse<Role>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `role/update/${body._id}`,
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
        let _body: Role = null;
        _body = _resp.body as Role
        return _resp.clone({body: _body}) as HttpResponse<Role>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateRole(body?: UpdateRole): Observable<Role> {
    return this.updateRoleResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single role
   * @param roleId - ID of role to return
   */
  getRoleByIdResponse(roleId: number): Observable<HttpResponse<Role>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/roles/${roleId}`,
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
        let _body: Role = null;
        _body = _resp.body as Role
        return _resp.clone({body: _body}) as HttpResponse<Role>;
      })
    );
  }

  /**
   * Returns a single role
   * @param roleId - ID of role to return
   */
  getRoleById(roleId: number): Observable<Role> {
    return this.getRoleByIdResponse(roleId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a role
   * @param roleId - role id to delete
   */
  deleteRoleResponse(roleId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `role/delete/${roleId}`,
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
   * Deletes a role
   * @param roleId - role id to delete
   */
  deleteRole(roleId: number): Observable<void> {
    return this.deleteRoleResponse(roleId).pipe(
      map(_r => _r.body)
    );
  }}

export module RolesService {
}
