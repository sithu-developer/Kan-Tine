import { CreatedCustomerOptions, CustomerSliceInitialState } from "@/types/customer";
import { config } from "@/util/config";
import { Customer } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState : CustomerSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createCustomer = createAsyncThunk("customerSlice/createCustomer" , async( options : CreatedCustomerOptions , thunkApi ) => {
    const { name , phone , major , roomNumber , totalMonths , payDate , payMonth , payYear , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/customer` , {
            method : "POST",
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , totalMonths , payDate , payMonth , payYear  })
        });
        const {} = await response.json();
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})


const customerSlice = createSlice({
    name : "customerSlice",
    initialState ,
    reducers : {
        setCustomers : ( state , action : PayloadAction<Customer[]>) => {
            state.items = action.payload;
        }
    }
})

export const { setCustomers } = customerSlice.actions;

export default customerSlice.reducer;