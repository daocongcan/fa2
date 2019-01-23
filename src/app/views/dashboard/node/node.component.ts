import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

import { NodeService } from '../../../api/services/node.service';
import { Node } from '../../../api/models/node';

import { GroupsService } from '../../../api/services/groups.service';
import { Group } from '../../../api/models/group';


import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  public node: Node = new Node();
  public nodes: Node[] = [];
  public items:any = [] ;
  public groups:Group[]=[];
  
  selectGroup = 0;
  selectStatus = null;

  arrStatus = [{"text":'Active',"id":'true'},{"text":'Not active',"id":'false'}]

  @ViewChild('groups') ngSelect: SelectComponent;
  @ViewChild('status') ngSelectStatus: SelectComponent;

  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private apiGroupService: GroupsService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {


    this.getAllGroup();
    this.getAllNode();
  }

  getAllGroup() {
    this.apiGroupService.listGroups().subscribe(
      data => {
        this.groups = data;
        data.forEach(e => {
          this.items.push( {"text":e.group_name,"id":e._id});
          // console.log(this.items);
          // this.items = e.name_company;
          this.ngSelect.items = this.items;
        });
      }
    );
  }

  getAllNode() {
    this.apiNodeService.listNode().subscribe(
      data => {
        this.nodes = data;
      }
    );
  }

  nameExists(value) {
    return this.nodes.some(function(el) {
      return el.name_node.toLowerCase()== value.toLowerCase();
    }); 
  }

  idExists(value) {
    return this.nodes.some(function(el) {
      return el._id == value;
    }); 
  }
  
  save() {
    
    // if ( !this.node._id ||  this.node._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }
    // else if (this.idExists(this.node._id) == true ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }
    if ( !this.node.name_node || !this.node.name_node.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }

    else if (this.nameExists(this.node.name_node) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }

    // else if ( this.selectStatus == null ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Status_is_required, 1500);
    // }
    else if ( !this.node.Manufacture || !this.node.Manufacture.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Manufactuer_is_required, 1500);
    }
    else if ( !this.node.Codec || !this.node.Codec.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Codec_is_required, 1500);
    }
    else if ( !this.node.OS || !this.node.OS.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required , 1500);
    }
    else if ( this.selectGroup == 0 || this.selectGroup == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Group_is_required , 1500);
    }
    else if ( !this.node.dev_eui || !this.node.dev_eui.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Dev_Eui_is_required, 1500);
    }
    else if ( !this.node.app_eui || !this.node.app_eui.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Eui_is_required, 1500);
    }
    else if ( !this.node.app_key || !this.node.app_key.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Key_is_required, 1500);
    }
    // else if ( !this.node.Profile || !this.node.Profile.trim() ) { 
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Profile_is_required, 1500);
    // }
    else {
      this.node.id_group = this.selectGroup;
      this.node.status = this.selectStatus;
      
      this.apiNodeService.createNode(this.node).subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.node = new Node;
            this.router.navigate(['/node']);
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }

  public selectedGroup(value:any):void {
    this.selectGroup = value.id;
  }

  public selectedStatus(value:any):void {
    this.selectStatus = value.id;
  }

  // private get disabledV():string {
  //   // return this._disabledV;
  // }
 
  private set disabledV(value:string) {
    // this._disabledV = value;
    // this.disabled = this._disabledV === '1';
  }
 
  public removed(value:any):void {
    // console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    // console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    // this.value = value;
  }

}
