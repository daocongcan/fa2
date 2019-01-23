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

import { RolesService } from '../../../../api/services/roles.service';
import { Role } from '../../../../api/models/role';

import { Locale } from '../../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-listrole',
  templateUrl: './listrole.component.html',
  styleUrls: ['./listrole.component.css']
})
export class ListroleComponent implements OnInit {
  public role: Role = new Role();
  public updateRole: Role = new Role();
  public editRole: Role;
  public roles: Role[] = [];
  public keySearch:string ="";
  
  public isUpdate = false;
  allIdChecked = [];

  public items:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  role1 = null;
  constructor(
    private router: Router,
    private apiRoleService: RolesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ) {
    this.role1 = this.commonService.getRoleOfUser();
   }

  ngOnInit() {
    this.renderView();
  }
  
  @ViewChild('role') ngSelect: SelectComponent;

  renderView(){
    if(this.role1 !=1 ) {
      this.router.navigate(['/404']);
    }
    this.getAllRole();
  }

  getAllRole(){
    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;
      }
    );
  };

  deleteAll(){

    if(this.allIdChecked.length>0) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiRoleService.deleteRole(this.allIdChecked[index]).subscribe(
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
      this.commonService.notifyError(this.locale.SORRY, "Selected Role delete", 1500);
    }
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

  
  getUpdateRole( updateRole: Role){
    this.updateRole = {
      _id: updateRole._id,
      role_name: updateRole.role_name,
    };
    this.isUpdate = true;
  };

  nameExists(value) {
    return this.roles.some(function(el) {
      return el.role_name.toLowerCase() === value.toLowerCase();
    }); 
  }

  updateExists(value,id) {
    let count = 1;
    this.roles.forEach(el => {
      if( el.role_name.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
      } else if ( el.role_name.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
  }

  saveRole() {
     
    if(this.isUpdate) {

      if ( !this.updateRole.role_name || !this.updateRole.role_name.trim()  ) {
        this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
      }
      else if (this.updateExists(this.updateRole.role_name, this.updateRole._id ) > 1  ) {
        this.commonService.notifyError(this.locale.SORRY, this.locale.Role_Existed, 1500);
      }
      else {
        this.apiRoleService.updateRole(this.updateRole)
          .subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success, 1500);
              this.renderView();
              
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
            }
          );
      }

    }else {

      if ( !this.role.role_name || !this.role.role_name.trim() ) {
        this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
      }
      else if (this.nameExists(this.role.role_name) == true  ) {
        this.commonService.notifyError(this.locale.SORRY, this.locale.Role_Existed, 1500);
      }
      else if (this.role._id < 1 || this.role._id == undefined ) {
        this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
      }
      else {
        this.apiRoleService.createRole(this.role)
          .subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
              
              this.renderView();
              $("#myModal").click();
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
            }
          );
      }

    }
  }
 
}
