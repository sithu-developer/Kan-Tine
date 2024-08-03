import { Company } from "@prisma/client";

export interface CompanyInitialState {
    item : Company | null;
    isLoading : boolean;
    error : Error | null;
}