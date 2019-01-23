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

import { AccessResource } from '../models/access-resource';
import { CreateAccessResource } from '../models/create-access-resource';
import { UpdateAccessResource } from '../models/update-access-resource';


@Injectable()
export class AccessResourcesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of AccessResources
   */
  listAccessResourcesResponse(): Observable<HttpResponse<AccessResource[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/accessResources`,
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
        let _body: AccessResource[] = null;
        _body = _resp.body as AccessResource[]
        return _resp.clone({body: _body}) as HttpResponse<AccessResource[]>;
      })
    );
  }

  /**
   * get list of AccessResources
   */
  listAccessResources(): Observable<AccessResource[]> {
    return this.listAccessResourcesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create AccessResource
   * @param body - Created access resource object
   */
  createAccessResourceResponse(body: CreateAccessResource): Observable<HttpResponse<AccessResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/accessResources`,
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
        let _body: AccessResource = null;
        _body = _resp.body as AccessResource
        return _resp.clone({body: _body}) as HttpResponse<AccessResource>;
      })
    );
  }

  /**
   * Create AccessResource
   * @param body - Created access resource object
   */
  createAccessResource(body: CreateAccessResource): Observable<AccessResource> {
    return this.createAccessResourceResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateAccessResourceResponse(body?: UpdateAccessResource): Observable<HttpResponse<AccessResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/accessResources`,
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
        let _body: AccessResource = null;
        _body = _resp.body as AccessResource
        return _resp.clone({body: _body}) as HttpResponse<AccessResource>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateAccessResource(body?: UpdateAccessResource): Observable<AccessResource> {
    return this.updateAccessResourceResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single AccessResource
   * @param accessResourceId - ID of AccessResource to return
   */
  getAccessResourceByIdResponse(accessResourceId: number): Observable<HttpResponse<AccessResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/accessResources/${accessResourceId}`,
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
        let _body: AccessResource = null;
        _body = _resp.body as AccessResource
        return _resp.clone({body: _body}) as HttpResponse<AccessResource>;
      })
    );
  }

  /**
   * Returns a single AccessResource
   * @param accessResourceId - ID of AccessResource to return
   */
  getAccessResourceById(accessResourceId: number): Observable<AccessResource> {
    return this.getAccessResourceByIdResponse(accessResourceId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a AccessResource
   * @param accessResourceId - AccessResource Id to delete
   */
  deleteAccessResourceResponse(accessResourceId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/accessResources/${accessResourceId}`,
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
   * Deletes a AccessResource
   * @param accessResourceId - AccessResource Id to delete
   */
  deleteAccessResource(accessResourceId: number): Observable<void> {
    return this.deleteAccessResourceResponse(accessResourceId).pipe(
      map(_r => _r.body)
    );
  }}

export module AccessResourcesService {
}
