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

import { Group } from '../models/group';
// import { CreateGroup } from '../models/create-Group';
// import { UpdateGroup } from '../models/update-Group';


@Injectable()
export class GroupsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Groups
   */
  listGroupsResponse(): Observable<HttpResponse<Group[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `group/getall`,
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
        let _body: Group[] = null;
        _body = _resp.body as Group[]
        return _resp.clone({body: _body}) as HttpResponse<Group[]>;
      })
    );
  }

  /**
   * get list of Groups
   */
  listGroups(): Observable<Group[]> {
    return this.listGroupsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Group
   * @param body - Created Group object
   */
  createGroupResponse(body: Group): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `group/create`,
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
        let _body: Group = null;
        _body = _resp.body as Group
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * Create Group
   * @param body - Created Group object
   */
  createGroup(body: Group): Observable<Group> {
    return this.createGroupResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateGroupResponse(body?: Group): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `group/update/${body._id}`,
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
        let _body: Group = null;
        _body = _resp.body as Group
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateGroup(body?: Group): Observable<Group> {
    return this.updateGroupResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Group
   * @param GroupId - ID of Group to return
   */
  getGroupByIdResponse(GroupId: number): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/groups/${GroupId}`,
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
        let _body: Group = null;
        _body = _resp.body as Group
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * Returns a single Group
   * @param GroupId - ID of Group to return
   */
  getGroupById(GroupId: number): Observable<Group> {
    return this.getGroupByIdResponse(GroupId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a Group
   * @param GroupId - Group id to delete
   */
  deleteGroupResponse(GroupId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `group/delete/${GroupId}`,
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
   * Deletes a Group
   * @param GroupId - Group id to delete
   */
  deleteGroup(GroupId: number): Observable<void> {
    return this.deleteGroupResponse(GroupId).pipe(
      map(_r => _r.body)
    );
  }}

export module GroupsService {
}
