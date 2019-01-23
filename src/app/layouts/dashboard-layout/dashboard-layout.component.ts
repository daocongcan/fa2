import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

import { Directive } from '@angular/core/src/metadata/directives';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';

import { Locale } from '../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { $ } from 'protractor';
import { randomBytes } from 'crypto';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { formatDate } from 'ngx-bootstrap/chronos/format';

import { ScheduleService } from '../../api/services/schedule.service';
import { Schedule } from '../../api/models/schedule';

import { NodeService } from '../../api/services/node.service';
import { Alarm } from '../../api/models/alarm';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

   // public schedules: Schedule = new Schedule();
   public schedules: Schedule[] = [];
   public alarms: Alarm[] = [];
   role;
   constructor ( 
     private router: Router,
     private apiScheduleService: ScheduleService,
     private apiNodeService: NodeService,
     private commonService: CommonService,
     private modalService: BsModalService,
     private locale: Locale,
   ) { }
 
   ngOnInit() {
     
     this.getAllAlarm();
     this.role = this.commonService.getRoleOfUser();
     
   }
 
   getAllAlarm(){
     this.apiNodeService.listAlarm().subscribe(
       data => {
         this.alarms = data;
        //  console.log(data);
         
       }
     );
   }

}
