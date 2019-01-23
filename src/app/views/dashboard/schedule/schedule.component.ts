import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
// import { Pipe } from '@angular/core';
// import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

import { NodeService } from '../../../api/services/node.service';
import { Node } from '../../../api/models/node';

import { GwService } from '../../../api/services/gw.service';
import { Gw } from '../../../api/models/gw';

import { ScheduleService } from '../../../api/services/schedule.service';
import { Schedule } from '../../../api/models/schedule';


import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public schedule: Schedule = new Schedule();
  public schedules: Schedule[] = [];


  public nodes: Node[] = [];
  public gws:Gw[] = [];

  public itemsNod:any = [] ;
  public itemsGw:any = [] ;
  
  selectGw = 0;
  selectNod = 0;

  @ViewChild('gw') ngSelectGw: SelectComponent;
  @ViewChild('nod') ngSelectNod: SelectComponent;

  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private apiGwService: GwService,
    private apiScheduleService: ScheduleService,
    
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {
    this.renderView();
  }

  renderView(){
    
  

  }

  




}
