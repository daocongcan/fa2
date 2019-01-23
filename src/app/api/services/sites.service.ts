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

import { Site } from '../models/site';
import { CreateSite } from '../models/create-site';
import { UpdateSite } from '../models/update-site';


@Injectable()
export class SitesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Sites
   */
  listSitesResponse(): Observable<HttpResponse<Site[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sites`,
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
        let _body: Site[] = null;
        _body = _resp.body as Site[]
        return _resp.clone({body: _body}) as HttpResponse<Site[]>;
      })
    );
  }

  /**
   * get list of Sites
   */
  listSites(): Observable<Site[]> {
    return this.listSitesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Sites
   * @param body - Created Site object
   */
  createSiteResponse(body?: CreateSite): Observable<HttpResponse<Site>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/sites`,
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
        let _body: Site = null;
        _body = _resp.body as Site
        return _resp.clone({body: _body}) as HttpResponse<Site>;
      })
    );
  }

  /**
   * Create Sites
   * @param body - Created Site object
   */
  createSite(body?: CreateSite): Observable<Site> {
    return this.createSiteResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateSiteResponse(body?: UpdateSite): Observable<HttpResponse<Site>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/sites`,
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
        let _body: Site = null;
        _body = _resp.body as Site
        return _resp.clone({body: _body}) as HttpResponse<Site>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateSite(body?: UpdateSite): Observable<Site> {
    return this.updateSiteResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Site
   * @param siteId - ID of Site to return
   */
  getSiteByIdResponse(siteId: number): Observable<HttpResponse<Site>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sites/${siteId}`,
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
        let _body: Site = null;
        _body = _resp.body as Site
        return _resp.clone({body: _body}) as HttpResponse<Site>;
      })
    );
  }

  /**
   * Returns a single Site
   * @param siteId - ID of Site to return
   */
  getSiteById(siteId: number): Observable<Site> {
    return this.getSiteByIdResponse(siteId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Site
   * @param siteId - site Id to delete
   */
  deleteSiteResponse(siteId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/sites/${siteId}`,
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
   * Delete a Site
   * @param siteId - site Id to delete
   */
  deleteSite(siteId: number): Observable<void> {
    return this.deleteSiteResponse(siteId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of sites by company id
   * @param companyId - ID of company to return
   */
  listSitesByCompanyIdResponse(companyId: number): Observable<HttpResponse<Site[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sites/company/${companyId}`,
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
        let _body: Site[] = null;
        _body = _resp.body as Site[]
        return _resp.clone({body: _body}) as HttpResponse<Site[]>;
      })
    );
  }

  /**
   * get list of sites by company id
   * @param companyId - ID of company to return
   */
  listSitesByCompanyId(companyId: number): Observable<Site[]> {
    return this.listSitesByCompanyIdResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }}

export module SitesService {
}
