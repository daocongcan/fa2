import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LatLng, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { Polyline, Circle, LatLngLiteral } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { AgmMap } from '@agm/core/directives/map';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common';

import { ProductsService } from '../../../api/services/products.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DeviceAttachmentService } from '../../../api/services/device-attachment.service';
import { DevicesService } from '../../../api/services/devices.service';
import { DeviceAttachment } from '../../../api/models/device-attachment';
import { Device } from '../../../api/models/device';
import { Product } from '../../../api/models/product';

import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../../shared/common.service';
import { StoragesService } from '../../../api/services';
import { Storage } from '../../../api/models';

import { MatTabsModule } from '@angular/material/tabs';
import 'js-marker-clusterer/src/markerclusterer.js';

declare const google;
declare const MarkerClusterer;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, AfterViewInit {

  center: any;
  showList: Boolean = false;
  zoom: Number = 14;
  productList: Product[] = [];
  productHaveDeviceList: Product[] = [];
  deviceAttachment: DeviceAttachment;
  device: Device;
  bounds: LatLngBounds = null;
  coordinate: LatLngBoundsLiteral;
  infoWindowIsOpen: Boolean = false;
  lat: Number = 46.7894076;
  lng: Number = 0.1676793;
  id: Number = 1;
  capteurInfo: any = {
    identifiant: '',
    dernierMSC: '',
    statut: ''
  };
  storageInfo: any = {
    nom: '',
    disponible: '',
    loue: '',
    capteurs: ''
  };
  public storageList: Storage[];
  storageIcon = {
    url: '/assets/images/database.svg',
    scaledSize: {
      height: 90,
      width: 90
    }
  };
  listShowing = '';
  openStorageInfoWindow = false;
  isShowDetail = false;
  selectTab = 0;
  type = 'capteur';
  googleMarkers: any = [];
  currentZoom: number;
  //product: Products;
  // console.log(productList);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiProductService: ProductsService,
    private apiDeviceAttachmentService: DeviceAttachmentService,
    private apiDeviceService: DevicesService,
    private apiStorageService: StoragesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private location: Location,
    private commonService: CommonService,
    
    
  ) {
    this.currentZoom = +this.zoom;
  }


  ngOnInit() {
    this.spinnerService.show();
    this.center = { id: this.id, lat: this.lat, lng: this.lng };
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.type != null) {
      this.isShowDetail = true;
    }
    if (this.type === 'capteur') {
      this.infoWindowIsOpen = true;
      this.selectTab = 0;
    } else if (this.type === 'storage') {
      this.openStorageInfoWindow = true;
      this.selectTab = 1;
    }
    this.refreshData();
    this.renderView();
    
  }

  ngAfterViewInit() {
    const temp = document.getElementsByClassName('mat-tab-label');
    for (let i = 0; i < temp.length; i++) {
      document.getElementsByClassName('mat-tab-label')[i]
      .setAttribute('Style', 'font-family: "Ubuntu Condensed" !important; font-weight: bold');
    }
    const map = document.getElementsByClassName('agm-map-container-inner');
    for (let i = 0; i < map.length; i++) {
      map[i].setAttribute('Style', 'height: ' + (window.innerHeight - 240) + 'px');
    }
  }

  renderView() {
    this.getAllProducts();
    this.getAllStorage();
  }
  

  refreshData() {
    // this.commonService.dataRefresher = setInterval(() => {
    //   this.getAllProducts();
    // }, 60000);
  }

  setLatLng(obj, type): void {
    // this.smoothZoomIn(obj.id, obj.device.lat, obj.device.lng, 14, 5);
    // console.log(obj);
    if (type !== '' || obj.id !== +this.route.snapshot.paramMap.get('id')) {
      if (type != null) {
        this.isShowDetail = true;
      }
      if (type === 'capteur') {
        this.id = obj.id;
        this.lat = obj.device.lat;
        this.lng = obj.device.lng;
        this.openStorageInfoWindow = false;
        this.infoWindowIsOpen = true;
        this.capteurInfo = {
          identifiant: obj.name,
          dernierMSC: obj.device_data.created_at,
          statut: obj.product_status.name
        };
      }
      if (type === 'storage') {
        this.id = obj.id;
        this.lat = obj.lat;
        this.lng = obj.lng;
        this.openStorageInfoWindow = true;
        this.infoWindowIsOpen = false;
        this.storageInfo = {
          nom: obj.name,
          disponible: obj.area,
          loue: obj.rent_area,
          capteurs: obj.capteurs
        };
      }
      this.zoom = 15;
      this.router.navigate(['/home/' + type + '/' + obj.id]);
      // this.renderView();
    }
  }


  smoothZoomIn(key, changedLat, changedLng, maxZoomIn, cnt): void {
    if (cnt >= maxZoomIn) {
      cnt = maxZoomIn;
      this.center = { id: key, lat: changedLat, lng: changedLng, zoom: cnt };
    } else {
      this.center = { id: key, lat: changedLat, lng: changedLng, zoom: cnt };
      cnt += 1;
      setTimeout(() => {
        this.smoothZoomIn(key, changedLat, changedLng, maxZoomIn, cnt);
      }, 80);
    }
  }

  getAllProducts() {
    this.apiProductService.listProducts()
      .subscribe(
        data => {
          this.productList = data;
          this.productHaveDeviceList = this.productList.filter(product => product.device !== null);
          const id = +this.route.snapshot.paramMap.get('id');
          this.productHaveDeviceList.forEach(e => {
            this.googleMarkers.push(new google.maps.Marker({
              position: { lat: e.device.lat, lng: e.device.lng }
            }));
          });
          if (id) {
            if (this.type === 'capteur') {
              this.listShowing = this.type;
              const defineProduct: Product = this.productList.find(product => product.id === id);
              if (defineProduct && defineProduct.device) {
                this.center = { id: id, lat: defineProduct.device.lat, lng: defineProduct.device.lng };
              }
              this.setLatLng(defineProduct, this.type);
              this.infoWindowIsOpen = true;
            }
          }

          // if (id === 0) {
          //   // const defineProduct: Product = this.productList.find(product => product.id === this.id);
          //   // if (defineProduct && defineProduct.device) {
          //   //   this.center = { id: this.id, lat: defineProduct.device.lat, lng: defineProduct.device.lng };
          //   // }
          //   // this.info = {
          //   //   identifiant: defineProduct.name,
          //   //   dernierMSC: defineProduct.device_data.created_at,
          //   //   statut: defineProduct.product_status.name
          //   // };
          //   this.zoom = 10;
          // }
          this.spinnerService.hide();
          this.showList = true;
        }
      );
  }

  getAllStorage() {
    this.apiStorageService.listStorage()
      .subscribe(
        data => {
          this.storageList = data;
          const id = +this.route.snapshot.paramMap.get('id');
          if (id) {
            if (this.type === 'storage') {
              this.listShowing = this.type;
              const selectStorage: Storage = this.storageList.find(storage => storage.id === id);
              if (selectStorage) {
                this.lat = selectStorage.lat;
                this.lng = selectStorage.lng;
              }
              this.setLatLng(selectStorage, this.type);
            }
          }
        },
        error => {

        }
      );
  }


  notifyNotExistDevice() {
    swal({
      title: 'Je n\'ai aucun appareil',
      type: 'error',
      timer: 1500,
      text: 'Veuillez ajouter un appareil pour ce produit',
      showConfirmButton: false
    });
  }

  onZoom(event) {
    this.currentZoom = event;
  }
}

interface Marker {
  lat: number;
  lng: number;
}
