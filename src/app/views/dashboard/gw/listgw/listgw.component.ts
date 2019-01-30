import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { LatLng, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { Polyline, Circle, LatLngLiteral } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { AgmMap } from '@agm/core/directives/map';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/common.service';

import { GwService } from '../../../../api/services/gw.service';
import { Gw } from '../../../../api/models/gw';

import { NodeGPS } from '../../../../api/models/node-gps';

import { Locale } from '../../../../locale';
import { NgClass } from '@angular/common';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { window } from 'rxjs/operators';
import { SelectComponent } from 'ng2-select';

import { GroupsService } from '../../../../api/services/groups.service';
import { Group } from '../../../../api/models/group';

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-listgw',
  templateUrl: './listgw.component.html',
  styleUrls: ['./listgw.component.scss']
})
export class ListgwComponent implements OnInit {

  public gw: Gw = new Gw();
  public updateGw: Gw = new Gw();
  public editGw: Gw;
  public gws: Gw[] = [];
  public keySearch:string ="";

  nodeGPS:NodeGPS = new NodeGPS();
  
  allIdChecked = [];

  paginations = [];

  center: any;
  showList: Boolean = false;
  zoom: Number = 14;
  bounds: LatLngBounds = null;
  coordinate: LatLngBoundsLiteral;
  infoWindowIsOpen: Boolean = false;
  lat: Number = 0;
  lng: Number = 0;
  id: Number = 1;
  capteurInfo: any = {
    identifiant: '',
    dernierMSC: '',
    statut: ''
  };
  storageInfo: any = {
    nom: '',
    disponible: '',
    loue: '',
    capteurs: ''
  };
  public storageList: Storage[];
  storageIcon = {
    url: '/assets/images/database.svg',
    scaledSize: {
      height: 90,
      width: 90
    }
  };
  listShowing = '';
  openStorageInfoWindow = false;
  isShowDetail = false;
  selectTab = 0;
  type = 'capteur';
  googleMarkers: any = [];
  currentZoom: number;

  profile = false;

  chart = null;
  companies:Company[] = [];
  role= null;
  userString = sessionStorage.getItem('user');
  userData = JSON.parse(this.userString);
  items;
  checkAddActive = false;
  selectCompany;
  activeCompany = [];

  order: string = 'name_gw';
  reverse: boolean = false;
  sortedCollection: any[];

  constructor(
    private router: Router,
    private apigwService: GwService,
    private apiCompanyService: CompaniesService,
    private apiGroupService: GroupsService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private orderPipe: OrderPipe
  ) {
    this.role = this.commonService.getRoleOfUser();
    this.sortedCollection = orderPipe.transform(this.gws, 'name_gw');
  }

  ngOnInit() {
    this.renderView();
  }

  @ViewChild('co') ngSelect: SelectComponent;
  renderView(){
    
    this.getAllGw();
    this.getAllCompany();
    
    // let height = ( $(document).height()) - 200;
    // $("agm-map").css("height",height+"px");

    // console.log($(document).height());
  };

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginations = this.gws.slice(startItem, endItem);
    
  }
  addActive(){
    this.checkAddActive = true;
  }
  getAllGw() {
    if( this.role == 1 ) {
      this.apigwService.listGw().subscribe(
        data => {
          this.gws = data;
          
          this.paginations = this.gws.slice(0, 10);
        }
      );
    }else {
      this.apigwService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.gws = data;
          
          this.paginations = this.gws.slice(0, 10);
        }
      );
    } 
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

  getUpdateGw(updateGw: Gw){
    this.updateGw = {
      _id: updateGw._id,
      name_gw: updateGw.name_gw,
      IP_public: updateGw.IP_public,
      MAC_add: updateGw.MAC_add,
      OS: updateGw.OS,
      Profile: updateGw.Profile,
      id_company: updateGw.id_company,
    };

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          if(this.updateGw.id_company == e._id){
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



  getIdChecked(e,id){
    
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    
  }

  deleteAll(){
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apigwService.deleteGw(this.allIdChecked[index]).subscribe(
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
      this.commonService.notifyError(this.locale.SORRY, "Selected GW Delete", 1500);
    }
  };

  public filterItems(query) {
    return this.gws.filter(function(el) {
        return el.name_gw.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  public seachName (){
    if(this.role == 1) {
      this.apigwService.listGw().subscribe(
        data => {
          this.gws = data;
          this.gws = (this.filterItems(this.keySearch));
          this.paginations = this.gws.slice(0, 10);
        }
      );
    } else {
      this.apigwService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.gws = data;
          this.gws = (this.filterItems(this.keySearch));
          this.paginations = this.gws.slice(0, 10);
        }
      );
    }

  }

  nameExists(value,id) {
    let count = 1;
    this.gws.forEach(el => {
      if( el.name_gw.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
        
      } else if ( el.name_gw.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
  }

  getGeo(id,name){
    this.chart = name;

    
    this.gws.forEach(e => {
      document.getElementById(e.name_gw).style.color = "#007bff" ;  
    });
    
    document.getElementById(name).style.color = "#23527c" ;
    
    this.apigwService.getGPS(id).subscribe(
      data => {
        this.nodeGPS = data;
        
        if(data != null){

          // this.nodes.forEach(e => {
          //   if(e._id == data.id_node ){
          //     this.nameNode = e.name_node;
          //     this.dateNode = data.createtime;
          //   }
          // });
          this.lat = this.nodeGPS.value.latitude;
          this.lng = this.nodeGPS.value.longitude;
          
          if ( data.value.latitude == 0 || data.value.longitude == 0 ||  Object.keys(data.value).length <1 ) {
            this.commonService.notifyError(this.locale.SORRY, " Latitude or Longitude = "+ 0, 1500);  
          }

        }else {

          this.lat=0;
          this.lng=0;
          // console.log(this.lat);
          this.commonService.notifyError(this.locale.SORRY, " "+ name +" doesn't exist", 1500);
        }
        
        // this.paginations = this.nodes.slice(0, 10);
      },
      error => { 
        this.lat=0;
        this.lng=0;
        
        this.commonService.notifyError(this.locale.SORRY, "Name ' "+ name +" ' No Data", 1500);
        // console.log('Received an errror: ' + error.status);
      }
    );
  }

  save() {
    
    if ( !this.updateGw.name_gw || !this.updateGw.name_gw.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }

    else if ( this.nameExists( this.updateGw.name_gw, this.updateGw._id ) > 1 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }

    else if (!this.updateGw.IP_public || !this.updateGw.IP_public.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Ip_is_required, 1500);
    }
    
    else if ( !this.updateGw.MAC_add || !this.updateGw.MAC_add.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Mac_is_required, 1500);
    }

    else if ( !this.updateGw.OS || !this.updateGw.OS.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required, 1500);
    }

    else if ( !this.selectCompany) {
      this.commonService.notifyError(this.locale.SORRY, "Company Not Select", 1500);
    }
   
    
    else {
      this.updateGw.id_company = this.selectCompany;
      this.apigwService.updateGw(this.updateGw)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.renderView();
            $("#add").click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }

  idExists(value) {
    return this.gws.some(function(el) {
      return el._id == value;
    }); 
  }

  nameExists2(value) {
    return this.gws.some(function(el) {
      return el.name_gw.toLowerCase() == value.toLowerCase();
    }); 
  }

  add() {
    
    // if ( !this.gw._id ||  this.gw._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }

    // else if (this.idExists (this.gw._id) == true ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }

    if ( !this.gw.name_gw || !this.gw.name_gw.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.GW_is_required, 1500);
    }

    else if ( this.nameExists2( this.gw.name_gw ) == true ) {
      this.commonService.notifyError(this.locale.SORRY,  this.locale.GW_Existed , 1500);
    }

    else if ( !this.gw.IP_public || !this.gw.IP_public.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Ip_is_required, 1500);
    }

    else if ( !this.gw.OS || !this.gw.OS.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.OS_is_required, 1500);
    }

    else if ( !this.gw.MAC_add || !this.gw.MAC_add.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Mac_is_required, 1500);
    }

    else if ( !this.selectCompany) {
      this.commonService.notifyError(this.locale.SORRY, "Company Not Select", 1500);
    }

    
    
    else {
      this.gw.id_company = this.selectCompany;
      
      this.apigwService.createGw(this.gw)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.gw = new Gw ;  
            $("#add").click();
            this.renderView();
            // this.router.navigate(['/gw']);
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }


  public selected(value:any):void {
    this.selectCompany = value.id;
  }
 
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
