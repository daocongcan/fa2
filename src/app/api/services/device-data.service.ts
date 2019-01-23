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

import { DeviceData } from '../models/device-data';
import { CreateDeviceData } from '../models/create-device-data';
import { UpdateDeviceData } from '../models/update-device-data';


@Injectable()
export class DeviceDataService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of device data
   */
  listDeviceDataResponse(): Observable<HttpResponse<DeviceData[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/deviceData`,
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
        let _body: DeviceData[] = null;
        _body = _resp.body as DeviceData[]
        return _resp.clone({body: _body}) as HttpResponse<DeviceData[]>;
      })
    );
  }

  /**
   * get list of device data
   */
  listDeviceData(): Observable<DeviceData[]> {
    return this.listDeviceDataResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Device Data
   * @param body - Created Device Data
   */
  createDeviceDataResponse(body: CreateDeviceData): Observable<HttpResponse<DeviceData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/deviceData`,
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
        let _body: DeviceData = null;
        _body = _resp.body as DeviceData
        return _resp.clone({body: _body}) as HttpResponse<DeviceData>;
      })
    );
  }

  /**
   * Create Device Data
   * @param body - Created Device Data
   */
  createDeviceData(body: CreateDeviceData): Observable<DeviceData> {
    return this.createDeviceDataResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateDeviceDataResponse(body?: UpdateDeviceData): Observable<HttpResponse<DeviceData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/deviceData`,
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
        let _body: DeviceData = null;
        _body = _resp.body as DeviceData
        return _resp.clone({body: _body}) as HttpResponse<DeviceData>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateDeviceData(body?: UpdateDeviceData): Observable<DeviceData> {
    return this.updateDeviceDataResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single DeviceData
   * @param deviceDataId - ID of device to return
   */
  getDeviceDataByIdResponse(deviceDataId: number): Observable<HttpResponse<DeviceData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/deviceData/${deviceDataId}`,
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
        let _body: DeviceData = null;
        _body = _resp.body as DeviceData
        return _resp.clone({body: _body}) as HttpResponse<DeviceData>;
      })
    );
  }

  /**
   * Returns a single DeviceData
   * @param deviceDataId - ID of device to return
   */
  getDeviceDataById(deviceDataId: number): Observable<DeviceData> {
    return this.getDeviceDataByIdResponse(deviceDataId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a DeviceData
   * @param deviceDataId - device Data Id to delete
   */
  deleteDeviceDataResponse(deviceDataId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/deviceData/${deviceDataId}`,
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
   * Delete a DeviceData
   * @param deviceDataId - device Data Id to delete
   */
  deleteDeviceData(deviceDataId: number): Observable<void> {
    return this.deleteDeviceDataResponse(deviceDataId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list of device data by device id
   * @param deviceId - ID of device to return
   */
  listDeviceDataByDeviceIdResponse(deviceId: number): Observable<HttpResponse<DeviceData[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/deviceData/device/${deviceId}`,
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
        let _body: DeviceData[] = null;
        _body = _resp.body as DeviceData[]
        return _resp.clone({body: _body}) as HttpResponse<DeviceData[]>;
      })
    );
  }

  /**
   * get list of device data by device id
   * @param deviceId - ID of device to return
   */
  listDeviceDataByDeviceId(deviceId: number): Observable<DeviceData[]> {
    return this.listDeviceDataByDeviceIdResponse(deviceId).pipe(
      map(_r => _r.body)
    );
  }}

export module DeviceDataService {
}
