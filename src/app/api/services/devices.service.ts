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

import { Device } from '../models/device';
import { CreateDevice } from '../models/create-device';
import { UpdateDevice } from '../models/update-device';


@Injectable()
export class DevicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Device
   */
  listDevicesResponse(): Observable<HttpResponse<Device[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/devices`,
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
        let _body: Device[] = null;
        _body = _resp.body as Device[]
        return _resp.clone({body: _body}) as HttpResponse<Device[]>;
      })
    );
  }

  /**
   * get list of Device
   */
  listDevices(): Observable<Device[]> {
    return this.listDevicesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Device
   * @param body - Created Device
   */
  createDeviceResponse(body: CreateDevice): Observable<HttpResponse<Device>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/devices`,
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
        let _body: Device = null;
        _body = _resp.body as Device
        return _resp.clone({body: _body}) as HttpResponse<Device>;
      })
    );
  }

  /**
   * Create Device
   * @param body - Created Device
   */
  createDevice(body: CreateDevice): Observable<Device> {
    return this.createDeviceResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateDeviceResponse(body?: UpdateDevice): Observable<HttpResponse<Device>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/devices`,
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
        let _body: Device = null;
        _body = _resp.body as Device
        return _resp.clone({body: _body}) as HttpResponse<Device>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateDevice(body?: UpdateDevice): Observable<Device> {
    return this.updateDeviceResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Device
   * @param deviceId - ID of device to return
   */
  getDeviceByIdResponse(deviceId: number): Observable<HttpResponse<Device>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/devices/${deviceId}`,
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
        let _body: Device = null;
        _body = _resp.body as Device
        return _resp.clone({body: _body}) as HttpResponse<Device>;
      })
    );
  }

  /**
   * Returns a single Device
   * @param deviceId - ID of device to return
   */
  getDeviceById(deviceId: number): Observable<Device> {
    return this.getDeviceByIdResponse(deviceId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a Device
   * @param deviceId - device Id to delete
   */
  deleteDeviceResponse(deviceId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/devices/${deviceId}`,
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
   * Delete a Device
   * @param deviceId - device Id to delete
   */
  deleteDevice(deviceId: number): Observable<void> {
    return this.deleteDeviceResponse(deviceId).pipe(
      map(_r => _r.body)
    );
  }}

export module DevicesService {
}
