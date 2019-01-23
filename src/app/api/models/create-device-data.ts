/* tslint:disable */
import { PayloadDeviceData } from './payload-device-data';
import { CreateDeviceData_device_properties } from './create-device-data-_device-_properties';
import { ProtocolDeviceData } from './protocol-device-data';

/**
 */
export class CreateDeviceData {
    payload_cleartext?: string;
    id?: string;
    group_id?: number;
    group?: string;
    profile_id?: number;
    profile?: string;
    type?: string;
    timestamp?: string;
    payload?: PayloadDeviceData[];
    payload_encrypted?: string;
    device_id?: number;
    device_properties?: CreateDeviceData_device_properties;
    protocol_data?: ProtocolDeviceData;
    lat?: number;
    lng?: number;
    geolocation_type?: string;
    geolocation_precision?: number;
    zone_id?: number;
    city_code?: string;
    city_name?: string;
    delivered_at?: string;
}
