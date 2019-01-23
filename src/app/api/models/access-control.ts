/* tslint:disable */
import { AccessResource } from './access-resource';
import { Role } from './role';

/**
 */
export class AccessControl {
    id?: number;
    role_id?: number;
    resource_id?: number;
    access_resource_list?: AccessResource;
    role?: Role;
}
