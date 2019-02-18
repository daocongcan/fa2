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
import { CommonService } from '../../../../shared/common.service';

import { NodeService } from '../../../../api/services/node.service';
import { Node } from '../../../../api/models/node';
import { Nodedata } from '../../../../api/models/node-data';
import { NodeGPS } from '../../../../api/models/node-gps';

import { Getsensor } from '../../../../api/models/getsensor';
import { Temperature } from '../../../../api/models/temperature';
import { Accelerometer } from '../../../../api/models/accelerometer';

import { GroupsService } from '../../../../api/services/groups.service';
import { Group } from '../../../../api/models/group';

import { Locale } from '../../../../locale';
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

import { OrderPipe } from 'ngx-order-pipe';

import { NodeProfile } from '../../../../api/models/node-profile';

@Component({
  selector: 'app-listnode',
  templateUrl: './listnode.component.html',
  styleUrls: ['./listnode.component.scss']
})
export class ListnodeComponent implements OnInit {

  node: Node = new Node();
  node2: Node = new Node();
  
  nodeProfiles:NodeProfile[] = [];

  getsensors: Getsensor[] = [];
  temperatures: Temperature[] = [];
  accelerometers: Accelerometer[] = [];

  
  updateNode: Node = new Node();

  nodeData: Nodedata = new Nodedata();
  nodeGPS: NodeGPS = new NodeGPS();

  nodes: Node[] = [];
  items:any = [] ;
  items2:any = [] ;

  group:Group = new Group(); 
  groups:Group[]= [] ;
  lat;
  long;
  allIdChecked=[];
  
  paginations = [];
  date1 = null;
  date2 = null;
  selectGroup ;
  keySearch = "";
  bsDaterangepicker = [];
  checkProfile = false;
  selectStatus = null;
  arrStatus = [{"text":'active',"id":'true'},{"text":'not active',"id":'false'}];
  nameNode;
  dateNode;
  
  @ViewChild('gr') ngSelect: SelectComponent;
  @ViewChild('profile') ngSelectProfile: SelectComponent;
  @ViewChild('groups') ngSelectAdd: SelectComponent;

  dateRang: Date;
  daterangepickerModel: Date[];
  typeChart = null;
  chart = null;
  temperature  ;
  humidity ;
  pluviometer ;
  activeChart;
  addactive = false;

  role= null;
  userString = sessionStorage.getItem('user');
  userData = JSON.parse(this.userString);

  order: string = 'name_node';
  reverse: boolean = false;
  sortedCollection: any[];
  mapZoom = 1;
  updateActive = true;
  itemsProfile = [];
  selectProfile;
  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private apiGroupService: GroupsService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private datePipe: DatePipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private orderPipe: OrderPipe
  ) {
    this.role = this.commonService.getRoleOfUser();
    this.sortedCollection = orderPipe.transform(this.nodes, 'name_node');
  }


  ngOnInit() {
    // this.spinnerService.show();
    this.renderView();
    $('.small-box').click(function() {
      $('.small-box').removeClass('active');
      $(this).addClass('active');
    });
  }
 
  onValueChange(date: Date): void {
    this.dateRang = date;
    console.log(this.typeChart);
    if( date != null ) {
     this.date1 =  this.datePipe.transform(this.dateRang[0],"yyyy-MM-dd");
     this.date2 =  this.datePipe.transform(this.dateRang[1],"yyyy-MM-dd");
    } else {
      this.date1 = null;
      this.date2 = null;
    }
    if (this.typeChart){
      this.onchangeDraw(this.typeChart);
    }
  }

  onchangeDraw(value) {
    $('#chart_div').show();
    let dateNow = new Date();
    let dateNow7D = new Date();
    
    dateNow7D.setDate(dateNow7D.getDate() - 10 );
    let now7Date = this.datePipe.transform(dateNow7D,"yyyy-MM-dd");
    let nowDate = this.datePipe.transform(dateNow,"yyyy-MM-dd");
    this.typeChart = value;
    
    if(value != 'accelerometer') {

      this.apiNodeService.listDraw(this.chart,value,this.date1,this.date2).subscribe(
        res => {
          this.temperatures = res;
          
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'X');
          data.addColumn('number', 'value');
          
          let arrFull = [];
          let arrDate = [];
          let arrData = [];
          
          if(this.temperatures.length > 0 ) {
            this.temperatures.forEach(e => {
              arrData = (e.date.split("T"));
              if( this.date1 != null && this.date2 != null && arrData[0] <= this.date2 && arrData[0] >= this.date1 ) {
                arrDate.push([e.date,e.value]);
                // console.log(arrData);
              } else  {
                if( arrData[0] >= now7Date &&  arrData[0] <= nowDate )
                  arrFull.push([e.date,e.value]);
                else {
                  this.commonService.notifyError(this.locale.SORRY, "No Data 1" + value, 1500);
                }
              }
            });
          } else {
            this.commonService.notifyError(this.locale.SORRY, "No Data 2" + value, 1500);
          }
          if(this.date1 != null && this.date2 != null) {
            if( arrDate.length > 0 ) {
              // console.log(arrDate.length);
              data.addRows(arrDate);
            }
            else {
              this.commonService.notifyError(this.locale.SORRY, "No Data 3" + value, 1500);
            } 

          } else {
            if(arrFull.length > 0) {
              data.addRows(arrFull);
            }
            else {
              this.commonService.notifyError(this.locale.SORRY, "No Data 4" + value, 1500);
            } 
          }
          // Set chart options
          var options = {
            "width": 800,
            'height':300,
            hAxis: {
              title: 'Date'
            },
            vAxis: {
              title: ''
            }
          };
          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
          chart.draw(data, options);
        },
        error => {
          this.commonService.notifyError(this.locale.SORRY, "No Data Sensor " + value, 1500);
        }
      );
    } else {
      // this.apiNodeService.listDrawAccelerometer(this.chart,value).subscribe(
      //   res => {
      //     this.accelerometers = res;
          
      //     let X,Y,Z;
      //     var data = new google.visualization.DataTable();
      //     data.addColumn('string', 'Date');
      //     data.addColumn('number', 'X');
      //     data.addColumn('number', 'Y');
      //     data.addColumn('number', 'Z');

      //     let arrFull = [];
      //     let arrDate = [];

      //     let arrData = [];
          
      //     this.accelerometers.forEach(e => {
             
      //         arrData = (e.date.split("T"));

      //         if( this.date1 != null && this.date2 != null && arrData[0] <= this.date2 && arrData[0] >= this.date1 ) {
      //           arrDate.push([e.date,e.value.X,e.value.Y,e.value.Z]);
      //         } else {
            
      //           if( arrData[0] >= now7Date &&  arrData[0] <= nowDate ){
      //             arrFull.push([e.date,e.value.X,e.value.Y,e.value.Z]);
      //           }
      //           else {
      //             this.commonService.notifyError(this.locale.SORRY, "No Data " + value, 1500);
      //           }
      //         }

      //     });

      //     if(this.date1 != null && this.date2 != null) {
      //       if(arrDate.length >0) {
      //         data.addRows(arrDate);
      //       }
      //       else {
      //         this.commonService.notifyError(this.locale.SORRY, "No Data " + value, 1500);
      //       } 

      //     } else {

      //       if(arrFull.length > 0) {
      //         data.addRows(arrFull);
      //       }
      //       else {
      //         this.commonService.notifyError(this.locale.SORRY, "No Data " + value, 1500);
      //       } 
      //     }
      //     // Set chart options
      //     var options = {
      //       "width": 800,
      //       'height':300,
      //       hAxis: {
      //         title: 'Date'
      //       },
      //       vAxis: {
      //         title: ''
      //       }
      //     };
      //     // Instantiate and draw our chart, passing in some options.
      //     var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      //     chart.draw(data, options);
      //   }
      // );
    }
  }

  
  renderView(){
    this.getAllGroup();
    this.getAllNode();
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

    if(this.role == 1) {
      this.apiNodeService.listNode().subscribe(
        data => {
          this.nodes = data;
          
          this.paginations = this.nodes.slice(0, 10);
        }
      );
    }else {
      this.apiNodeService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.nodes = data;
          this.paginations = this.nodes.slice(0, 10);
        }
      );
    }
  }
  
  getAllProfile(){
    this.itemsProfile = [];
    if(this.role == 1) {
      this.apiNodeService.listProfile().subscribe(
        data => {
          this.nodeProfiles = data;
          
          data.forEach(e => {
            this.itemsProfile.push( {"text":e.name_profile,"id":e._id});
            this.ngSelectProfile.items = this.itemsProfile;
            // this.ngSelectAdd.items = this.items2;
            
          });
        }
      );
    }else {
      this.apiNodeService.getProfileByCompany(this.userData.id_company).subscribe(
        data => {
          this.nodeProfiles = data;
          data.forEach(e => {
            this.itemsProfile.push( {"text":e.name_profile,"id":e._id});
            this.ngSelectProfile.items = this.itemsProfile;
            // this.ngSelectAdd.items = this.items2;
          });
        }
      );
    }
  }

  getAllGroup() {
    
    if(this.role == 1) {
      this.items = [];
      this.items2 = [];
      this.apiGroupService.listGroups().subscribe(
        data => {
          this.groups = data;
          
          data.forEach(e => {
            this.items.push( {"text":e.group_name,"id":e._id});
            this.items2.push( {"text":e.group_name,"id":e._id});
            this.ngSelect.items = this.items;
            // this.ngSelectAdd.items = this.items2;
            
          });
        }
      );
    }else {
      this.items = [];
      this.items2 = [];
      this.apiGroupService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.groups = data;
          data.forEach(e => {
            this.items.push( {"text":e.group_name,"id":e._id});
            this.items2.push( {"text":e.group_name,"id":e._id});
            this.ngSelect.items = this.items;
            // this.ngSelectAdd.items = this.items2;
          });
        }
      );
    }
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

  getUpdateNode( updateNode: Node){
    this.updateActive = true;
    this.updateNode = {
      _id: updateNode._id,
      name_node: updateNode.name_node,
      status: updateNode.status,
      Manufacture: updateNode.Manufacture,
      Codec: updateNode.Codec,
      OS: updateNode.OS,
      id_group: updateNode.id_group,
      dev_eui: updateNode.dev_eui,
      app_eui: updateNode.app_eui,
      app_key: updateNode.app_key,
      Profile: updateNode.Profile,
      id_profile: updateNode.id_profile,
    };

    if(typeof this.updateNode.Profile != "undefined") {
      this.checkProfile =  true;  
    }

    let activeGroup = [];
    let activeProfile = [];
    let text="";
    if(this.updateNode.status == 'true') {
      text = 'Active';
    } else {
      text = "Not Active"
    }
    this.selectStatus = this.updateNode.status;

    this.apiGroupService.listGroups().subscribe(
      data => {
        this.groups = data;
        data.forEach(e => {
          
          if(this.updateNode.id_group == e._id){
            activeGroup.push({'text':e.group_name,"id":e._id});
            
            this.ngSelect.active = activeGroup;
            this.selectGroup = e._id ;
          }
        });
      }
    );

    this.apiNodeService.listProfile().subscribe(
      data => {
        this.nodeProfiles = data;
        
        data.forEach(e => {
          if(this.updateNode.id_profile == e._id){
            activeProfile.push({'text':e.name_profile,"id":e._id});
            this.ngSelectProfile.active = activeProfile;
            this.selectProfile = e._id ;
          }
        });
      }
    );
  };

  public filterItems(query) {
    return this.nodes.filter(function(el) {
        return el.name_node.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
  }
  
  getGeo(id,name){
    this.chart = id;
    this.nodes.forEach(e => {
      document.getElementById(e.name_node).style.color = "#007bff" ;  
    });
    
    document.getElementById(name).style.color = "#23527c" ;
    
    this.apiNodeService.getNodeByName(id).subscribe(
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
          this.long = this.nodeGPS.value.longitude; 
          this.mapZoom = 16;
          if ( data.value.latitude == 0 || data.value.longitude == 0 ||  Object.keys(data.value).length <1 ) {
            this.commonService.notifyError(this.locale.SORRY, " Latitude or Longitude = "+ 0, 1500);  
            this.mapZoom = 1;
          }
        }else {
          this.lat=0;
          this.long=0;
          this.commonService.notifyError(this.locale.SORRY, " "+ name +" No Local ", 1500);
          this.mapZoom = 1;
        }
      },
      error => { 
        this.lat=0;
        this.long=0;
        // console.log(this.lat);
        this.mapZoom = 1;
        this.commonService.notifyError(this.locale.SORRY, "Name ' "+ name +" 'No Local ", 1500);
        // console.log('Received an errror: ' + error.status);
      }
    );
  }

  public seachName (){
    if(this.role == 1) {
      this.apiNodeService.listNode().subscribe(
        data => {
          this.nodes = data;
          this.nodes = (this.filterItems(this.keySearch));
          this.paginations = this.nodes.slice(0, 10);
        }
      );
    }else {
      this.apiNodeService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.nodes = data;
          this.nodes = (this.filterItems(this.keySearch));
          this.paginations = this.nodes.slice(0, 10);
        }
      );
    }
    
    // this.apiNodeService.getNodeByName(this.keySearch).subscribe(
    //   data => {
    //     this.nodeData = data;
    //     this.lat = this.nodeData.message[1].value.latitude;
    //     this.long = this.nodeData.message[1].value.longitude;
    //     // console.log(data);
    //     // this.paginations = this.nodes.slice(0, 10);
    //   },
    //   error => { 
    //     this.lat=0;
    //     this.long=0;
    //     // console.log(this.lat);
    //     this.commonService.notifyError(this.locale.SORRY, "Name ' "+ this.keySearch +" ' doesn't exist", 2000);
    //     // console.log('Received an errror: ' + error.status);
    //   }
    // );
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
  public selectedProfile(value:any):void {
    this.selectProfile = value.id;
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

  getChart(id){
    // this.spinnerService.show();
    this.typeChart = "";
    $('.small-box').removeClass('active');
    $("#selectedDraw").val("null");
    $('#chart_div').hide();
    if(id) {
      this.apiNodeService.listGetsensor(id).subscribe(
        data => {
          this.getsensors = data;
          
          // if(data.length > 0){
          //   for (let index = 0; index < data.length; index++) {
          //     this.apiNodeService.listDraw(this.chart, data[index] ).subscribe(
          //       res => {
          //         this.temperatures = res;
          //       },
          //       err => {
          //         // this.commonService.notifyError(this.locale.SORRY, "No Data Sensor", 1500);
          //       }
          //     );  
          //   }
          // } else {
          //   // this.commonService.notifyError(this.locale.SORRY, "No Data Sensor", 1500);  
          // }
          // this.paginations = this.nodes.slice(0, 10);
        },
        error => { 
          this.commonService.notifyError(this.locale.SORRY, "Error No Data Sensor", 1500);   
          this.getsensors= [];
        }
      );
    }else {
      // this.commonService.notifyError(this.locale.SORRY, "Enter name Node", 1500);    
    }
  }
  
  nameExists2(value) {
    return this.nodes.some(function(el) {
      return el.name_node.toLowerCase() == value.toLowerCase();
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
    // else if ( !this.node2.Codec || !this.node2.Codec.trim() ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.Codec_is_required, 1500);
    // }
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
      this.node2.id_profile = this.selectProfile;
      this.node2.status = this.selectStatus;
      
      this.apiNodeService.createNode(this.node2).subscribe(
        response => {
          this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
          this.node2 = new Node;
          this.renderView();
          $("#add").click();
          
        },
        err => {
          this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
        }
      );
    }
  }

  addActive(){
    this.addactive = true;
    this.updateActive = false;
    this.getAllGroup();
    this.getAllProfile();
  }
  
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  
  // drawChart (){
  // }

}
