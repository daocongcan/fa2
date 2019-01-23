import { Injectable } from '@angular/core';

@Injectable()
export class Locale {
  CONGRATULATION = 'CONGRATULATION';
  SORRY = 'SORRY';
  YES = 'YES';
  NO = 'NO';
  NULL = ""
  CANCLE = 'CANCLE';
  Error = 'Error';
  ARE_YOU_SURE = 'Are you sure?';
  Are_you_sure_to_delete = 'Are you sure to delete';
  IS_REQUIRED = " is required";
  
  Add_success = "Add success";
  Update_success = "Update success";
  Delete_success = "Delete success";
  Name_Existed ="Name existed";

  ID_IS_REQUIRED = "Id is required";
  NAME_IS_REQUIRED = 'Name is required';
  USER_NAME_IS_REQUIRED = 'User name is required';
  User_Name_Existed ="User name existed";
  User_name_length = "User name length > 3";
  ID_Existed = "ID existed"  ;
  EMAIL_IS_REQUIRED  = 'Email is required';
  Email_Existed = "Email existed"  ;
  COMPANY_IS_REQUIRED  = 'Company is required ';
  PASSWORD_IS_REQUIRED  = 'Password is required ';
  ROLE_IS_REQUIRED = 'Role is required ';
  Incorrect_Email_Format = 'Incorrect email format ';

  Role_Existed = "Role existed"  ;
  
  
  Profile_is_required = "Profile " +this.IS_REQUIRED;
  Status_is_required = "Status " +this.IS_REQUIRED;
  Manufactuer_is_required = "Manufactuer " +this.IS_REQUIRED;
  Codec_is_required = "Codec " +this.IS_REQUIRED;
  OS_is_required = "OS " +this.IS_REQUIRED;
  Group_is_required = "Group " +this.IS_REQUIRED;
  Dev_Eui_is_required = "Dev eui " +this.IS_REQUIRED;
  App_Eui_is_required = "App eui " +this.IS_REQUIRED;
  App_Key_is_required = "App key " +this.IS_REQUIRED;
  
  GW_is_required = "GW " +this.IS_REQUIRED;
  
  Node_is_required = "Node " +this.IS_REQUIRED;

  GW_Existed = "GW Existed";
  Ip_is_required = "Ip " +this.IS_REQUIRED;
  Mac_is_required = "Mac " +this.IS_REQUIRED;


  Address_is_required = "Address" +this.IS_REQUIRED;
  Tax_Number_is_required = "Tax number" +this.IS_REQUIRED;
  Phone_is_required = "Phone" +this.IS_REQUIRED;


  PRICE_IS_REQUIRED = 'Price is required';
  DATE_IS_REQUIRED = 'Date is required';
  AVAILABLE_AREA_IS_REQUIRED = 'Available area is required';
  LATITUDE_IS_REQUIRED = 'Latitude is required';
  LONGITUDE_IS_REQUIRED = 'Longitude is required';
  RENTED_IS_REQUIRED = 'Rented is required';
  MAX_RADIUS_IS_REQUIRED = 'Max radius is required';
  
}
