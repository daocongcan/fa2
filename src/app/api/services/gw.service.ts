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

import { Gw } from '../models/gw';

import { NodeGPS } from '../models/node-gps';
// import { CreateGw } from '../models/create-Gw';
// import { UpdateGw } from '../models/update-Gw';


@Injectable()
export class GwService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Gw
   */
  listGwResponse(): Observable<HttpResponse<Gw[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `Gw/getall`,
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
        let _body: Gw[] = null;
        _body = _resp.body as Gw[]
        return _resp.clone({body: _body}) as HttpResponse<Gw[]>;
      })
    );
  }

  /**
   * get list of Gw
   */
  listGw(): Observable<Gw[]> {
    return this.listGwResponse().pipe(
      map(_r => _r.body)
    );
  }

  // GPS
  getGPSResponse(id: number): Observable<HttpResponse<NodeGPS>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `gw/getlocation/${id}`,
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
        let _body: NodeGPS = null;
        _body = _resp.body as NodeGPS
        return _resp.clone({body: _body}) as HttpResponse<NodeGPS>;
      })
    );
  }

  getGPS(id: number): Observable<NodeGPS> {
    return this.getGPSResponse(id).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * Create Gw
   * @param body - Created Gw object
   */
  createGwResponse(body: Gw): Observable<HttpResponse<Gw>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `gw/create`,
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
        let _body: Gw = null;
        _body = _resp.body as Gw
        return _resp.clone({body: _body}) as HttpResponse<Gw>;
      })
    );
  }

  /**
   * Create Gw
   * @param body - Created Gw object
   */
  createGw(body: Gw): Observable<Gw> {
    return this.createGwResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateGwResponse(body?: Gw): Observable<HttpResponse<Gw>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `Gw/update/${body._id}`,
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
        let _body: Gw = null;
        _body = _resp.body as Gw
        return _resp.clone({body: _body}) as HttpResponse<Gw>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateGw(body?: Gw): Observable<Gw> {
    return this.updateGwResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Gw
   * @param GwId - ID of Gw to return
   */
  getGwByIdResponse(GwId: number): Observable<HttpResponse<Gw>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/Gw/${GwId}`,
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
        let _body: Gw = null;
        _body = _resp.body as Gw
        return _resp.clone({body: _body}) as HttpResponse<Gw>;
      })
    );
  }

  /**
   * Returns a single Gw
   * @param GwId - ID of Gw to return
   */
  getGwById(GwId: number): Observable<Gw> {
    return this.getGwByIdResponse(GwId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a Gw
   * @param GwId - Gw id to delete
   */
  deleteGwResponse(GwId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `Gw/delete/${GwId}`,
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
   * Deletes a Gw
   * @param GwId - Gw id to delete
   */
  deleteGw(GwId: number): Observable<void> {
    return this.deleteGwResponse(GwId).pipe(
      map(_r => _r.body)
    );
  }}

export module GwService {
}
