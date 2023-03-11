import { Address } from "../location/location.model";

export interface Driver {
    id: number;
    driverName: string;
    lorryId: number | null;
    numberPlate: string;
    gender: string;
    phoneNumber1: string;
    phoneNumber2: string;
    dob: string;
    address: Address;
    api_url: string;
}

export interface DriverTable {
    id: number;
    image?: string;
    name: string;
    age: number;
    gender: string;
    phoneNumber1: string;
    phoneNumber2: string;
    address: string;
    lorry: string;
}

export interface DialogDriver {
    update: boolean,
    driver: Driver
}

export interface Profile {
    id: string;
    driverName: string;
    gender: string;
    dob: string;
    phoneNumber1: string;
    phoneNumber2: string;
}

export interface PersonalInformation {
    nationality: string;
    religion: string;
    martialStatus: string;
    employmentOfSpouse: string;
    children: string;
    driverLicence: string;
    aadharCard: string;
    whatsappNo: string;
}

export interface FamilyInformation {
    name: string;
    relationShip: string;
    dob: string;
}

export interface EmergencyContact {
    name: string;
    relationShip: string;
    phoneNumber: string;
}

export interface DriverForm {
    profile: Profile;
    address: Address;
    personalInformation: PersonalInformation;
    familyInformations: FamilyInformation[];
    emergencyContacts: EmergencyContact[];
    api_url: string;
}
