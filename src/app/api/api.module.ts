import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { AuthService } from './services/auth.service';
import { AccessControlsService } from './services/access-controls.service';
import { AccessResourcesService } from './services/access-resources.service';
import { CompaniesService } from './services/companies.service';
import { DeviceAttachmentService } from './services/device-attachment.service';
import { DeviceDataService } from './services/device-data.service';
import { DevicesService } from './services/devices.service';
import { FacturationsService } from './services/facturations.service';
import { ProductRentsService } from './services/product-rents.service';
import { ProductStatusService } from './services/product-status.service';
import { ProductTypesService } from './services/product-types.service';
import { ProductsService } from './services/products.service';
import { RolesService } from './services/roles.service';
import { SitesService } from './services/sites.service';
import { StatusService } from './services/status.service';
import { StoragesService } from './services/storages.service';
import { UnitsService } from './services/units.service';
import { UsersService } from './services/users.service';

import { GroupsService } from './services/groups.service';
import { GwService } from './services/gw.service';
import { NodeService } from './services/node.service';
import { GwNodeService } from './services/gw-node.service';
import { ScheduleService } from './services/schedule.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   AuthService,
   AccessControlsService,
   AccessResourcesService,
   CompaniesService,
   DeviceAttachmentService,
   DeviceDataService,
   DevicesService,
   FacturationsService,
   ProductRentsService,
   ProductStatusService,
   ProductTypesService,
   ProductsService,
   RolesService,
   SitesService,
   StatusService,
   StoragesService,
   UnitsService,
   UsersService,
   GroupsService,
   GwService,
   NodeService,
   GwNodeService,
   ScheduleService
  ],
})
export class ApiModule { }
