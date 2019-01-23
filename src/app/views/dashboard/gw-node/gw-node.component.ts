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

import { GwNodeService } from '../../../api/services/gw-node.service';
import { GwNode } from '../../../api/models/gw-node';

import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';

import { GwService } from '../../../api/services/gw.service';
import { Gw } from '../../../api/models/gw';

import { Getbystatus } from '../../../api/models/node-getbystatus';


import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';


@Component({
  selector: 'app-gw-node',
  templateUrl: './gw-node.component.html',
  styleUrls: ['./gw-node.component.css']
})
export class GwNodeComponent implements OnInit {

  public gwnode: GwNode = new GwNode();
  public gwnodes: GwNode[] = [];

  public getbystatus: Getbystatus = new Getbystatus();

  public getbystatuses: Getbystatus[] = [];

  public nodes: Node[] = [];
  public companies:Company[] = [];
  public gws:Gw[] = [];

  public itemsCom:any = [] ;
  public itemsGw:any = [] ;
  public itemsNod:any = [] ;
  
  nodeArr = [];

  selectGw = 0;
  selectNod = 0;
  selectCom = 0;

  @ViewChild('com') ngSelectCo: SelectComponent;
  @ViewChild('gw') ngSelectGw: SelectComponent;
  @ViewChild('nod') ngSelectNod: SelectComponent;

  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private apiCompanyService: CompaniesService,
    private apiGwService: GwService,
    private apiGwNodeService: GwNodeService,
    
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {
    this.renderView();
  }

  renderView(){
    this.getAllCompany();
    this.getAllGw();
    this.getAllNode();

  }

  getAllCompany() {

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          
          this.itemsCom.push( {"text":e.name_company,"id":e._id});
          this.ngSelectCo.items = this.itemsCom;

        });
        
      }
    );
  }

  getAllGw() {

    this.apiGwService.listGw().subscribe(
      data => {
        this.gws = data;
        data.forEach(e => {
          
          this.itemsGw.push( {"text":e.name_gw,"id":e._id});
          this.ngSelectGw.items = this.itemsGw;

        });
        
      }
    );
  }

  getAllNode() {

    this.apiNodeService.getbystatusNode().subscribe(
      data => {
        this.getbystatuses = data;
        data.forEach(e => {
          
          this.itemsNod.push( {"text":e.name,"id":e.id});
          this.ngSelectNod.items = this.itemsNod;

        });
        
      }
    );
  }
  
  save() {
    
    // if (this.gwnode._id == undefined ||  this.gwnode._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED , 1500);
    // }
    if (this.selectGw == 0 || this.selectGw == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.GW_is_required , 1500);
    }
    else if (this.selectCom == 0 || this.selectCom == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
    }
    else if (this.selectNod == 0 || this.selectNod == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Node_is_required, 1500);
    }
    
    
    else {
      
      this.gwnode.id_company = this.selectCom;
      this.gwnode.id_gw = this.selectGw;
      // console.log(this.gwnode);
      for (let index = 0; index < this.nodeArr.length; index++) {
        this.gwnode.id_node = this.nodeArr[index].id;

        this.apiGwNodeService.createGwNodeResponse(this.gwnode)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.gwnode = new GwNode;

            this.selectCom = 0;
            this.selectGw = 0;
            this.selectNod = 0;

            this.ngSelectCo.active = null;
            this.ngSelectGw.active = null;
            this.ngSelectNod.active = null;
            this.router.navigateByUrl("/gw-node");
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );

      }

      
    }
  }



  public selectedCom(value:any):void {
    this.selectCom = value.id;
    
  }
  public selectedGw(value:any):void {
    this.selectGw = value.id;
    
  }
  public selectedNod(value:any):void {
    this.selectNod  = value.id;
    this.nodeArr.push({'text':value.text,"id":value.id});
    
  }

  // private get disabledV():string {
  //   // return this._disabledV;
  // }
 
  private set disabledV(value:string) {
    // this._disabledV = value;
    // this.disabled = this._disabledV === '1';
  }
 
  public removed(value:any):void {
    this.nodeArr.splice(this.nodeArr.indexOf(value.id), 1);
    
    // console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    // console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    // this.value = value;
  }


}
