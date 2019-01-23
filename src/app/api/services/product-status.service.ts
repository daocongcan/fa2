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

import { ProductStatus } from '../models/product-status';
import { CreateProductStatus } from '../models/create-product-status';
import { UpdateProductStatus } from '../models/update-product-status';


@Injectable()
export class ProductStatusService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Product Status
   */
  listProductStatusResponse(): Observable<HttpResponse<ProductStatus[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productStatus`,
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
        let _body: ProductStatus[] = null;
        _body = _resp.body as ProductStatus[]
        return _resp.clone({body: _body}) as HttpResponse<ProductStatus[]>;
      })
    );
  }

  /**
   * get list of Product Status
   */
  listProductStatus(): Observable<ProductStatus[]> {
    return this.listProductStatusResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create ProductStatus
   * @param body - Created Status for product
   */
  createProductStatusResponse(body?: CreateProductStatus): Observable<HttpResponse<ProductStatus>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/productStatus`,
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
        let _body: ProductStatus = null;
        _body = _resp.body as ProductStatus
        return _resp.clone({body: _body}) as HttpResponse<ProductStatus>;
      })
    );
  }

  /**
   * Create ProductStatus
   * @param body - Created Status for product
   */
  createProductStatus(body?: CreateProductStatus): Observable<ProductStatus> {
    return this.createProductStatusResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProductStatusResponse(body?: UpdateProductStatus): Observable<HttpResponse<ProductStatus>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/productStatus`,
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
        let _body: ProductStatus = null;
        _body = _resp.body as ProductStatus
        return _resp.clone({body: _body}) as HttpResponse<ProductStatus>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProductStatus(body?: UpdateProductStatus): Observable<ProductStatus> {
    return this.updateProductStatusResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single product status
   * @param productStatusId - ID of ProductStatus to return
   */
  getProductStatusByIdResponse(productStatusId: number): Observable<HttpResponse<ProductStatus>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productStatus/${productStatusId}`,
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
        let _body: ProductStatus = null;
        _body = _resp.body as ProductStatus
        return _resp.clone({body: _body}) as HttpResponse<ProductStatus>;
      })
    );
  }

  /**
   * Returns a single product status
   * @param productStatusId - ID of ProductStatus to return
   */
  getProductStatusById(productStatusId: number): Observable<ProductStatus> {
    return this.getProductStatusByIdResponse(productStatusId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Product Status
   * @param productStatusId - product Status Id to delete
   */
  deleteProductStatusResponse(productStatusId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/productStatus/${productStatusId}`,
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
   * Delete a Product Status
   * @param productStatusId - product Status Id to delete
   */
  deleteProductStatus(productStatusId: number): Observable<void> {
    return this.deleteProductStatusResponse(productStatusId).pipe(
      map(_r => _r.body)
    );
  }}

export module ProductStatusService {
}
