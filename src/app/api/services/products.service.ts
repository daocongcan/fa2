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

import { Product } from '../models/product';
import { CreateProduct } from '../models/create-product';
import { UpdateProduct } from '../models/update-product';


@Injectable()
export class ProductsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Products
   */
  listProductsResponse(): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products`,
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
        let _body: Product[] = null;
        _body = _resp.body as Product[]
        return _resp.clone({body: _body}) as HttpResponse<Product[]>;
      })
    );
  }

  /**
   * get list of Products
   */
  listProducts(): Observable<Product[]> {
    return this.listProductsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Product
   * @param body - Created Product object
   */
  createProductResponse(body?: CreateProduct): Observable<HttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/products`,
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
        let _body: Product = null;
        _body = _resp.body as Product
        return _resp.clone({body: _body}) as HttpResponse<Product>;
      })
    );
  }

  /**
   * Create Product
   * @param body - Created Product object
   */
  createProduct(body?: CreateProduct): Observable<Product> {
    return this.createProductResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProductResponse(body?: UpdateProduct): Observable<HttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/products`,
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
        let _body: Product = null;
        _body = _resp.body as Product
        return _resp.clone({body: _body}) as HttpResponse<Product>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProduct(body?: UpdateProduct): Observable<Product> {
    return this.updateProductResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Product
   * @param productId - ID of Product to return
   */
  getProductByIdResponse(productId: number): Observable<HttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products/${productId}`,
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
        let _body: Product = null;
        _body = _resp.body as Product
        return _resp.clone({body: _body}) as HttpResponse<Product>;
      })
    );
  }

  /**
   * Returns a single Product
   * @param productId - ID of Product to return
   */
  getProductById(productId: number): Observable<Product> {
    return this.getProductByIdResponse(productId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Product
   * @param productId - product Id to delete
   */
  deleteProductResponse(productId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/products/${productId}`,
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
   * Delete a Product
   * @param productId - product Id to delete
   */
  deleteProduct(productId: number): Observable<void> {
    return this.deleteProductResponse(productId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of Products by company id
   * @param companyId - ID of company to return
   */
  listProductsByCompanyIdResponse(companyId: number): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products/company/${companyId}`,
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
        let _body: Product[] = null;
        _body = _resp.body as Product[]
        return _resp.clone({body: _body}) as HttpResponse<Product[]>;
      })
    );
  }

  /**
   * get list of Products by company id
   * @param companyId - ID of company to return
   */
  listProductsByCompanyId(companyId: number): Observable<Product[]> {
    return this.listProductsByCompanyIdResponse(companyId).pipe(
      map(_r => _r.body)
    );
  }}

export module ProductsService {
}
