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

import { Company } from '../models/company';
import { CreateCompany } from '../models/create-company';
import { UpdateCompany } from '../models/update-company';


@Injectable()
export class CompaniesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Client
   */
  listClientsResponse(): Observable<HttpResponse<Company[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/client`,
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
        let _body: Company[] = null;
        _body = _resp.body as Company[]
        return _resp.clone({body: _body}) as HttpResponse<Company[]>;
      })
    );
  }

  /**
   * get list of Client
   */
  listClients(): Observable<Company[]> {
    return this.listClientsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of Companies
   */
  listCompaniesResponse(): Observable<HttpResponse<Company[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `company/getall`,
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
        let _body: Company[] = null;
        _body = _resp.body as Company[]
        return _resp.clone({body: _body}) as HttpResponse<Company[]>;
      })
    );
  }

  /**
   * get list of Companies
   */
  listCompanies(): Observable<Company[]> {
    
    return this.listCompaniesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Company
   * @param body - Created Company object
   */
  createCompanyResponse(body?: CreateCompany): Observable<HttpResponse<Company>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `company/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    console.log(req);
    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Company = null;
        _body = _resp.body as Company
        return _resp.clone({body: _body}) as HttpResponse<Company>;
      })
    );
  }

  /**
   * Create Company
   * @param body - Created Company object
   */
  createCompany(body?: CreateCompany): Observable<Company> {
    console.log("createCompany: ");
    console.log(body);
    return this.createCompanyResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  
  /**
   * @param body - undefined
   */
  updateCompanyResponse(body?: Company): Observable<HttpResponse<Company>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "Put",
      this.rootUrl + `company/update/${body._id}`,
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
        let _body: Company = null;
        _body = _resp.body as Company
        return _resp.clone({body: _body}) as HttpResponse<Company>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateCompany(body?: Company): Observable<Company> {
    return this.updateCompanyResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single company
   * @param companyId - ID of company to return
   */
  getCompanyByIdResponse(companyId: number): Observable<HttpResponse<Company>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/companies/${companyId}`,
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
        let _body: Company = null;
        _body = _resp.body as Company
        return _resp.clone({body: _body}) as HttpResponse<Company>;
      })
    );
  }

  /**
   * Returns a single company
   * @param companyId - ID of company to return
   */
  getCompanyById(companyId: number): Observable<Company> {
    return this.getCompanyByIdResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a company
   * @param companyId - company id to delete
   */
  deleteCompanyResponse(companyId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `company/delete/${companyId}`,
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
   * Delete a company
   * @param companyId - company id to delete
   */
  deleteCompany(companyId: number): Observable<void> {
    return this.deleteCompanyResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * search a company
   * @param companyName - companyName search
   */

  searchCompanyResponse(companyName: string): Observable<HttpResponse<Company[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `company/getbyname/${companyName}`,
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
        let _body: Company[] = null;
        _body = _resp.body as Company[]
        return _resp.clone({body: _body}) as HttpResponse<Company[]>;
      })
    );
  }

  /**
   * search a company
   * @param companyName - 
   */
  searchCompany(companyName: string): Observable<Company[]> {
    return this.searchCompanyResponse(companyName).pipe(
      map(_r => _r.body)
    );
  }
  

}
   

export module CompaniesService {
}
