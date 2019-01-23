import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { User } from '../../api/models/user';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../shared/common.service';

import { UsersService } from '../../api/services/users.service';


import { CompaniesService } from '../../api/services/companies.service';
import { Company } from '../../api/models/company';

import { RolesService } from '../../api/services/roles.service';
import { Role } from '../../api/models/role';

import { Locale } from '../../locale';

import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';
import * as CryptoJS from 'crypto-js';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
// import { window } from 'rxjs/operators';

import { NodeService } from '../../api/services/node.service';
import { Alarm } from '../../api/models/alarm';



@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public user: User = new User();
  public updateUser: User = new User();
  public users: User[] = [];
  public keySearch:string ="";
  
  roles: Role[] = [];
  companies: Company[] = [];
  public allIdChecked = [];


  public items:any = [] ;
  public items2:any = [] ;
  public itemUsers:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private co= "";
  private ro= "";

  activeCompany:Array<any>=[];
  activeRole:Array<any>=[];

  encrypted = "";
  decrypted ="";
  key="dfmsecret";
  public alarms: Alarm[] = [];
  // contentArray = [];
  public returnedArray= [];
  role = null;
  checkUpdate = false;

	pushRightClass = 'push-right';
	isMobile: Boolean = false;
	lastClick: String = '';

  username: String = sessionStorage.getItem('name_user');
	userString = sessionStorage.getItem('user');
	userData = JSON.parse(this.userString);
	hostName;
  constructor (
      public router: Router,
	  private apiUserService: UsersService,
	  private apiNodeService: NodeService,
      private apiRoleService: RolesService,
      private apiCompanyService: CompaniesService,
      private commonService: CommonService,
      private modalService: BsModalService,
      private locale: Locale,
    
    )
  {
    this.router.events.subscribe(val => {
        if (
            val instanceof NavigationEnd &&
            window.innerWidth <= 992 &&
            this.isToggled()
        ) {
            this.toggleSidebar();
        }
    });
  }

	
  
  ngOnInit() {
      if ($(window).width() < 992) {
          this.isMobile = true;
      }
		this.renderView();
			
			
			
			
	}
	
	@ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('role') ngSelect2: SelectComponent;
  
  notShow(){
      $(".bell").class("display:none");
  }
	
  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }

  getAllAlarm(){
    this.apiNodeService.listAlarm().subscribe(
      data => {
        this.alarms = data;
        
      }
    );
  }

  closeMenu() {
      $('#open_menu_btn').click();
      this.lastClick = '';
  }

  closeProfile() {
      $('#profile_btn').click();
      this.lastClick = '';
  }

    checkOpen(btn) {
        if (this.lastClick === 'open_menu_btn') {
            if (btn === 'open_menu_btn') {
                this.lastClick = '';
            } else if (btn === 'profile_btn') {
                $('#open_menu_btn').click();
                this.lastClick = 'profile_btn';
            }
        } else if (this.lastClick === 'profile_btn') {
            if (btn === 'open_menu_btn') {
                $('#profile_btn').click();
                this.lastClick = 'open_menu_btn';
            } else if (btn === 'profile_btn') {
                this.lastClick = '';
            }
        } else {
            this.lastClick = btn;
        }
    }

		renderView(){
			
			if( this.checkUpdate == true ) {
				this.getAllCompany();
				this.getAllRole();
			}
			this.getAllAlarm();
		};
		
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
						
						if(this.ro === e.role_name) {
							this.user.id_role = e._id;
						}

						this.items2.push({ "id":e._id ,"text":e.role_name});
						this.ngSelect2.items = this.items2;
					});
				}
			);
		};
		
	
		selected(value:any):void {
			this.co = value.text;
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
	
		selected2(value:any):void {
			this.ro = value.text;
			
			this.apiRoleService.listRoles().subscribe(
				data => {
					this.roles = data;
					data.forEach(e => {
						// console.log(element.name_company);
						if(this.ro === e.role_name) {
							this.updateUser.id_role = e._id;
						}
					});
				}
			);
		}
	
		getUpdateUser( updateUser: User){
			this.checkUpdate = true;
			this.updateUser = {
				_id: updateUser._id,
				name_user: updateUser.name_user,
				email: updateUser.email,
				password: updateUser.password,
				id_company: updateUser.id_company,
				id_role: updateUser.id_role
			};
			
			this.apiCompanyService.listCompanies().subscribe(
				data => {
					this.companies = data;
					data.forEach(e => {
						
						if(this.updateUser.id_company == e._id){
							this.activeCompany.push({'text':e.name_company,"id":e.name_company});
							// console.log(this.activeCompany);
							this.ngSelect.active = this.activeCompany;
							this.co = e.name_company;
						}
	
					});
					
				}
			);
	
			this.apiRoleService.listRoles().subscribe(
				data => {
					this.roles = data;
					
					data.forEach(e => {
						
						if(this.updateUser.id_role == e._id){
							this.activeRole.push({'text':e.role_name,"id":e.role_name});
							// console.log(this.activeRole);
							this.ro=e.role_name;
							this.ngSelect2.active = this.activeRole;
						}
						
					});
				}
			);
	
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
	
		saveUser() {
	
			
			
			if ( !this.updateUser.name_user || !this.updateUser.name_user.trim() ) {
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
			} 
			else if (this.ro === "" ) {
				this.commonService.notifyError(this.locale.SORRY, this.locale.ROLE_IS_REQUIRED, 1500);
			} 
			else if( this.co === "" ) {
				this.commonService.notifyError(this.locale.SORRY, this.locale.COMPANY_IS_REQUIRED, 1500);
			}
			else {
				// console.log(this.updateUser);
	
				this.encrypted = CryptoJS.AES.encrypt(this.updateUser.password, this.key).toString();
				this.updateUser.password = this.encrypted;
				
				this.apiUserService.updateUser(this.updateUser)
					.subscribe(
						response => {
							this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success , 1500);
							$('#closeModal').click();
							
						},
						err => {
							this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
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

}
