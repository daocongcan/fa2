/* tslint:disable */
import { Company } from './company';
import { Product } from './product';

/**
 */
export class ProductRent {
    id?: number;
    product_id?: number;
    company_id?: number;
    transfer_numofdate?: number;
    rent_date?: string;
    expired_date?: string;
    cmt?: string;
    ref_name?: string;
    company?: Company;
    product?: Product;
}
