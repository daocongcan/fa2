/* tslint?:disable */

/**
 */
export class Node {
    _id?:number;
    name_node?: string;
    status?: string;
    OS?:string;
    dev_eui?:string;
    app_eui?:string;
    app_key?:string;
    id_group?:number;
    Manufacture?:string;
    longitude?:number;
    latitude?:number;
    // Profile?:{
    //     AppEUI?: string;
    //     DevEUI?: string;
    //     DevNonce?: string;
    //     MACPayload?: string;
    //     MHDR?: string;
    //     MIC?: string;
    //     MessageType?: string;
    //     PHYPayload?: string;
    // };
    Profile?:object;
    Codec?:string;
}
