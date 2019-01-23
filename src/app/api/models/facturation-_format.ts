/* tslint:disable */
import { Facturation_envoi } from './facturation-_envoi';
import { Product } from './product';

/**
 */
export class Facturation_format {
    id?: number;
    value_1?: string;
    value_2?: string;
    envoi?: Facturation_envoi[];
    product_id?: number[];
    product_match?: Product[];
}
