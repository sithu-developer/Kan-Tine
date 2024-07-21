import { UserOptions, UserSliceInitialState } from "@/types/user";
import { config } from "@/util/config";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : UserSliceInitialState = {
    item : null,
    isLoading : false,
    error : null
}

export const appFetch = createAsyncThunk("userSlice/appFetch" , async( options : UserOptions , thunkApi) => {
    const { email , isError , isSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/user` , {
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({ email })
        })
        const { user } = await response.json();
        thunkApi.dispatch(setUser(user));
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