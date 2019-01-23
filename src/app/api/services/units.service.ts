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

import { Unit } from '../models/unit';
import { CreateUnit } from '../models/create-unit';
import { UpdateUnit } from '../models/update-unit';


@Injectable()
export class UnitsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Units
   */
  listUnitsResponse(): Observable<HttpResponse<Unit[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/units`,
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
        let _body: Unit[] = null;
        _body = _resp.body as Unit[]
        return _resp.clone({body: _body}) as HttpResponse<Unit[]>;
      })
    );
  }

  /**
   * get list of Units
   */
  listUnits(): Observable<Unit[]> {
    return this.listUnitsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Unit
   * @param body - Created Unit
   */
  createUnitResponse(body: CreateUnit): Observable<HttpResponse<Unit>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/units`,
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
        let _body: Unit = null;
        _body = _resp.body as Unit
        return _resp.clone({body: _body}) as HttpResponse<Unit>;
      })
    );
  }

  /**
   * Create Unit
   * @param body - Created Unit
   */
  createUnit(body: CreateUnit): Observable<Unit> {
    return this.createUnitResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateUnitResponse(body?: UpdateUnit): Observable<HttpResponse<Unit>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/units`,
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
        let _body: Unit = null;
        _body = _resp.body as Unit
        return _resp.clone({body: _body}) as HttpResponse<Unit>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateUnit(body?: UpdateUnit): Observable<Unit> {
    return this.updateUnitResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Unit
   * @param unitId - ID of Unit to return
   */
  getUnitByIdResponse(unitId: number): Observable<HttpResponse<Unit>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/units/${unitId}`,
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
        let _body: Unit = null;
        _body = _resp.body as Unit
        return _resp.clone({body: _body}) as HttpResponse<Unit>;
      })
    );
  }

  /**
   * Returns a single Unit
   * @param unitId - ID of Unit to return
   */
  getUnitById(unitId: number): Observable<Unit> {
    return this.getUnitByIdResponse(unitId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Unit
   * @param unitId - Unit Id to delete
   */
  deleteUnitResponse(unitId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/units/${unitId}`,
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
   * Delete a Unit
   * @param unitId - Unit Id to delete
   */
  deleteUnit(unitId: number): Observable<void> {
    return this.deleteUnitResponse(unitId).pipe(
      map(_r => _r.body)
    );
  }}

export module UnitsService {
}
