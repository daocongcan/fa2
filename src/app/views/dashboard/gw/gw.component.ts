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



import { GwService } from '../../../api/services/gw.service';
import { Gw } from '../../../api/models/gw';

import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-gw',
  templateUrl: './gw.component.html',
  styleUrls: ['./gw.component.scss']
})
export class GwComponent implements OnInit {

  public gw: Gw = new Gw();

  public gws: Gw[] = [];
  constructor(
    private router: Router,
    private apigwService: GwService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {
    this.getAllGw();
  }

  getAllGw() {
    this.apigwService.listGw().subscribe(
      data => {
        this.gws = data;
      }
    );
  }

  idExists(value) {
    return this.gws.some(function(el) {
      return el._id == value;
    }); 
  }


  nameExists(value) {
    return this.gws.some(function(el) {
      return el.name_gw.toLowerCase() == value.toLowerCase();
    }); 
  }

  save() {
    
    // if ( !this.gw._id ||  this.gw._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }

    // else if (this.idExists (this.gw._id) == true ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }

    if ( !this.gw.name_gw || !this.gw.name_gw.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.GW_is_required, 1500);
    }

    else if ( this.nameExists( this.gw.name_gw ) == true) {
      this.commonService.notifyError(this.locale.SORRY,  this.locale.GW_Existed , 1500);
    }

    else if ( !this.gw.IP_public || !this.gw.IP_public.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Ip_is_required, 1500);
    }

    else if ( !this.gw.MAC_add || !this.gw.MAC_add.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Mac_is_required, 1500);
    }

    else if ( !this.gw.OS || !this.gw.OS.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required, 1500);
    }
   
    
    else {
      
      this.apigwService.createGw(this.gw)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.gw = new Gw ;  
            this.router.navigate(['/gw']);
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }

  

  




}
