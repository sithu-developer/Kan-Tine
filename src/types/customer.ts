import { Customer } from "@prisma/client";
import { BaseOptions } from "./user";

export interface CustomerSliceInitialState {
    items : Customer[];
    isLoading : boolean;
    error : Error | null;
}

export interface CreatedCustomer extends BaseOptions {
    name : string;
    phone : string;
    roomNumber : string;
    major : string | null;
}