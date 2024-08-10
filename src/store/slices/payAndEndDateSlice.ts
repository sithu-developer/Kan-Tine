import { PayAndEndDateInitialState } from "@/types/payAndEndDate";
import { PayAndEndDate } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : PayAndEndDateInitialState = {
    items : [] ,
    isLoading : false ,
    error : null,
}

const payAndEndDateSlice = createSlice({
    name : "payAndEndDateSlice",
    initialState ,
    reducers : {
        setPayAndEndDates : ( state , action : PayloadAction<PayAndEndDate[]> ) => {
            state.items = action.payload;
        },
        addPayAndEndDate : ( state , action : PayloadAction<PayAndEndDate> ) => {
            state.items = [...state.items , action.payload ];
        }
    }
})

export const { setPayAndEndDates , addPayAndEndDate } = payAndEndDateSlice.actions;

export default payAndEndDateSlice.reducer;