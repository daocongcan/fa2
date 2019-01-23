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

import { Status } from '../models/status';
import { CreateStatus } from '../models/create-status';
import { UpdateStatus } from '../models/update-status';


@Injectable()
export class StatusService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Status
   */
  listStatusResponse(): Observable<HttpResponse<Status[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/status`,
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
        let _body: Status[] = null;
        _body = _resp.body as Status[]
        return _resp.clone({body: _body}) as HttpResponse<Status[]>;
      })
    );
  }

  /**
   * get list of Status
   */
  listStatus(): Observable<Status[]> {
    return this.listStatusResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Status
   * @param body - Created Status
   */
  createStatusResponse(body?: CreateStatus): Observable<HttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/status`,
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
        let _body: Status = null;
        _body = _resp.body as Status
        return _resp.clone({body: _body}) as HttpResponse<Status>;
      })
    );
  }

  /**
   * Create Status
   * @param body - Created Status
   */
  createStatus(body?: CreateStatus): Observable<Status> {
    return this.createStatusResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateStatusResponse(body?: UpdateStatus): Observable<HttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/status`,
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
        let _body: Status = null;
        _body = _resp.body as Status
        return _resp.clone({body: _body}) as HttpResponse<Status>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateStatus(body?: UpdateStatus): Observable<Status> {
    return this.updateStatusResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single status
   * @param statusId - ID of Status to return
   */
  getStatusByIdResponse(statusId: number): Observable<HttpResponse<Status>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/status/${statusId}`,
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
        let _body: Status = null;
        _body = _resp.body as Status
        return _resp.clone({body: _body}) as HttpResponse<Status>;
      })
    );
  }

  /**
   * Returns a single status
   * @param statusId - ID of Status to return
   */
  getStatusById(statusId: number): Observable<Status> {
    return this.getStatusByIdResponse(statusId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Status
   * @param statusId - Status Id to delete
   */
  deleteStatusResponse(statusId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/status/${statusId}`,
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
   * Delete a Status
   * @param statusId - Status Id to delete
   */
  deleteStatus(statusId: number): Observable<void> {
    return this.deleteStatusResponse(statusId).pipe(
      map(_r => _r.body)
    );
  }}

export module StatusService {
}
