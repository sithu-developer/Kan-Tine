import { CreatedCustomerOptions, CustomerSliceInitialState } from "@/types/customer";
import { config } from "@/util/config";
import { Customer } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPayAndEndDate } from "./payAndEndDateSlice";


const initialState : CustomerSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createNewCustomer = createAsyncThunk("customerSlice/createCustomer" , async( options : CreatedCustomerOptions , thunkApi ) => {
    const { name , phone , major , roomNumber , totalMonths , payDate , payMonth , payYear , hostelId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/customer` , {
            method : "POST",
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , totalMonths , payDate , payMonth , payYear , hostelId  })
        });
        const { customer , payAndEndDate } = await response.json();
        thunkApi.dispatch(addCustomer(customer));
        thunkApi.dispatch(addPayAndEndDate(payAndEndDate));
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
        },
        addCustomer : ( state , action : PayloadAction<Customer> ) => {
            state.items = [ ...state.items , action.payload ];
        }
    }
})

export const { setCustomers , addCustomer } = customerSlice.actions;

export default customerSlice.reducer;