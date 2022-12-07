export interface Location {
    id: number;
    distributorName: string;
    address: Address;
    kmAllocated: number;
    api_url: string;
}
export interface Address {
    address: string;
    city: string;
    state: string;
    zipcode: number;
}  
export interface DialogLocation {
    update: boolean;
    locationTable?: LocationTable;
}
export interface LocationTable {
    id: number;
    distributorName: string;
    address: string;
    city: string;
    state: string;
    zipcode: number;
    kmAllocated: number;
}
export interface LocationApi {
    distributorName: string;
    address: Address;
    kmAllocated: number;
}