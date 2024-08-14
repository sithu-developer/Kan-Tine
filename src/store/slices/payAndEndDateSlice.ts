import { CreatedPayAndEndDateOptions, PayAndEndDateInitialState, UpdatedPayAndEndDateOptions } from "@/types/payAndEndDate";
import { config } from "@/util/config";
import { PayAndEndDate } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : PayAndEndDateInitialState = {
    items : [] ,
    isLoading : false ,
    error : null,
}

export const createPayAndEndDate = createAsyncThunk("payAndEndDateSlice/createPayAndEndDate" , async( options : CreatedPayAndEndDateOptions , thunkApi ) => {
    const { studentId , payDate , payMonth , payYear , totalMonths , price , breakFast ,lunch , dinner , isPaidUp , onSuccess , onError } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/payAndEndDate?studentId=${studentId}` , {
            method : "POST" , 
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ payDate , payMonth , payYear , totalMonths , price , breakFast ,lunch , dinner , isPaidUp })
        });
        const { payAndEndDate } = await response.json();
        thunkApi.dispatch(addPayAndEndDate(payAndEndDate));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updatePayAndEndDate = createAsyncThunk("payAndEndDateSlice/updatePayAndEndDate" , async( options : UpdatedPayAndEndDateOptions , thunkApi ) => {
    const { id , payDate , payMonth , payYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp , onSuccess , onError } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/payAndEndDate?id=${id}` , {
            method : "PUT",
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ payDate , payMonth , payYear , totalMonths , price , breakFast , lunch , dinner , isPaidUp })
        });
        const { payAndEndDate } = await response.json();
        thunkApi.dispatch(replacePayAndEndDate(payAndEndDate));
        onSuccess && onSuccess();
    } catch ( err ) {
        onError && onError();
    }
})

const payAndEndDateSlice = createSlice({
    name : "payAndEndDateSlice",
    initialState ,
    reducers : {
        setPayAndEndDates : ( state , action : PayloadAction<PayAndEndDate[]> ) => {
            state.items = action.payload;
        },
        addPayAndEndDate : ( state , action : PayloadAction<PayAndEndDate> ) => {
            state.items = [...state.items , action.payload ];
        },
        replacePayAndEndDate : ( state , action : PayloadAction<PayAndEndDate> ) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    }
})

export const { setPayAndEndDates , addPayAndEndDate , replacePayAndEndDate } = payAndEndDateSlice.actions;

export default payAndEndDateSlice.reducer;