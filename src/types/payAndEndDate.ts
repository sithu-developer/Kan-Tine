import { PayAndEndDate } from "@prisma/client";

export interface PayAndEndDateInitialState {
    items : PayAndEndDate[];
    isLoading : boolean;
    error : Error | null;
}