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

import { ProductRent } from '../models/product-rent';
import { CreateProductRent } from '../models/create-product-rent';
import { UpdateProductRent } from '../models/update-product-rent';


@Injectable()
export class ProductRentsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Product Rents
   */
  listProductRentsResponse(): Observable<HttpResponse<ProductRent[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productRents`,
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
        let _body: ProductRent[] = null;
        _body = _resp.body as ProductRent[]
        return _resp.clone({body: _body}) as HttpResponse<ProductRent[]>;
      })
    );
  }

  /**
   * get list of Product Rents
   */
  listProductRents(): Observable<ProductRent[]> {
    return this.listProductRentsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Product Rents
   * @param body - Created a product rent
   */
  createProductRentResponse(body: CreateProductRent): Observable<HttpResponse<ProductRent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/productRents`,
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
        let _body: ProductRent = null;
        _body = _resp.body as ProductRent
        return _resp.clone({body: _body}) as HttpResponse<ProductRent>;
      })
    );
  }

  /**
   * Create Product Rents
   * @param body - Created a product rent
   */
  createProductRent(body: CreateProductRent): Observable<ProductRent> {
    return this.createProductRentResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProductRentResponse(body?: UpdateProductRent): Observable<HttpResponse<ProductRent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/productRents`,
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
        let _body: ProductRent = null;
        _body = _resp.body as ProductRent
        return _resp.clone({body: _body}) as HttpResponse<ProductRent>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProductRent(body?: UpdateProductRent): Observable<ProductRent> {
    return this.updateProductRentResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Product Rent
   * @param productRentId - ID of Product Rent to return
   */
  getProductRentByIdResponse(productRentId: number): Observable<HttpResponse<ProductRent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productRents/${productRentId}`,
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
        let _body: ProductRent = null;
        _body = _resp.body as ProductRent
        return _resp.clone({body: _body}) as HttpResponse<ProductRent>;
      })
    );
  }

  /**
   * Returns a single Product Rent
   * @param productRentId - ID of Product Rent to return
   */
  getProductRentById(productRentId: number): Observable<ProductRent> {
    return this.getProductRentByIdResponse(productRentId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Product Rent
   * @param productRentId - product rent Id to delete
   */
  deleteProductRentResponse(productRentId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/productRents/${productRentId}`,
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
   * Delete a Product Rent
   * @param productRentId - product rent Id to delete
   */
  deleteProductRent(productRentId: number): Observable<void> {
    return this.deleteProductRentResponse(productRentId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of Products rent by company id
   * @param companyId - ID of company to return
   */
  listProductRentsByCompanyIdResponse(companyId: number): Observable<HttpResponse<ProductRent[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productRents/company/${companyId}`,
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
        let _body: ProductRent[] = null;
        _body = _resp.body as ProductRent[]
        return _resp.clone({body: _body}) as HttpResponse<ProductRent[]>;
      })
    );
  }

  /**
   * get list of Products rent by company id
   * @param companyId - ID of company to return
   */
  listProductRentsByCompanyId(companyId: number): Observable<ProductRent[]> {
    return this.listProductRentsByCompanyIdResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }}

export module ProductRentsService {
}
