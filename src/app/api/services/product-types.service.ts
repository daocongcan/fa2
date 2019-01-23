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

import { ProductType } from '../models/product-type';
import { CreateProductType } from '../models/create-product-type';
import { UpdateProductType } from '../models/update-product-type';


@Injectable()
export class ProductTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Product Types
   */
  listProductTypesResponse(): Observable<HttpResponse<ProductType[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productTypes`,
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
        let _body: ProductType[] = null;
        _body = _resp.body as ProductType[]
        return _resp.clone({body: _body}) as HttpResponse<ProductType[]>;
      })
    );
  }

  /**
   * get list of Product Types
   */
  listProductTypes(): Observable<ProductType[]> {
    return this.listProductTypesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Product Types
   * @param body - Created type for product
   */
  createProductTypeResponse(body: CreateProductType): Observable<HttpResponse<ProductType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/productTypes`,
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
        let _body: ProductType = null;
        _body = _resp.body as ProductType
        return _resp.clone({body: _body}) as HttpResponse<ProductType>;
      })
    );
  }

  /**
   * Create Product Types
   * @param body - Created type for product
   */
  createProductType(body: CreateProductType): Observable<ProductType> {
    return this.createProductTypeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProductTypeResponse(body?: UpdateProductType): Observable<HttpResponse<ProductType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/productTypes`,
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
        let _body: ProductType = null;
        _body = _resp.body as ProductType
        return _resp.clone({body: _body}) as HttpResponse<ProductType>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProductType(body?: UpdateProductType): Observable<ProductType> {
    return this.updateProductTypeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Product Type
   * @param productTypeId - ID of Product Type to return
   */
  getProductTypeByIdResponse(productTypeId: number): Observable<HttpResponse<ProductType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/productTypes/${productTypeId}`,
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
        let _body: ProductType = null;
        _body = _resp.body as ProductType
        return _resp.clone({body: _body}) as HttpResponse<ProductType>;
      })
    );
  }

  /**
   * Returns a single Product Type
   * @param productTypeId - ID of Product Type to return
   */
  getProductTypeById(productTypeId: number): Observable<ProductType> {
    return this.getProductTypeByIdResponse(productTypeId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Product Type
   * @param productTypeId - product type Id to delete
   */
  deleteProductTypeResponse(productTypeId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/productTypes/${productTypeId}`,
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
   * Delete a Product Type
   * @param productTypeId - product type Id to delete
   */
  deleteProductType(productTypeId: number): Observable<void> {
    return this.deleteProductTypeResponse(productTypeId).pipe(
      map(_r => _r.body)
    );
  }}

export module ProductTypesService {
}
