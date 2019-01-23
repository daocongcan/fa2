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

import { GwNode } from '../models/gw-node';
// import { CreateGwNode } from '../models/create-GwNode';
// import { UpdateGwNode } from '../models/update-GwNode';


@Injectable()
export class GwNodeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of GwNode
   */
  listGwNodeResponse(): Observable<HttpResponse<GwNode[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `GwNode/getall`,
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
        let _body: GwNode[] = null;
        _body = _resp.body as GwNode[]
        return _resp.clone({body: _body}) as HttpResponse<GwNode[]>;
      })
    );
  }

  /**
   * get list of GwNode
   */
  listGwNode(): Observable<GwNode[]> {
    return this.listGwNodeResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create GwNode
   * @param body - Created GwNode object
   */
  createGwNodeResponse(body: GwNode): Observable<HttpResponse<GwNode>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `GwNode/create`,
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
        let _body: GwNode = null;
        _body = _resp.body as GwNode
        return _resp.clone({body: _body}) as HttpResponse<GwNode>;
      })
    );
  }

  /**
   * Create GwNode
   * @param body - Created GwNode object
   */
  createGwNode(body: GwNode): Observable<GwNode> {
    return this.createGwNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateGwNodeResponse(body?: GwNode): Observable<HttpResponse<GwNode>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `GwNode/update/${body._id}`,
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
        let _body: GwNode = null;
        _body = _resp.body as GwNode
        return _resp.clone({body: _body}) as HttpResponse<GwNode>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateGwNode(body?: GwNode): Observable<GwNode> {
    return this.updateGwNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single GwNode
   * @param GwNodeId - ID of GwNode to return
   */
  getGwNodeByIdResponse(GwNodeId: number): Observable<HttpResponse<GwNode>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/GwNode/${GwNodeId}`,
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
        let _body: GwNode = null;
        _body = _resp.body as GwNode
        return _resp.clone({body: _body}) as HttpResponse<GwNode>;
      })
    );
  }

  /**
   * Returns a single GwNode
   * @param GwNodeId - ID of GwNode to return
   */
  getGwNodeById(GwNodeId: number): Observable<GwNode> {
    return this.getGwNodeByIdResponse(GwNodeId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a GwNode
   * @param GwNodeId - GwNode id to delete
   */
  deleteGwNodeResponse(GwNodeId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `GwNode/delete/${GwNodeId}`,
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
   * Deletes a GwNode
   * @param GwNodeId - GwNode id to delete
   */
  deleteGwNode(GwNodeId: number): Observable<void> {
    return this.deleteGwNodeResponse(GwNodeId).pipe(
      map(_r => _r.body)
    );
  }}

export module GwNodeNodeService {
}
