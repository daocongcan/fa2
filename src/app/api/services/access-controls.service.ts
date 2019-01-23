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

import { AccessControl } from '../models/access-control';
import { CreateAccessControl } from '../models/create-access-control';
import { UpdateAccessControl } from '../models/update-access-control';


@Injectable()
export class AccessControlsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Create Access Control
   * @param body - Created AccessControl object
   */
  createAccessControlResponse(body: CreateAccessControl): Observable<HttpResponse<AccessControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/accessControls`,
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
        let _body: AccessControl = null;
        _body = _resp.body as AccessControl
        return _resp.clone({body: _body}) as HttpResponse<AccessControl>;
      })
    );
  }

  /**
   * Create Access Control
   * @param body - Created AccessControl object
   */
  createAccessControl(body: CreateAccessControl): Observable<AccessControl> {
    return this.createAccessControlResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateAccessControlResponse(body?: UpdateAccessControl): Observable<HttpResponse<AccessControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/accessControls`,
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
        let _body: AccessControl = null;
        _body = _resp.body as AccessControl
        return _resp.clone({body: _body}) as HttpResponse<AccessControl>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateAccessControl(body?: UpdateAccessControl): Observable<AccessControl> {
    return this.updateAccessControlResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Access Control
   * @param accessControlId - ID of Access Control to return
   */
  getAccessControlByIdResponse(accessControlId: number): Observable<HttpResponse<AccessControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/accessControls/${accessControlId}`,
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
        let _body: AccessControl = null;
        _body = _resp.body as AccessControl
        return _resp.clone({body: _body}) as HttpResponse<AccessControl>;
      })
    );
  }

  /**
   * Returns a single Access Control
   * @param accessControlId - ID of Access Control to return
   */
  getAccessControlById(accessControlId: number): Observable<AccessControl> {
    return this.getAccessControlByIdResponse(accessControlId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a Access Control
   * @param accessControlId - access_control Id to delete
   */
  deleteAccessControlResponse(accessControlId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/accessControls/${accessControlId}`,
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
   * Deletes a Access Control
   * @param accessControlId - access_control Id to delete
   */
  deleteAccessControl(accessControlId: number): Observable<void> {
    return this.deleteAccessControlResponse(accessControlId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single AccessResource
   * @param roleId - ID of role to return
   */
  getAccessResourceByRoleIdResponse(roleId: number): Observable<HttpResponse<AccessControl[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/accessControls/role/${roleId}`,
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
        let _body: AccessControl[] = null;
        _body = _resp.body as AccessControl[]
        return _resp.clone({body: _body}) as HttpResponse<AccessControl[]>;
      })
    );
  }

  /**
   * Returns a single AccessResource
   * @param roleId - ID of role to return
   */
  getAccessResourceByRoleId(roleId: number): Observable<AccessControl[]> {
    return this.getAccessResourceByRoleIdResponse(roleId).pipe(
      map(_r => _r.body)
    );
  }}

export module AccessControlsService {
}
