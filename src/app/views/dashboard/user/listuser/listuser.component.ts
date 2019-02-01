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

import { UsersService } from '../../../../api/services/users.service';
import { User } from '../../../../api/models/user';

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';

import { RolesService } from '../../../../api/services/roles.service';
import { Role } from '../../../../api/models/role';

import { Locale } from '../../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';
import * as CryptoJS from 'crypto-js';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  public user: User = new User();
  public updateUser: User = new User();
  public editUser: User;
  public users: User[] = [];
  public keySearch:string ="";
  
  roles: Role[] = [];
  companies: Company[] = [];
  public allIdChecked = [];

  public items:any = [] ;
  public items2:any = [{'text':'Supper Admin',"id":1},{'text':'Admin',"id":2},{'text':'User',"id":3}] ;
  public itemUsers:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private co="";
  private ro ;

  activeCompany:Array<any>=[];
  activeRole:Array<any>=[];

  encrypted = "";
  decrypted ="";
  key="dfmsecret";
  checkEdit = false ;
  checkAdd = false ;
  // contentArray = [];
  public returnedArray= [];
  role = null;
  
  userString = sessionStorage.getItem('user');
  userData = JSON.parse(this.userString);
  
  itemsCompany = [];
  itemsRole = [{'text':'Admin',"id":2},{'text':'User',"id":3}];

  order: string = 'name_user';
  reverse: boolean = false;
  sortedCollection: any[];

  constructor(
    private router: Router,
    private apiUserService: UsersService,
    private apiRoleService: RolesService,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private orderPipe: OrderPipe
  ) {
    this.role = this.commonService.getRoleOfUser();
    this.sortedCollection = orderPipe.transform(this.returnedArray, 'name_user');

  }

  ngOnInit() {
    if( this.role == 3 ) {
      this.router.navigate(['/404']);
    }
    this.renderView();
  }

  @ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('role') ngSelect2: SelectComponent;
  @ViewChild('search') ngSelect3: SelectComponent;
  
  renderView(){
    this.getAllUser();
    this.getAllCompany();
    this.getAllRole();
  };

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.users.slice(startItem, endItem);
    // console.log(this.users);
  }

  getAllUser() {
    if(this.role != 1) {
      this.apiUserService.getUserByCompany(this.userData.id_company).subscribe(
        data => {
          this.users = data;
          
          this.returnedArray = this.users.slice(0, 10);
          
          this.users.forEach( e => {
            this.itemUsers.push({'text':e.name_user,"id":e._id});
            // this.items = e.name_company;
            // this.ngSelect3.items = this.itemUsers;
          });
        }
      );
    }else {
      this.apiUserService.listUsers().subscribe(
        data => {
          this.users = data;
          
          this.returnedArray = this.users.slice(0, 10);
          // console.log(this.returnedArray);
          this.users.forEach( e => {
            this.itemUsers.push({'text':e.name_user,"id":e._id});
            // this.items = e.name_company;
            // this.ngSelect3.items = this.itemUsers;
          });
        }
      );
    }
  };

  checkedID(id:number){
    this.allIdChecked.push(id);
   // console.log(this.allIdChecked);
  }

  getAllCompany() {
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          this.items.push({'text':e.name_company,"id":e._id});
          this.ngSelect.items = this.items;
        });
        
      }
    );   
  }

  getAllRole(){
    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;
        data.forEach(e => {
          // console.log(element.name_company);
          if(this.ro === e.role_name) {
            this.user.id_role = e._id;
          }
          // this.items2.push( e.role_name);
          // this.items = e.name_company;
          // this.ngSelect2.items = this.items2;
        });
      }
    );
  };
  
  public selectedSearch(value:any):void {
    let name = value.text;
    this.users=[];
    this.apiUserService.listUsers().subscribe(
      data => {
        // console.log(data.body);
        data.forEach(e => {
          if(e.name_user == name){
            this.users.push(e);
          }              
        });
      },
      err => {
        this.commonService.notifyError(this.locale.SORRY, "Data error", 1500);
      }
    ); 
      // console.log(this.users);
  }

  public selected(value:any):void {
    this.co = value.id;
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          if(this.co === e.name_company) {
            this.updateUser.id_company = e._id;
            // console.log(this.user.id_company);
          }
        });
      }
    );
  }

  public selected2(value:any):void {
    this.ro = value.id;
    // this.apiRoleService.listRoles().subscribe(
    //   data => {
    //     this.roles = data;
    //     data.forEach(e => {
    //       // console.log(element.name_company);
    //       if(this.ro === e.role_name) {
    //         this.updateUser.id_role = e._id;
    //       }
    //     });
    //   }
    // );
  }

  getCheckAll(e){
    let id = [];
    if (e.target.checked) {
      $('.checkbox:checkbox').each(function() {
        this.checked = true;
        id.push( $(this).attr('id'));
      });
    }
    this.allIdChecked.push(id);  
    // console.log(this.allIdChecked);
  }

  getIdChecked(e,id){
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    // console.log(this.allIdChecked);
  }

  deleteAll(){
    // console.log(this.allIdChecked);
    if(this.allIdChecked.length > 0 ) {
      if(confirm(this.locale.Are_you_sure_to_delete)){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiUserService.deleteUser(this.allIdChecked[index]).subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Delete_success, 1500);
              this.renderView();
              this.allIdChecked=[];
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, "Not Delete", 1500);
            }
          )
        }
      }
    }else {
      this.commonService.notifyError(this.locale.SORRY, "Selected user delete", 1500);
    }
  };

  searchUser(){
    this.users=[];
    // console.log(this.keySearch);
    if( this.keySearch === undefined || this.keySearch === "" ){
      this.commonService.notifyError(this.locale.SORRY, "Enter name", 1500);
      this.renderView();
    }else {
      this.apiUserService.listUsers()
        .subscribe(
          data => {
            // console.log(data.body);
            this.users = data;
            data.forEach(e => {
              if(e.name_user == this.keySearch){
                this.users.push(e);
              }              
            });
            // this.companies = data;
            // this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
            // $('#closeModal').click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Data error", 1500);
          }
        );   
    }
  }

  getUpdateUser( updateUser: User){

    this.checkEdit = true;
    this.updateUser = {
      _id: updateUser._id,
      name_user: updateUser.name_user,
      email: updateUser.email,
      password: updateUser.password,
      id_company: updateUser.id_company,
      id_role: updateUser.id_role
    };
    
    this.items = [];
    this.activeCompany=[];

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          if(this.role == 2) {
            if(this.updateUser.id_company == e._id){
              this.activeCompany.push({'text':e.name_company,"id":e._id});
              this.ngSelect.active = this.activeCompany;
              this.items.push({'text':e.name_company,"id":e._id});
              this.ngSelect.items = this.items;
              this.co=e._id;
            }
          }else {
            if(this.updateUser.id_company == e._id){
              this.activeCompany.push({'text':e.name_company,"id":e._id});
              this.ngSelect.active = this.activeCompany;
              this.co=e._id;
            }
            this.items.push({'text':e.name_company,"id":e._id});
            this.ngSelect.items = this.items;
          }
        });
      }
    );
    
    this.activeRole = [];
    if(this.role == 2 ){
      this.items2 = [{'text':'Admin',"id":2},{'text':'User',"id":3}] ;
    }

    this.items2.forEach(e => {
      if(this.updateUser.id_role == e.id){
        this.activeRole.push({'text':e.text,"id":e.id});
        this.ro = e.id;
        this.ngSelect2.active = this.activeRole;
      }
    });

  };

  nameExists(value,id) {
    let count = 1;
    this.users.forEach(el => {
      if( el.name_user.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
      } else if ( el.name_user.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
  }


  emailExists(value,id) {
    let count = 1;
    this.users.forEach(el => {
      if( el.email.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
      } else if ( el.email.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  activeAdd() {
    this.items = [];
    this.checkAdd = true;
    this.checkEdit = false;
    this.companies.forEach(e => {
      if(this.role == 2) {
        this.items2 = [{'text':'Admin',"id":2},{'text':'User',"id":3}];
        if( this.userData.id_company == e._id ) {
          this.items.push({'text':e.name_company,'id':e._id});
          this.ngSelect.items = this.items;
        }
      }else {
        this.items.push({'text':e.name_company,'id':e._id});
        this.ngSelect.items = this.items;
      }
    });
    
  }

  update() {
    if( this.co === "" ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
    }
    else if ( !this.updateUser.name_user || !this.updateUser.name_user.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.USER_NAME_IS_REQUIRED, 1500);
    }
    else if (this.nameExists(this.updateUser.name_user,this.updateUser._id) > 1 ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.User_Name_Existed, 1500);
    } 
    else if ( !this.updateUser.email || !this.updateUser.email.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.EMAIL_IS_REQUIRED, 1500);
    } 
    else if (this.emailExists(this.updateUser.email,this.updateUser._id ) > 1) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Email_Existed, 1500);
    } 
    
    else if (this.validateEmail(this.updateUser.email) == false) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Incorrect_Email_Format, 1500);
    } 
    
    else if ( !this.updateUser.password ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.PASSWORD_IS_REQUIRED, 1500);
    } else if (this.ro === "" ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.ROLE_IS_REQUIRED, 1500);
    }
    else {
      // console.log(this.updateUser);
      this.encrypted = CryptoJS.AES.encrypt(this.updateUser.password, this.key).toString();
      this.updateUser.password = this.encrypted;

      this.updateUser.id_role = this.ro;
      this.updateUser.id_company = this.co;
      console.log(this.updateUser);
      this.apiUserService.updateUser(this.updateUser)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success , 1500);
            this.items = [];
            this.renderView();
            $('#update').click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
  }

  public filterItems(query) {
    return this.users.filter(function(el) {
        return el.name_user.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
  }

  public seachName (){
    // this.apiUserService.listUsers().subscribe(
    //   data => {
    //     this.users = data;
    //     this.users = (this.filterItems(this.keySearch));
    //     this.returnedArray = this.users.slice(0, 10);
    //   }
    // );
    if(this.role == 2) {
      this.apiUserService.getUserByCompany(this.userData.id_company).subscribe(
        data => {
          this.users = data;
          this.users = (this.filterItems(this.keySearch));
          this.returnedArray = this.users.slice(0, 10);
        }
      );
    }else {
      this.apiUserService.listUsers().subscribe(
        data => {
          this.users = data;
          this.users = (this.filterItems(this.keySearch));
          this.returnedArray = this.users.slice(0, 10);
        }
      );
    }
  }

  idExists(value) {
    return this.users.some(function(el) {
      return el._id === value;
    }); 
  }

  nameExists2(value:string) {
    return this.users.some(function(el) {
      return el.name_user.toLowerCase() === value.toLowerCase();
    }); 
  }

  emailExists2(value) {
    return this.users.some(function(el) {
      return el.email === value;
    }); 
  }

  add() {
    
    
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
    else if(this.nameExists2(this.user.name_user.trim()) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.User_Name_Existed, 1500);  
    }
    else if ( !this.user.email || !this.user.email.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.EMAIL_IS_REQUIRED, 1500);
    }
    else if(this.validateEmail(this.user.email) == false ){
      this.commonService.notifyError(this.locale.SORRY, this.locale.Incorrect_Email_Format, 1500);
    }
    else if(this.emailExists2(this.user.email) == true) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Email_Existed, 1500);  
    }
    else if ( !this.user.password ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.PASSWORD_IS_REQUIRED, 1500);
    } 
    else if (this.ro === "" ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.ROLE_IS_REQUIRED, 1500);
    }

    else {

      this.encrypted = CryptoJS.AES.encrypt(this.user.password, this.key).toString();
      this.user.password = this.encrypted;
      this.user.id_company = this.co;
      this.user.id_role = this.ro;

      this.apiUserService.createUser(this.user)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
            this.renderView();
            this.user= new User;
            this.router.navigate(['/user']);
            $('#add').click();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );
    }
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
