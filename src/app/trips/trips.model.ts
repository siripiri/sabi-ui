import { Location } from "../location/location.model";
import { Lorry } from "../lorry/lorry.model";

export interface trips {
    id: number;
    date: string;
    plantToDistributor: number;
    DistributorToPlant: number;
    desEnd: string;
    desStart: string;
    plantEnd: string;
    plantStart: string;
    location: Location;
    lorry: Lorry;
}

export interface tripsTable {
    id: number;
    date: string;
    distributorName: string;
    city: string;
    kmCovered: string;
    kmAllocated: string;
    timeTaken: string;
    driverName: string;
    lorryNumberPlate: string;
    locationId: number;
    lorryId: number;
    driverId: number;
}