import { Company } from "@prisma/client";
import { BaseOptions } from "./user";

export interface CompanyInitialState {
    item : Company | null;
    isLoading : boolean;
    error : Error | null;
}

export interface UpdateCompanyOptions extends BaseOptions , Company {}