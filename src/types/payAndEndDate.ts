import { PayAndEndDate } from "@prisma/client";
import { BaseOptions } from "./user";

export interface PayAndEndDateInitialState {
    items : PayAndEndDate[];
    isLoading : boolean;
    error : Error | null;
}

export interface UpdatedPayAndEndDateOptions extends BaseOptions {
    id : number;
    payYear: number;
    payMonth: number;
    payDate: number;
    totalMonths : number;
    price : number;
    breakFast: boolean;
    lunch: boolean;
    dinner : boolean;
    isPaidUp : boolean;
    note :  string | null;
} 

export interface CreatedPayAndEndDateOptions extends BaseOptions {
    studentId : number;
    payYear: number;
    payMonth: number;
    payDate: number;
    totalMonths : number;
    price : number;
    breakFast: boolean;
    lunch: boolean;
    dinner : boolean;
    isPaidUp : boolean;
    note : string | null;
}

export interface DeletedPayAndEndDate extends BaseOptions {
    id : number;
}

export interface IsDonePayAndEndDate extends BaseOptions {
    id : number;
}