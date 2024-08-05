import { BaseOptions, UserSliceInitialState } from "@/types/user";
import { config } from "@/util/config";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCompany } from "./companySlice";
import { setHostels } from "./hostelSlice";

const initialState : UserSliceInitialState = {
    item : null,
    isLoading : false,
    error : null
}

export const appFetch = createAsyncThunk("userSlice/appFetch" , async( options : BaseOptions , thunkApi) => {
    const { onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/user`);
        const { user , company , hostels  } = await response.json();
        thunkApi.dispatch(setUser(user));
        thunkApi.dispatch(setCompany(company));
        thunkApi.dispatch(setHostels(hostels));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
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