export interface LorryTable {
    id:number;
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacturer:string;
    driverName:string;
}

export interface Lorry {
    id:number;
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacturer:string;
    driverName:string;
    api_url:string;
}

export interface DriverName {
    driverId:number;
    lorryId:number;
    driverName:string;
    api_url:string;
}

export interface AddLorryWithDriver {
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacture:string;
    driverId:number | null;
}

