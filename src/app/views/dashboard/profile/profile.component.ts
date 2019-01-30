import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe,CommonModule } from '@angular/common';
import * as $ from 'jquery';
import { LatLng, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { Polyline, Circle, LatLngLiteral } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { AgmMap } from '@agm/core/directives/map';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common';

import { Directive } from '@angular/core/src/metadata/directives';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

import { NodeService } from '../../../api/services/node.service';
import { Node } from '../../../api/models/node';
import { Nodedata } from '../../../api/models/node-data';
import { NodeGPS } from '../../../api/models/node-gps';

import { Getsensor } from '../../../api/models/getsensor';
import { Temperature } from '../../../api/models/temperature';
import { Accelerometer } from '../../../api/models/accelerometer';

import { GroupsService } from '../../../api/services/groups.service';
import { Group } from '../../../api/models/group';

import { NodeProfile } from '../../../api/models/node-profile';

import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

// import { $,  } from 'protractor';
import { randomBytes } from 'crypto';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { formatDate } from 'ngx-bootstrap/chronos/format';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public node: Node = new Node();
  public node2: Node = new Node();

  companies :Company[]= [];

  public modelProfile: NodeProfile = new NodeProfile();
  public modelProfiles: NodeProfile[] = [];

  public getsensors: Getsensor[] = [];
  public temperatures: Temperature[] = [];
  public accelerometers: Accelerometer[] = [];

  
  public updateNode: Node = new Node();
  public updateProfile: NodeProfile = new NodeProfile();

  public nodeData: Nodedata = new Nodedata();
  public nodeGPS: NodeGPS = new NodeGPS();

  public nodes: Node[] = [];
  items:any = [] ;
  items2:any = [] ;

  public group:Group = new Group(); 
  public groups:Group[]= [] ;
  lat;
  long;
  allIdChecked=[];
  
  paginations = [];
  date1 = null;
  date2 = null;
  selectGroup = 0;
  keySearch = "";
  bsDaterangepicker = [];
  profile = false;
  selectStatus = null;
  arrStatus = [{"text":'active',"id":'true'},{"text":'not active',"id":'false'}];
  nameNode;
  dateNode;
  activeCompany=[];
  @ViewChild('co') ngSelect: SelectComponent;
  

  dateRang: Date;
  daterangepickerModel: Date[];
  typeChart = null;
  chart = null;
  temperature  ;
  humidity ;
  pluviometer ;
  activeChart;
  addactive = false;
  selectCompany;
  userString = sessionStorage.getItem('user');
  userData = JSON.parse(this.userString);
  role;
  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private apiGroupService: GroupsService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private apiCompanyService: CompaniesService,
    private locale: Locale,
    private datePipe: DatePipe,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.role = this.commonService.getRoleOfUser();
  }


  ngOnInit() {
    // this.spinnerService.show();
    this.renderView();
    $('.small-box').click(function() {
      $('.small-box').removeClass('active');
      $(this).addClass('active');
    });
  }
 
  
  renderView(){
    this.getAllGroup();
    this.getAllNode();
    this.getAllProfile();
    this.getAllCompany();
    google.charts.load('current', {'packages':['corechart','line']});
      // Set a callback to run when the Google Visualization API is loaded.
    // google.charts.setOnLoadCallback(this.drawChart);

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginations = this.nodes.slice(startItem, endItem);
    
  }

  getAllNode() {
    this.apiNodeService.listNode().subscribe(
      data => {
        this.nodes = data;
        this.paginations = this.nodes.slice(0, 10);
      }
    );
  }

  getAllCompany() {
    this.items = [];
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;

        if(this.role == 1){
          data.forEach(e => {
            this.items.push( {"text":e.name_company,"id":e._id});
            // console.log(this.items);
            // this.items = e.name_company;
            this.ngSelect.items = this.items;
          });
        }else {
          data.forEach(e => {
            if( e._id == this.userData.id_company ) {
              this.items.push( {"text":e.name_company,"id":e._id});
              // console.log(this.items);
              // this.items = e.name_company;
              this.ngSelect.items = this.items;
            }
            
          });
        }
        
      }
    );
  }

  getAllProfile() {
    if( this.role == 1 ) {
      this.apiNodeService.listProfile().subscribe(
        data => {
          this.modelProfiles = data;
          console.log(data);
          this.paginations = this.nodes.slice(0, 10);
        },
        err => {
          // this.commonService.notifyError(this.locale.SORRY, "No Data", 1500);
        }
      );
    } else {
      this.apiNodeService.getProfileByCompany(this.userData.id_company).subscribe(
        data => {
          this.modelProfiles = data;
          console.log(data);
          this.paginations = this.nodes.slice(0, 10);
        },
        err => {
          // this.commonService.notifyError(this.locale.SORRY, "No Data", 1500);
        }
      );
    }  
  }

  getAllGroup() {
    this.items = [];
    this.items2 = [];
    this.apiGroupService.listGroups().subscribe(
      data => {
        this.groups = data;
      }
    );
  }

  nameExists(value,id) {
    let count = 1;
    this.nodes.forEach(el => {
      if( el.name_node.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
      } else if ( el.name_node.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
    
  }

  save() {
    
    if (this.updateNode._id == undefined ||  this.updateNode._id <1 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    }

    else if ( !this.updateNode.name_node || !this.updateNode.name_node.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }

    else if (this.nameExists(this.updateNode.name_node,this.updateNode._id) > 1 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }

    // else if ( this.selectStatus == null ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Status_is_required, 1500);
    // }
    else if ( !this.updateNode.Manufacture || !this.updateNode.Manufacture.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Manufactuer_is_required , 1500);
    }
    else if ( !this.updateNode.Codec || !this.updateNode.Codec.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Codec_is_required , 1500);
    }
    else if ( !this.updateNode.OS || !this.updateNode.OS.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required, 1500);
    }
    else if (this.selectGroup == 0 || this.selectGroup == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Group_is_required , 1500);
    }
    else if ( !this.updateNode.dev_eui || !this.updateNode.dev_eui.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Dev_Eui_is_required, 1500);
    }
    else if (!this.updateNode.app_eui || !this.updateNode.app_eui.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Eui_is_required , 1500);
    }
    else if ( !this.updateNode.app_key || !this.updateNode.app_key.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Key_is_required, 1500);
    }
    
    // else if ( !this.updateNode.Profile || this.updateNode.Profile.trim() ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Profile_is_required, 1500);
    // }

    else {
      this.updateNode.id_group = this.selectGroup;
      this.updateNode.status = this.selectStatus;

      this.apiNodeService.updateNode(this.updateNode).subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success, 1500);
            this.renderView();
            $("#update").click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }

  deleteAll(){
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiNodeService.deleteNode(this.allIdChecked[index]).subscribe(
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
      this.commonService.notifyError(this.locale.SORRY, "Selected user delete", 1500);
    }
  };

  getUpdateProfile( updateProfile: NodeProfile){
    this.updateProfile = {
      _id: updateProfile._id,
      name_profile: updateProfile.name_profile,
      Codec: updateProfile.Codec,
      id_company: updateProfile.id_company,
      
    };

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          if(this.updateProfile.id_company == e._id){
            this.activeCompany.push({'text':e.name_company,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelect.active = this.activeCompany;
            this.selectCompany = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );
  };

  public filterItems(query) {
    return this.modelProfiles.filter(function(el) {
        return el.name_profile.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
  }
  
  public seachName (){
    
    if(this.role == 1) {
      this.apiNodeService.listProfile().subscribe(
        data => {
          this.modelProfiles = data;
          this.modelProfiles = (this.filterItems(this.keySearch));
          this.paginations = this.modelProfiles.slice(0, 10);
        }
      );
    }else {
      this.apiNodeService.getProfileByCompany(this.userData.id_company).subscribe(
        data => {
          this.modelProfiles = data;
          this.modelProfiles = (this.filterItems(this.keySearch));
          this.paginations = this.modelProfiles.slice(0, 10);
        }
      );
    }

  }


  getIdChecked(e,id){
    // console.log(e.target.checked);
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    // console.log(this.allIdChecked);
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

  
  
  nameExists2(value) {
    return this.nodes.some(function(el) {
      return el.name_node.toLowerCase()== value.toLowerCase();
    }); 
  }

  idExists(value) {
    return this.nodes.some(function(el) {
      return el._id == value;
    }); 
  }
  
  add() {
    // if ( !this.node._id ||  this.node._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }
    // else if (this.idExists(this.node._id) == true ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }
    if ( !this.node2.name_node || !this.node2.name_node.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }

    else if (this.nameExists2(this.node2.name_node) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }

    // else if ( this.selectStatus == null ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Status_is_required, 1500);
    // }
    else if ( !this.node2.Manufacture || !this.node2.Manufacture.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Manufactuer_is_required, 1500);
    }
    else if ( !this.node2.Codec || !this.node2.Codec.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Codec_is_required, 1500);
    }
    else if ( !this.node2.OS || !this.node2.OS.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required , 1500);
    }
    else if ( this.selectGroup == 0 || this.selectGroup == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Group_is_required , 1500);
    }
    else if ( !this.node2.dev_eui || !this.node2.dev_eui.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Dev_Eui_is_required, 1500);
    }
    else if ( !this.node2.app_eui || !this.node2.app_eui.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Eui_is_required, 1500);
    }
    else if ( !this.node2.app_key || !this.node2.app_key.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.App_Key_is_required, 1500);
    }
   
    // else if ( !this.node.Profile || !this.node.Profile.trim() ) { 
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Profile_is_required, 1500);
    // }
    else {
      this.node2.id_group = this.selectGroup;
      this.node2.status = this.selectStatus;
      this.apiNodeService.createNode(this.node2).subscribe(
        response => {
          this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
          this.node2 = new Node;
          this.renderView();
          $("#add").click();
          this.router.navigate(['/node']);
        },
        err => {
          this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
        }
      );
    }
  }

  addActive(){
    this.addactive = true;
  }
  
  public selected(value:any):void {
    this.selectCompany = value.id;
    
  }

  // drawChart (){
  // }


}
