import { CreatedCustomerOptions, CustomerSliceInitialState, UpdatedCustomerOptions } from "@/types/customer";
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
    const { name , phone , major , roomNumber , hostelId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/customer` , {
            method : "POST",
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , hostelId  })
        });
        const { customer } = await response.json();
        thunkApi.dispatch(addCustomer(customer));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateCustomer = createAsyncThunk("customerSlice/updateCustomer" , async( options : UpdatedCustomerOptions , thunkApi ) => {
    const { id , name , phone , major , roomNumber , hostelId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/customer?id=${id}` , {
            method : "PUT" , 
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , hostelId })
        });
        const { customer } = await response.json();
        thunkApi.dispatch(replaceCustomer(customer));
        onSuccess && onSuccess();
    } catch ( err ) {
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
        },
        replaceCustomer : ( state , action : PayloadAction<Customer>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    }
})

export const { setCustomers , addCustomer , replaceCustomer } = customerSlice.actions;

export default customerSlice.reducer;