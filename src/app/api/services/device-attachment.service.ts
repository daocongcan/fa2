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

import { DeviceAttachment } from '../models/device-attachment';
import { CreateDeviceAttachment } from '../models/create-device-attachment';


@Injectable()
export class DeviceAttachmentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of device attachment
   */
  listDeviceAttachmentResponse(): Observable<HttpResponse<DeviceAttachment[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/deviceAttachment`,
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
        let _body: DeviceAttachment[] = null;
        _body = _resp.body as DeviceAttachment[]
        return _resp.clone({body: _body}) as HttpResponse<DeviceAttachment[]>;
      })
    );
  }

  /**
   * get list of device attachment
   */
  listDeviceAttachment(): Observable<DeviceAttachment[]> {
    return this.listDeviceAttachmentResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Device Attachment
   * @param body - Created Device Attachment
   */
  CreateDeviceAttachmentResponse(body: CreateDeviceAttachment): Observable<HttpResponse<DeviceAttachment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/deviceAttachment`,
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
        let _body: DeviceAttachment = null;
        _body = _resp.body as DeviceAttachment
        return _resp.clone({body: _body}) as HttpResponse<DeviceAttachment>;
      })
    );
  }

  /**
   * Create Device Attachment
   * @param body - Created Device Attachment
   */
  CreateDeviceAttachment(body: CreateDeviceAttachment): Observable<DeviceAttachment> {
    return this.CreateDeviceAttachmentResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Device Attachment
   * @param deviceAttachmentId - device attachment Id to delete
   */
  deleteDeviceAttachmentResponse(deviceAttachmentId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/deviceAttachment/${deviceAttachmentId}`,
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
   * Delete a Device Attachment
   * @param deviceAttachmentId - device attachment Id to delete
   */
  deleteDeviceAttachment(deviceAttachmentId: number): Observable<void> {
    return this.deleteDeviceAttachmentResponse(deviceAttachmentId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single  Device Attachment
   * @param productId - ID of company to return
   */
  getDeviceAttachmentByProductIdResponse(productId: number): Observable<HttpResponse<DeviceAttachment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/deviceAttachment/product/${productId}`,
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
        let _body: DeviceAttachment = null;
        _body = _resp.body as DeviceAttachment
        return _resp.clone({body: _body}) as HttpResponse<DeviceAttachment>;
      })
    );
  }

  /**
   * Returns a single  Device Attachment
   * @param productId - ID of company to return
   */
  getDeviceAttachmentByProductId(productId: number): Observable<DeviceAttachment> {
    return this.getDeviceAttachmentByProductIdResponse(productId).pipe(
      map(_r => _r.body)
    );
  }}

export module DeviceAttachmentService {
}
