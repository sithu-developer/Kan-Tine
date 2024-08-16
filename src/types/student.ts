import { Student } from "@prisma/client";
import { BaseOptions } from "./user";

export interface StudentSliceInitialState {
    items : Student[];
    isLoading : boolean;
    error : Error | null;
}

export interface CreatedStudentOptions extends BaseOptions {
    name : string;
    phone : string;
    roomNumber : string;
    major : string | null;
    hostelId : number | "";
}

export interface UpdatedStudentOptions extends BaseOptions {
    id : number;
    name : string;
    phone : string;
    roomNumber : string;
    major : string | null;
    hostelId : number | "";
}

export interface DeletedStudentOptions extends BaseOptions {
    id : number;
}