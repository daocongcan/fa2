/* tslint:disable */

/**
 */
export class Nodedata {
    _id?: string;
    id_gw?: number;
    id_node?: number;
    createtime?: string;
    message?: [
        {
            name?: string;
            value?: number
        },
        {
            name?: string;
            value?: {
                latitude?: number;
                longitude?: number;
                altitude?: number
            }
        },
        {
            name?: string;
            value?: {
                X?: number;
                Y?: number;
                Z?: number
            }
        },
        {
            name?: string;
            value?: number
        }
    ]
}
