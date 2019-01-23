import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

import { UsersService } from '../../../api/services/users.service';
import { User } from '../../../api/models/user';

import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';

import { RolesService } from '../../../api/services/roles.service';
import { Role } from '../../../api/models/role';

import { Locale } from '../../../locale';
import { SelectComponent } from 'ng2-select';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent implements OnInit {

  public user: User = new User();
  public updateUser: User = new User();
  public editUser: User;
  
  users: User[] = [];

  roles: Role[] = [];
  companies: Company[] = [];
  encrypted = "";
  key="dfmsecret";

  public items:any = [] ;
  public items2:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  private co= "";
  private ro= "";
  role = null;
  constructor(
    private router: Router,
    private apiUserService: UsersService,
    private apiRoleService: RolesService,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ){ 
    this.role = this.commonService.getRoleOfUser();
   }

  @ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('role') ngSelect2: SelectComponent;

  ngOnInit() {
    if(this.role !=1 ) {
      this.router.navigate(['/404']);
    }
    this.renderView();
    
  }

  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    this.co = value.text;
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        
        data.forEach(e => {
          if(this.co === e.name_company) {
            this.user.id_company = e._id;
            // console.log(this.user.id_company);
          }
        });
      }
    );
    
  }
  public selected2(value:any):void {
    this.ro = value.text;

    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;

        data.forEach(e => {
          // console.log(element.name_company);

          if(this.ro === e.role_name) {
            this.user.id_role = e._id;
          }
          
        });
        
      }
    );
    
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

  addNewUser() {
    this.user = new User();
    
  }

  renderView() {
    this.getAllRole();
    this.getAllCompany();
    this.getAllUser();
    // console.log(this.items);
    
  }

  getAllRole() {
    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;

        data.forEach(e => {
          // console.log(element.name_company);

          if(this.ro === e.role_name) {
            this.user.id_role = e._id;
          }
          this.items2.push( {"text":e.role_name,"id":e._id});
          // this.items = e.name_company;
          this.ngSelect2.items = this.items2;
          
        });
        
      }
    );
  }
  

  getAllCompany() {
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        
        data.forEach(e => {
          // console.log(element.name_company);
          if(this.co === e.name_company) {
            this.user.id_company = e._id;
          }

          this.items.push( {"text":e.name_company,"id":e._id});
          // this.items = e.name_company;
          this.ngSelect.items = this.items;
          
        });
        
      }
    );
    
  }

  idExists(value) {
    return this.users.some(function(el) {
      return el._id === value;
    }); 
  }

  nameExists(value:string) {
    
    return this.users.some(function(el) {
      return el.name_user.toLowerCase() === value.toLowerCase();
    }); 
  }

  emailExists(value) {
    return this.users.some(function(el) {
      return el.email === value;
    }); 
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getAllUser() {
    this.apiUserService.listUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  };

  saveUser() {
    
    // if (this.user._id < 1 || !this.user._id  ) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // }
    // else if(this.idExists(this.user._id) == true) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);  
    // }
    if( this.co == "" ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
    }
    else if ( !this.user.name_user  || !this.user.name_user.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.USER_NAME_IS_REQUIRED, 1500);
    }
    else if (this.user.name_user.trim().length < 3 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.User_name_length, 1500);
    }  
    else if(this.nameExists(this.user.name_user.trim()) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.User_Name_Existed, 1500);  
    }
    else if ( !this.user.email || !this.user.email.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.EMAIL_IS_REQUIRED, 1500);
    }
    else if(this.validateEmail(this.user.email) == false ){
      this.commonService.notifyError(this.locale.SORRY, this.locale.Incorrect_Email_Format, 1500);
    }
    else if(this.emailExists(this.user.email) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Email_Existed, 1500);  
    }
    else if ( !this.user.password ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.PASSWORD_IS_REQUIRED, 1500);
    } else if (this.ro === "" ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.ROLE_IS_REQUIRED, 1500);
    }

    else {

      // console.log(this.user);
      this.encrypted = CryptoJS.AES.encrypt(this.user.password, this.key).toString();
      this.user.password = this.encrypted;
      this.apiUserService.createUser(this.user)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.renderView();
            this.user= new User;
            this.router.navigate(['/user']);
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
  }

}
