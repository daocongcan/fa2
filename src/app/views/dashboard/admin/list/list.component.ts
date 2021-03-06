import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../dashboard.service';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/common.service';
import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';
import { Locale } from '../../../../locale';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { OrderPipe } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public company: Company = new Company();
  public updateCompany: Company = new Company();
  companies: Company[] = [];
  allIdChecked = [];
  public keySearch = "" ;
  paginations = [];
  role=null;
  checkAdd = false;

  order: string = 'name_company';
  reverse: boolean = false;
  sortedCollection: any[];

  currentPage = 1;
  smallnumPages = 0;
  p: number = 1;
  rowRecores = [10,20,30,40,50];
  numberPage: number = 10;

  constructor(
    private router: Router,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private dashboardService: DashboardService,
    private orderPipe: OrderPipe
  ){
    this.role = this.commonService.getRoleOfUser();
    this.sortedCollection = orderPipe.transform(this.paginations, 'name_company');
   }

  ngOnInit() {
    if(this.role !=1 ) {
      this.router.navigate(['/404']);
    }
    this.renderView()
  }

  renderView() {
    this.getAllCompanies();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginations = this.companies.slice(startItem, endItem);
  }

  getUpdateCompany(editCompany: Company){
    this.updateCompany = {
      _id: editCompany._id,
      name_company: editCompany.name_company,
      address: editCompany.address,
      tax_number: editCompany.tax_number,
      phone: editCompany.phone
    };
  };

  deleteCompany(companyId){
    if(confirm("Are you sure to delete")) {
      this.apiCompanyService.deleteCompany(companyId)
      .subscribe(
        response => {
          this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success, 1500);
          $('#closeModal').click();
          this.renderView();
        },
        err => {
          this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
        }
      );
    }
  };

  getAllCompanies(){
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        this.paginations = this.companies.slice(0, 10);
      }
    );
  };

  searchCompany(){
    if((document.getElementById('search') as HTMLInputElement).value === ''){
      this.commonService.notifyError(this.locale.SORRY, "Enter name company", 1500);
    }else {
    let  key = (document.getElementById('search') as HTMLInputElement).value;
      this.apiCompanyService.searchCompanyResponse(key)
        .subscribe(
          data => {
            this.companies = data.body;
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error, 1500);
          }
        );   
    }
  }

  getIdChecked(e,id){
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
  }
  
  deleteAll(){
    if( this.allIdChecked.length > 0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiCompanyService.deleteCompany(this.allIdChecked[index]).subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Delete_success , 1500);
              this.renderView();
              this.allIdChecked=[];
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
            }
          )
        }
      }
    }else {
      this.commonService.notifyError(this.locale.SORRY, "Selected company delete", 1500);
    }
  };

  nameExists(value,id) {
    let count = 1;
    this.companies.forEach( el => {
      if( el.name_company.toLowerCase() == value.toLowerCase() &&  el._id == id ){
        count = 1;
      } else if ( el.name_company.toLowerCase() == value.toLowerCase() &&  el._id != id ) {
        count += 1;
        return count;
      }
    }); 
    return count;
  }

  update(){
    
    if ( !this.updateCompany.name_company || !this.updateCompany.name_company.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    } 
    else if (this.nameExists(this.updateCompany.name_company,this.updateCompany._id) >1 ){
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    } 
    else if ( !this.updateCompany.address || !this.updateCompany.address.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Address_is_required, 1500);
    } else if ( !this.updateCompany.tax_number ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Tax_Number_is_required, 1500);
    } else if ( !this.updateCompany.phone) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Phone_is_required , 1500);
    } else {
      
      
      this.apiCompanyService.updateCompany(this.updateCompany)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Update_success, 1500);
            $('#closeModal').click();
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
  }

  idExists(value) {
    return this.companies.some(function(el) {
      return el._id === value;
    }); 
  }

  nameExists2(value) {
    return this.companies.some(function(el) {
      return el.name_company.toLowerCase() == value.toLowerCase();
    }); 
  }

  add() {
    if ( !this.company.name_company || !this.company.name_company.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    } 
    else if (this.nameExists2(this.company.name_company) == true){
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    } 
    else if ( !this.company.address || !this.company.address.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Address_is_required, 1500);
    } else if ( !this.company.tax_number  ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Tax_Number_is_required, 1500);
    } else if ( !this.company.phone  ) {
      this.commonService.notifyError(this.locale.SORRY,  this.locale.Phone_is_required, 1500);
    } else {
      
      this.apiCompanyService.createCompany(this.company)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success , 1500);
            $('#add').click();
            this.company = new Company;
            this.renderView();
            
            
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
  }

  public filterItems(query) {
    return this.companies.filter(function(el) {
        return el.name_company.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
  }

  public seachName (){
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        this.companies = (this.filterItems(this.keySearch));
        this.paginations = this.companies.slice(0, 10);
      }
    );
  }

  activeAdd(){
    this.checkAdd = true;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onPageChange(number: number) {
    this.p = number;
    this.currentPage = number;
    
  }

  onChangeRow(value:number){
    this.p=1;
    this.numberPage = value;
  }


}
