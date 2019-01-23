/* tslint:disable */
import { Device } from './device';
import { DeviceData } from './device-data';
import { ProductType } from './product-type';
import { Company } from './company';
import { ProductStatus } from './product-status';

/**
 */
export class UpdateProduct {
    city_code?: string;
    id?: number;
    company_id?: number;
    product_status_id?: number;
    name?: string;
    description?: string;
    rent_price?: number;
    manufacture_date?: string;
    product_type_id?: number;
    city_name?: string;
    device?: Device;
    device_data?: DeviceData;
    product_type?: ProductType;
    product_type_parent?: ProductType;
    company?: Company;
    product_status?: ProductStatus;
}
