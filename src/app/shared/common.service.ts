import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class CommonService {

  API_KEY: string;
  dataRefresher: any;

  constructor(
    private router: Router,
    private http: Http
  ) {
    this.API_KEY = 'AIzaSyCcL1uP1e6wUohluzq3Y818bCT5dbRYINU';
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (typeof this.dataRefresher !== 'undefined') {
          clearInterval(this.dataRefresher);
          this.dataRefresher = null;
        }
      }

    });
  }

  public getMapGeocodeApiLink() {
    return 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.API_KEY;
  }

  // Return false if field input is null or empty;
  public isNullOrEmpty(input) {
    if (input === 'undefined') {
      return true;
    } else if (input === '') {
      return true;
    }
    return false;
  }

  public isEmailInvalid(input) {
    if (input.match(/[^ @]*@[^ @]*/)) {
      return false;
    }
    return true;
  }

  public isNotNumber(input) {
    return isNaN(input);
  }

  public isLatLngValid(lat, lng) {
    if (!this.isNotNumber(+lat) && !this.isNotNumber(+lng)) {
      if (
        +lat <= 180 &&
        +lat >= -180 &&
        +lng <= 90 &&
        +lng >= -90) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public getInfoByLatLng(lat, lng, obj) {
    const geocoderLink = this.getMapGeocodeApiLink() + '&latlng=' + lat + ',' + lng;
    this.http.get(geocoderLink).subscribe(
      response => {
        const status_resp = (JSON.parse(response['_body']))['status'];
        const resp = {
          city_code: '',
          city_name: '',
          address: ''
        };
        if (status_resp !== 'ZERO_RESULTS') {
          const map_data = (JSON.parse(response['_body']))['results'][0];
          const address_components = map_data['address_components'];
          address_components.forEach(ele => {
            if (ele['types'].indexOf('locality') > -1) {
              resp.city_name = ele['long_name'];
            }
          });
          resp.city_code = map_data['place_id'];
          resp.address = map_data['formatted_address'];
          obj.city_code = resp.city_code;
          obj.city_name = resp.city_name;
          obj.address = resp.address;
        }
      },
      error => {
        return;
      }
    );
  }

  public notifySuccess(titleNotify: string, textNotify: string, timeNotify: number) {
    swal({
      title: titleNotify,
      text: textNotify,
      timer: timeNotify,
      type: 'success',
      showConfirmButton: false
    });
  }

  public notifyError(titleNotify: string, textNotify: string, timeNotify: number) {
    swal({
      title: titleNotify,
      text: textNotify,
      timer: timeNotify,
      type: 'error',
      showConfirmButton: false
    });
  }

  public notifyWarning(titleNotify: string, textNotify: string, timeNotify: number) {
    swal({
      title: titleNotify,
      text: textNotify,
      timer: timeNotify,
      type: 'warning',
      showConfirmButton: false
    });
  }

  public getRoleOfUser() {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    return userInfo.id_role;
  }

  public scrollToTop() {
    window.scrollTo(0, 0);
  }
}
