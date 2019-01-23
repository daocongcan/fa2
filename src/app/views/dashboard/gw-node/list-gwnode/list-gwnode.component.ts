import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
// import { Pipe } from '@angular/core';
// import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/common.service';

import { NodeService } from '../../../../api/services/node.service';
import { Node } from '../../../../api/models/node';

import { GwNodeService } from '../../../../api/services/gw-node.service';
import { GwNode } from '../../../../api/models/gw-node';

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';

import { GwService } from '../../../../api/services/gw.service';
import { Gw } from '../../../../api/models/gw';


import { Locale } from '../../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-list-gwnode',
  templateUrl: './list-gwnode.component.html',
  styleUrls: ['./list-gwnode.component.css']
})
export class ListGwnodeComponent implements OnInit {

  public gwnode: GwNode = new GwNode();
  public updateGwNode: GwNode = new GwNode();

  
  public gwnodes: GwNode[] = [];



  public nodes: Node[] = [];
  public companies:Company[] = [];
  public gws:Gw[] = [];

  public itemsCom:any = [] ;
  public itemsGw:any = [] ;
  public itemsNod:any = [] ;
  
  allIdChecked = [];
  nodeArr = [];
  keySearch= "";
  selectGw = 0;
  selectNod = 0;
  selectCom = 0;

  paginations = [];
  private value:any = ['Athens'];
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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginations = this.gwnodes.slice(startItem, endItem);
    // console.log(this.users);
  }

  renderView(){
    this.getAllCompany();
    this.getAllGw();
    this.getAllNode();
    this.getAllGwNode();
  }

  getAllCompany() {
    this.itemsCom=[];
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
    this.itemsGw= [];
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
    this.itemsNod = [];
    this.apiNodeService.listNode().subscribe(
      data => {
        this.nodes = data;
        data.forEach(e => {
          
          this.itemsNod.push( {"text":e.name_node,"id":e._id});
          this.ngSelectNod.items = this.itemsNod;

        });
        
      }
    );
  }

  getAllGwNode() {

    this.apiGwNodeService.listGwNode().subscribe(
      data => {
        this.gwnodes = data;
        this.paginations = this.gwnodes.slice(0, 10);
        
      }
    );
  }

  getUpdateGwNode( updateGwNode: GwNode) {
    this.updateGwNode = {
      _id: updateGwNode._id,
      id_company: updateGwNode.id_company,
      id_gw: updateGwNode.id_gw,
      id_node: updateGwNode.id_node,
      
    };

    let activeGroup = [];
    let activeGroup2 = [];
    let activeGroup3 = [];
    
    // this.ngSelect.active =  { "id": updateGroup.id_company };
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          
          if(this.updateGwNode.id_company == e._id){
            activeGroup.push({'text':e.name_company,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelectCo.active = activeGroup;
            this.selectCom = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );

    this.apiNodeService.listNode().subscribe(
      data => {
        this.nodes = data;
        data.forEach(e => {
          
          if(this.updateGwNode.id_node == e._id){
            activeGroup2.push({'text':e.name_node,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelectNod.active = activeGroup2;
            this.selectNod = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );

    this.apiGwService.listGw().subscribe(
      data => {
        this.gws = data;
        data.forEach(e => {
          
          if(this.updateGwNode.id_gw == e._id){
            activeGroup3.push({'text':e.name_gw,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelectGw.active = activeGroup3;
            this.selectGw = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );
    
  };

  getIdChecked(e,id){
    // console.log(e.target.checked);
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    // console.log(this.allIdChecked);
  }

  deleteAll() {
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiGwNodeService.deleteGwNode(this.allIdChecked[index]).subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Delete_success, 1500);
              this.renderView();
              this.allIdChecked=[];
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
            }
          )
        }
      }
    }else {
      this.commonService.notifyError(this.locale.SORRY, "Selected gw node delete", 1500);
    }
  };

  filterItems(query) {
    return this.companies.filter(function(e) {
        return e.name_company.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  filterIdItems(id) {
    return this.gwnodes.filter(function(e) {
        return e.id_company.valueOf() == id  ;
    })
   
  }

  seachName (){
    if(this.keySearch != "") {
      let company = this.filterItems(this.keySearch);
      if(company.length > 0) {
        this.apiGwNodeService.listGwNode().subscribe(
          data => {
            this.gwnodes = data;
            this.gwnodes = (this.filterIdItems(company[0]._id));
            this.paginations = this.gwnodes.slice(0, 10);
          }
        );
      } else {
        this.commonService.notifyError(this.locale.SORRY, "Name Company Does Not Exist", 1500);  
      }

    } else {
      this.commonService.notifyError(this.locale.SORRY, "Enter Name Company", 1500);
      this.apiGwNodeService.listGwNode().subscribe(
        data => {
          this.gwnodes = data;
          this.paginations = this.gwnodes.slice(0, 10);
        }
      );
    }
  }

  
  save() {
    
    if (this.selectGw == 0 || this.selectGw == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.GW_is_required, 1500);
    }
    else if (this.selectCom == 0 || this.selectCom == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
    }
    else if (this.selectNod == 0 || this.selectNod == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Node_is_required, 1500);
    }
    
    else {
      
      this.updateGwNode.id_company = this.selectCom;
      this.updateGwNode.id_gw = this.selectGw;
      this.updateGwNode.id_node = this.selectNod;

      this.apiGwNodeService.updateGwNode(this.updateGwNode)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
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
    // console.log('Selected Node is: ', value);
  }

  // public itemsToString(value:Array<any> = []):string {
  //   return value
  //     .map((item:any) => {
  //       return item.text;
  //     }).join(',');
          
  // }

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
