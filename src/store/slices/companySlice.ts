import { CompanyInitialState } from "@/types/company";
import { Company } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : CompanyInitialState  = {
    item : null ,
    isLoading : false,
    error : null,
}

const companySlice = createSlice({
    name : "companySlice",
    initialState ,
    reducers : {
        setCompanies : ( state , action : PayloadAction<Company> ) => {
            state.item = action.payload;
        }
    }
})

export const { setCompanies } = companySlice.actions;

export default companySlice.reducer;