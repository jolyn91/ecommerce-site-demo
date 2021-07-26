export enum StoreType {
    "MALAYSIA" = "Malaysia",
    "SINGAPORE" = "Singapore"
}

export interface ICheckoutReq {
    storeId: any;
    currency: string;
    token: any;
}

export interface ICustomer {
    email: string;
    mobile_number: string;
    full_name: string;
    first_name: string;
    last_name: string;
}