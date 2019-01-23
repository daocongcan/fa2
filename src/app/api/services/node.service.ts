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
import { catchError } from 'rxjs/operators';

import { Node } from '../models/node';
import { Nodedata } from '../models/node-data';
import { NodeGPS } from '../models/node-gps';
import { Alarm } from '../models/alarm';
import { Getsensor } from '../models/getsensor';
import { Temperature } from '../models/temperature';
import { Accelerometer } from '../models/accelerometer';

import { Getbystatus } from '../models/node-getbystatus';


// import { CreateNode } from '../models/create-Node';
// import { UpdateNode } from '../models/update-Node';


@Injectable()
export class NodeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Node
   */
  listNodeResponse(): Observable<HttpResponse<Node[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `node/getall`,
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
        let _body: Node[] = null;
        _body = _resp.body as Node[]
        return _resp.clone({body: _body}) as HttpResponse<Node[]>;
      })
    );
  }

  /**
   * get list of Node
   */
  listNode(): Observable<Node[]> {
    return this.listNodeResponse().pipe(
      map(_r => _r.body)
    );
  }


  /**
   * get list of Alarm
   */
  listAlarmResponse(): Observable<HttpResponse<Alarm[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `alarm/getall`,
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
        let _body: Alarm[] = null;
        _body = _resp.body as Alarm[]
        return _resp.clone({body: _body}) as HttpResponse<Alarm[]>;
      })
    );
  }

  /**
   * get list of Alarm
   */
  listAlarm(): Observable<Alarm[]> {
    return this.listAlarmResponse().pipe(
      map(_r => _r.body)
    );
  }

 
  //  listGetsensorResponse

  listGetsensorResponse(name): Observable<HttpResponse<Getsensor[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `chart/getsensor/${name}`,
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
        let _body: Getsensor[] = null;
        _body = _resp.body as Getsensor[]
        return _resp.clone({body: _body}) as HttpResponse<Getsensor[]>;
      })
    );
  }

  /**
   * get list of Getsensor
   */
  listGetsensor(name): Observable<Getsensor[]> {
    return this.listGetsensorResponse(name).pipe(
      map(_r => _r.body)
      
    );
  }


  

  listDrawAccelerometerResponse(name,value): Observable<HttpResponse<Accelerometer[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `chart/getchart/${name}/${value}`,
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
        let _body: Accelerometer[] = null;
        _body = _resp.body as Accelerometer[]
        return _resp.clone({body: _body}) as HttpResponse<Accelerometer[]>;
      })
    );
  }

  /**
   * get list of Getsensor
   */
  listDrawAccelerometer(name,value): Observable<Accelerometer[]> {
    return this.listDrawAccelerometerResponse(name,value).pipe(
      map(_r => _r.body)
    );
  }


  listDrawResponse(name,value): Observable<HttpResponse<Temperature[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `chart/getchart/${name}/${value}`,
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
        let _body: Temperature[] = null;
        _body = _resp.body as Temperature[]
        return _resp.clone({body: _body}) as HttpResponse<Temperature[]>;
      })
    );
  }

  /**
   * get list of Getsensor
   */
  listDraw(name,value): Observable<Temperature[]> {
    return this.listDrawResponse(name,value).pipe(
      map(_r => _r.body)
    );
  }

  // get Node by group 

  getByGroupResponse(groupId): Observable<HttpResponse<Node[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `node/getbygroup/${groupId}`,
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
        let _body: Node[] = null;
        _body = _resp.body as Node[]
        return _resp.clone({body: _body}) as HttpResponse<Node[]>;
      })
    );
  }

  /**
   * get list of Getsensor
   */
  getByGroup(groupId): Observable<Node[]> {
    return this.getByGroupResponse(groupId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Create Node
   * @param body - Created Node object
   */
  createNodeResponse(body: Node): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `node/create`,
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
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  
  /**
   * Create Node
   * @param body - Created Node object
   */
  createNode(body: Node): Observable<Node> {
    return this.createNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Create getbystatusNode
   * @param body - Created getbystatusNode object
   */
  getbystatusResponse(): Observable<HttpResponse<Getbystatus[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `node/getbystatus`,
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
        let _body: Getbystatus[] = null;
        _body = _resp.body as Getbystatus[]
        return _resp.clone({body: _body}) as HttpResponse<Getbystatus[]>;
      })
    );
  }

  /**
   * Create getbystatus Node
   * @param body - Created getbystatusNode object
   */
  getbystatusNode(): Observable<Getbystatus[]> {
    return this.getbystatusResponse().pipe(
      map(_r => _r.body),
      
    );
  }
 
  /**
   * @param body - undefined
   */
  updateNodeResponse(body?: Node): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `node/update/${body._id}`,
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
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateNode(body?: Node): Observable<Node> {
    return this.updateNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Node
   * @param NodeId - ID of Node to return
   */
  getNodeByIdResponse(NodeId: number): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/Node/${NodeId}`,
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
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  

  /**
   * Returns a single Node
   * @param NodeId - ID of Node to return
   */
  getNodeById(NodeId: number): Observable<Node> {
    return this.getNodeByIdResponse(NodeId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single Node
   * @param nodeName - Name of Node to return
   */


  getNodeByNameResponse(id: number): Observable<HttpResponse<NodeGPS>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `node/getlocation/${id}`,
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
        let _body: NodeGPS = null;
        _body = _resp.body as NodeGPS
        return _resp.clone({body: _body}) as HttpResponse<NodeGPS>;
      })
    );
  }

  getNodeByName(id: number): Observable<NodeGPS> {
    return this.getNodeByNameResponse(id).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * Deletes a Node
   * @param NodeId - Node id to delete
   */
  deleteNodeResponse(NodeId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `node/delete/${NodeId}`,
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
   * Deletes a Node
   * @param NodeId - Node id to delete
   */
  deleteNode(NodeId: number): Observable<void> {
    return this.deleteNodeResponse(NodeId).pipe(
      map(_r => _r.body)
    );
  }}

export module NodeService {
}
