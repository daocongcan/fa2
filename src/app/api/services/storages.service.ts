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

import { Storage } from '../models/storage';
import { CreateStorage } from '../models/create-storage';
import { UpdateStorage } from '../models/update-storage';


@Injectable()
export class StoragesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Storages
   */
  listStorageResponse(): Observable<HttpResponse<Storage[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/storages`,
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
        let _body: Storage[] = null;
        _body = _resp.body as Storage[]
        return _resp.clone({body: _body}) as HttpResponse<Storage[]>;
      })
    );
  }

  /**
   * get list of Storages
   */
  listStorage(): Observable<Storage[]> {
    return this.listStorageResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Storage
   * @param body - Created Storage object
   */
  createStorageResponse(body?: CreateStorage): Observable<HttpResponse<Storage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/storages`,
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
        let _body: Storage = null;
        _body = _resp.body as Storage
        return _resp.clone({body: _body}) as HttpResponse<Storage>;
      })
    );
  }

  /**
   * Create Storage
   * @param body - Created Storage object
   */
  createStorage(body?: CreateStorage): Observable<Storage> {
    return this.createStorageResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateStorageResponse(body?: UpdateStorage): Observable<HttpResponse<Storage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/storages`,
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
        let _body: Storage = null;
        _body = _resp.body as Storage
        return _resp.clone({body: _body}) as HttpResponse<Storage>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateStorage(body?: UpdateStorage): Observable<Storage> {
    return this.updateStorageResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Storage
   * @param storageId - ID of Storage to return
   */
  getStorageByIdResponse(storageId: number): Observable<HttpResponse<Storage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/storages/${storageId}`,
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
        let _body: Storage = null;
        _body = _resp.body as Storage
        return _resp.clone({body: _body}) as HttpResponse<Storage>;
      })
    );
  }

  /**
   * Returns a single Storage
   * @param storageId - ID of Storage to return
   */
  getStorageById(storageId: number): Observable<Storage> {
    return this.getStorageByIdResponse(storageId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Storage
   * @param storageId - storage Id to delete
   */
  deleteStorageResponse(storageId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/storages/${storageId}`,
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
   * Delete a Storage
   * @param storageId - storage Id to delete
   */
  deleteStorage(storageId: number): Observable<void> {
    return this.deleteStorageResponse(storageId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of storages by company id
   * @param companyId - ID of company to return
   */
  listStoragesByCompanyIdResponse(companyId: number): Observable<HttpResponse<Storage[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/storages/company/${companyId}`,
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
        let _body: Storage[] = null;
        _body = _resp.body as Storage[]
        return _resp.clone({body: _body}) as HttpResponse<Storage[]>;
      })
    );
  }

  /**
   * get list of storages by company id
   * @param companyId - ID of company to return
   */
  listStoragesByCompanyId(companyId: number): Observable<Storage[]> {
    return this.listStoragesByCompanyIdResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }}

export module StoragesService {
}
