import { BaseOptions, UserSliceInitialState } from "@/types/user";
import { config } from "@/util/config";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCompanies } from "./companySlice";

const initialState : UserSliceInitialState = {
    item : null,
    isLoading : false,
    error : null
}

export const appFetch = createAsyncThunk("userSlice/appFetch" , async( options : BaseOptions , thunkApi) => {
    const { isError , isSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/user`);
        const { user , company } = await response.json();
        thunkApi.dispatch(setUser(user));
        thunkApi.dispatch(setCompanies(company));
        isSuccess && isSuccess();
    } catch(err) {
        isError && isError();
    }
})

const userSlice = createSlice({
    name : "userSlice",
    initialState , 
    reducers : {
        setUser : ( state , action : PayloadAction<User>) => {
            state.item = action.payload;
        }
    } 
})

export const { setUser } = userSlice.actions;


export default userSlice.reducer;