import { CustomerSliceInitialState } from "@/types/customer";
import { Customer } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : CustomerSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

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