import { Hostel } from "@prisma/client";
import { BaseOptions } from "./user";

export interface HostelInitialState {
    items : Hostel[];
    isLoading : boolean;
    error : Error | null;
}

export interface UpdatedHostel extends BaseOptions , Hostel {}

export interface CreatedHostel extends BaseOptions {
    name : string;
}

export interface DeleteHostelOptions extends BaseOptions {
    id : number;
}