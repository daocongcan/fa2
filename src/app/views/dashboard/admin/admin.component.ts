import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../dashboard.service';

import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';
import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';


import { Locale } from '../../../locale';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public company: Company = new Company();
  
  public updateCompany: Company = new Company();
  isCreateCompany: Boolean = true;
  public editCompany: Company;
  
  companies: Company[] = [];
  role = null;
  constructor(
    private router: Router,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private dashboardService: DashboardService,
  ){ 
    this.role = this.commonService.getRoleOfUser();
   }

  ngOnInit() {
    if(this.role !=1 ) {
      this.router.navigate(['/404']);
    }
    this.renderView();
  }

  addnewCompany() {
    this.company = new Company();
    this.isCreateCompany = true;
  }

  getUpdateCompany(editCompany: Company){
    this.updateCompany = {
      name_company: editCompany.name_company,
      address: editCompany.address,
      tax_number: editCompany.tax_number,
      phone: editCompany.phone
    };
    this.isCreateCompany = false;
  };

  getAllCompanies(){
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        this.companies.forEach(company => {
          // console.log(company);

        });
      }
    );
  };

  idExists(value) {
    return this.companies.some(function(el) {
      return el._id === value;
    }); 
  }

  nameExists(value) {
    return this.companies.some(function(el) {
      return el.name_company.toLowerCase() == value.toLowerCase();
    }); 
  }

  renderView() {
    this.getAllCompanies();
  }

  saveCompany() {
    
    // if (this.company._id < 1 || !this.company._id) {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_IS_REQUIRED, 1500);
    // }
    // else if (this.idExists(this.company._id) == true){
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.ID_Existed, 1500);
    // } 
    if ( !this.company.name_company || !this.company.name_company.trim()) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    } 
    else if (this.nameExists(this.company.name_company) == true){
      this.commonService.notifyError(this.locale.SORRY, this.locale.Name_Existed, 1500);
    } 
    else if ( !this.company.address || !this.company.address.trim() ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Address_is_required, 1500);
    } else if ( !this.company.tax_number  ) {
      this.commonService.notifyError(this.locale.SORRY, this.locale.Tax_Number_is_required, 1500);
    } else if ( !this.company.phone  ) {
      this.commonService.notifyError(this.locale.SORRY,  this.locale.Phone_is_required, 1500);
    } else {
      
      // console.log(this.company);
      this.apiCompanyService.createCompany(this.company)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.Add_success , 1500);
            
            this.renderView();
            this.router.navigate(['/admin']);
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.Error , 1500);
          }
        );
    }
    
  }

}
