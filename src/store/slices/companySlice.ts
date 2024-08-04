import { CompanyInitialState, UpdateCompanyOptions } from "@/types/company";
import { config } from "@/util/config";
import { Company } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const updateCompany = createAsyncThunk("companySlice/updateCompany" , async( options : UpdateCompanyOptions  , thunkApi ) => {
    const { id , name , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/company` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name })
        });
        const { company } = await response.json();
        thunkApi.dispatch(replaceCompany(company));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})


const initialState : CompanyInitialState  = {
    item : null ,
    isLoading : false,
    error : null,
}

const companySlice = createSlice({
    name : "companySlice",
    initialState ,
    reducers : {
        setCompany : ( state , action : PayloadAction<Company> ) => {
            state.item = action.payload;
        },
        replaceCompany : ( state , action : PayloadAction<Company>) => {
            state.item = action.payload;
        }
    }
})

export const { setCompany , replaceCompany } = companySlice.actions;

export default companySlice.reducer;