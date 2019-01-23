/* tslint:disable */
import { Device } from './device';
import { DeviceData } from './device-data';
import { ProductType } from './product-type';
import { Company } from './company';
import { ProductStatus } from './product-status';

/**
 */
export class Product {
    city_name?: string;
    id?: number;
    description?: string;
    rent_price?: number;
    manufacture_date?: string;
    receive_data_count?: number;
    city_code?: string;
    name?: string;
    device?: Device;
    device_data?: DeviceData;
    product_type?: ProductType;
    product_type_parent?: ProductType;
    company?: Company;
    product_status?: ProductStatus;
}
