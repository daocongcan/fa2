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

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';

import { GroupsService } from '../../../../api/services/groups.service';
import { Group } from '../../../../api/models/group';

import { NodeService } from '../../../../api/services/node.service';
import { Node } from '../../../../api/models/node';

import { Locale } from '../../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.scss']
})
export class ListgroupComponent implements OnInit {

  public group:Group = new Group();

  public updateGroup: Group = new Group();
  public editGroup: Group;
  
  public groups: Group[] = [];
  public nodes: Node[] = [];
  public nodesByGroup: Node[] = [];

  public keySearch:string ="";
  
  companies: Company[] = [];

  public items:any = [] ;
  public itemGroups:any = [];
  selectCompany;
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  
  allIdChecked = [];
  delete = [];

  paginations = [];
  checkAdd = false;
  checkUpdate = true;
  role = null;
  userString = sessionStorage.getItem('user');
  userData = JSON.parse(this.userString);

  order: string = 'group_name';
  reverse: boolean = false;
  sortedCollection: any[];

  constructor(
    private router: Router,
    private apiGroupService: GroupsService,
    private apiCompanyService: CompaniesService,
    private apiNodeService: NodeService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private orderPipe: OrderPipe
  ) {
    this.role = this.commonService.getRoleOfUser();
    this.sortedCollection = orderPipe.transform(this.paginations, 'group_name');
   }

  ngOnInit() {
    this.renderView();
  }

  @ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('search') ngSelect2: SelectComponent;

  renderView(){
    this.getAllGroup();
    this.getAllCompany();
    this.getAllNode();
  };

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginations = this.groups.slice(startItem, endItem);
  }

  getAllGroup() {
    
    if(this.role == 1){
      this.apiGroupService.listGroups().subscribe(
        data => {
          this.groups = data;
          this.paginations = this.groups.slice(0, 10);
  
          this.groups.forEach( e => {
            this.itemGroups.push( {"text":e.group_name,"id":e._id});
            // console.log(this.items);
            // this.items = e.name_company;
            // this.ngSelect2.items = this.itemGroups;
          });
          
        }
      );
    } else {

      this.apiGroupService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.groups = data;
          this.paginations = this.groups.slice(0, 10);
          
          this.groups.forEach( e => {
            this.itemGroups.push( {"text":e.group_name,"id":e._id});
            // console.log(this.items);
            // this.items = e.name_company;
            // this.ngSelect2.items = this.itemGroups;
          });
          
        }
      );
    }

  };

  getAllNode() {
    // this.apiNodeService.listNode().subscribe(
    //   data => {
    //     this.nodes = data;
    //   }
    // );
  };

  viewListNodeByGroup(idGroup){
    this.nodes = [];
    this.apiNodeService.getByGroup(idGroup).subscribe(
      data => {
        data.forEach(e => {
          if(e.id_group == idGroup) {
            this.nodes.push(e);
          }
        });
      },
      error => {
        // this.commonService.notifyError(this.locale.SORRY, "No Data", 1500);
      }
    );
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

  selectedSearch(value:any):void {
    this.groups=[];
    
    this.apiGroupService.listGroups().subscribe(
      data => {
        data.forEach( e => {
            if(value.id == e._id){
              this.groups.push(e) ;
            }      
        });
      }
    );
  }

  deleteAll(){
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiGroupService.deleteGroup(this.allIdChecked[index]).subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Delete_success , 1500);
              
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
      this.commonService.notifyError(this.locale.SORRY, "Selected Group delete", 1500);
    }
  };

  getUpdateGroup( updateGroup: Group){
    this.checkUpdate = true;
    this.updateGroup = {
      _id: updateGroup._id,
      group_name: updateGroup.group_name,
      id_company: updateGroup.id_company,
    };

    let activeGroup = [];
    
    // this.ngSelect.active =  { "id": updateGroup.id_company };
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          
          if(this.updateGroup.id_company == e._id){
            activeGroup.push({'text':e.name_company,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelect.active = activeGroup;
            this.selectCompany = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );

  };
  
  nameExists(value,id) {
    let count = 1;
    this.groups.forEach(el => {
      if( el.group_name.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
        
      } else if ( el.group_name.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    
    return count;
    
  }

  save() {
    
    if ( !this.updateGroup.group_name || !this.updateGroup.group_name.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }
    else if ( this.nameExists(this.updateGroup.group_name, this.updateGroup._id ) > 1 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }
    else if( this.selectCompany === 0 || !this.selectCompany
      || this.selectCompany === null 
    ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
    }
    else {
      
      this.updateGroup.id_company = this.selectCompany;
      // console.log(this.updateGroup);
      this.apiGroupService.updateGroup(this.updateGroup)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success, 1500);
            this.renderView();
            this.items = [];
            $("#update").click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
  }

  idExists(value) {
    return this.groups.some(function(el) {
      return el._id === value;
    }); 
  }

  nameExists2(value) {
    return this.groups.some(function(el) {
      return el.group_name.toLowerCase() === value.toLowerCase();
    }); 
  }

  add() {
    
    // if ( !this.group._id ||  this.group._id <1 ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }
    // else if (this.idExists(this.group._id) == true) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }
    if ( !this.group.group_name || !this.group.group_name.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    }
    else if (this.nameExists2(this.group.group_name) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    }
    else if( this.selectCompany === 0 || !this.selectCompany
      || this.selectCompany === null 
    ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED , 1500);
    }
    else {
      // console.log(this.group);
      this.group.id_company = this.selectCompany;
      this.apiGroupService.createGroup(this.group)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.group = new Group ;
            this.items =[];  
            this.ngSelect.active = null;
            this.selectCompany = null;
            this.renderView();
            $("#add").click();
            
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
  }

  public filterItems(query) {
    return this.groups.filter(function(e) {
        return e.group_name.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  public seachName (){

    if(this.role == 1) {
      this.apiGroupService.listGroups().subscribe(
        data => {
          this.groups = data;
          this.groups = (this.filterItems(this.keySearch));
          this.paginations = this.groups.slice(0, 10);
        }
      );
    }else {
      this.apiGroupService.getByCompany(this.userData.id_company).subscribe(
        data => {
          this.groups = data;
          this.groups = (this.filterItems(this.keySearch));
          this.paginations = this.groups.slice(0, 10);
        }
      );
    }  

  }

  activeAdd(){
    this.checkAdd = true;
    this.checkUpdate = false;
    this.getAllCompany();
  }
  
  
  public selected(value:any):void {
    this.selectCompany = value.id;
    
  }

  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public removed(value:any):void {
    // console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    // console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }

  getByGroup(id){
    this.apiNodeService.getByGroup(id).subscribe(
      data => {
        this.nodesByGroup = data;
      }
    )
  };

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
