import { Customer } from "@prisma/client";

export interface CustomerSliceInitialState {
    items : Customer[];
    isLoading : boolean;
    error : Error | null;
}