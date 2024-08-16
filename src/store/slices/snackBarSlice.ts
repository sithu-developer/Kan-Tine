import { SnackBarInitialState, SnackItem } from "@/types/snackBar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : SnackBarInitialState = {
    item : {message : "" , snackBarOpen : false },
    isLoading : false,
    error : null,
}

const snackBarSlice = createSlice({
    name : "snackBarSlice" ,
    initialState ,
    reducers : {
        setSnackBar : ( state , action : PayloadAction<SnackItem> ) => {
            state.item = action.payload;
        },
    }
})

export const { setSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;