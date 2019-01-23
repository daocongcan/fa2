/* tslint:disable */
import { Facturation_Tenvoi } from './facturation-_tenvoi';
import { Facturation_recep } from './facturation-_recep';

/**
 */
export class Facturation_envoi {
    Tenvoi?: Facturation_Tenvoi;
    Nenvoi?: number;
    recep?: Facturation_recep[];
    Nrestant?: number;
}
