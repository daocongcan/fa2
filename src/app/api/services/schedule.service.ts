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

import { Schedule } from '../models/schedule';
// import { CreateSchedule } from '../models/create-Schedule';
// import { UpdateSchedule } from '../models/update-Schedule';


@Injectable()
export class ScheduleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Schedule
   */
  listScheduleResponse(): Observable<HttpResponse<Schedule[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `Schedule/getall`,
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
        let _body: Schedule[] = null;
        _body = _resp.body as Schedule[]
        return _resp.clone({body: _body}) as HttpResponse<Schedule[]>;
      })
    );
  }

  /**
   * get list of Schedule
   */
  listSchedule(): Observable<Schedule[]> {
    return this.listScheduleResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Schedule
   * @param body - Created Schedule object
   */
  createScheduleResponse(body: Schedule): Observable<HttpResponse<Schedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `Schedule/create`,
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
        let _body: Schedule = null;
        _body = _resp.body as Schedule
        return _resp.clone({body: _body}) as HttpResponse<Schedule>;
      })
    );
  }

  /**
   * Create Schedule
   * @param body - Created Schedule object
   */
  createSchedule(body: Schedule): Observable<Schedule> {
    return this.createScheduleResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateScheduleResponse(body?: Schedule): Observable<HttpResponse<Schedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `Schedule/update/${body._id}`,
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
        let _body: Schedule = null;
        _body = _resp.body as Schedule
        return _resp.clone({body: _body}) as HttpResponse<Schedule>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateSchedule(body?: Schedule): Observable<Schedule> {
    return this.updateScheduleResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Schedule
   * @param ScheduleId - ID of Schedule to return
   */
  getScheduleByIdResponse(ScheduleId: number): Observable<HttpResponse<Schedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/Schedule/${ScheduleId}`,
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
        let _body: Schedule = null;
        _body = _resp.body as Schedule
        return _resp.clone({body: _body}) as HttpResponse<Schedule>;
      })
    );
  }

  /**
   * Returns a single Schedule
   * @param ScheduleId - ID of Schedule to return
   */
  getScheduleById(ScheduleId: number): Observable<Schedule> {
    return this.getScheduleByIdResponse(ScheduleId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a Schedule
   * @param ScheduleId - Schedule id to delete
   */
  deleteScheduleResponse(ScheduleId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `Schedule/delete/${ScheduleId}`,
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
   * Deletes a Schedule
   * @param ScheduleId - Schedule id to delete
   */
  deleteSchedule(ScheduleId: number): Observable<void> {
    return this.deleteScheduleResponse(ScheduleId).pipe(
      map(_r => _r.body)
    );
  }}

export module ScheduleService {
}
