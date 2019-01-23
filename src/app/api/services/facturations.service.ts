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

import { Facturation } from '../models/facturation';


@Injectable()
export class FacturationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Facturations by company id and site id
   * @param siteId - ID of site to return
   * @param companyId - ID of company to return
   */
  listFacturationsResponse(params: FacturationsService.ListFacturationsParams): Observable<HttpResponse<Facturation[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/facturations/company/${params.companyId}/site/${params.siteId}`,
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
        let _body: Facturation[] = null;
        _body = _resp.body as Facturation[]
        return _resp.clone({body: _body}) as HttpResponse<Facturation[]>;
      })
    );
  }

  /**
   * get list of Facturations by company id and site id
   * @param siteId - ID of site to return
   * @param companyId - ID of company to return
   */
  listFacturations(params: FacturationsService.ListFacturationsParams): Observable<Facturation[]> {
    return this.listFacturationsResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module FacturationsService {
  export interface ListFacturationsParams {
    siteId: number;
    companyId: number;
  }
}
