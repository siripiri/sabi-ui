import { Address } from "../location/location.model";

export interface LorryTable {
    id:number;
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacturer:string;
    driverName:string;
}

export interface DriverTable {
    id:number;
    image?: string;
    name:string;
    age:number;
    address:string;
    childrenDetails:string;
    lorry:string;
}

export interface Lorry {
    id:number | null;
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacturer:string;
    driverId: number | null;
    driverName:string | null;
    api_url:string | null;
}

export interface Driver {
    id:number;
    driverName:string;
    lorryId:number | null;
    numberPlate: string;
    childrenDetails:string;
    dob:string;
    address:Address;
    api_url:string;
}

export interface DialogLorry {
    update: boolean,
    lorry: Lorry
}

export interface DialogAssign {
    lorry: Lorry
}

export interface DialogDriver {
    update: boolean,
    driver: Driver
}