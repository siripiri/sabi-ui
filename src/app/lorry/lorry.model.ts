export interface LorryTable {
    id:number;
    numberPlate:string;
    type:string;
    modelNumber:string;
    manufacturer:string;
    driverName:string;
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
    id:number | null;
    driverName:string;
    lorryId:number;
    api_url:string | null;
}

export interface DialogLorry {
    update: boolean,
    lorry: Lorry
}

export interface DialogAssign {
    lorry: Lorry
}