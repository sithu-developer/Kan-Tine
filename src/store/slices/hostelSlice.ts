import { HostelInitialState, UpdatedHostel } from "@/types/hostel";
import { config } from "@/util/config";
import { Hostel } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const updateHostel = createAsyncThunk("hostelSlice/updateHostel" , async( options : UpdatedHostel , thunkApi ) => {
    const { id , name , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/hostel?id=${id}` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name })
        })
        const { hostel } = await response.json();
        thunkApi.dispatch(replaceHostel(hostel));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
});

const initialState : HostelInitialState = {
    items : [],
    isLoading : false,
    error : null
}

const hostelSlice = createSlice({
    name : "hostelSlice",
    initialState ,
    reducers : {
        setHostels : ( state , action : PayloadAction<Hostel[]>) => {
            state.items = action.payload;
        },
        replaceHostel : ( state , action : PayloadAction<Hostel>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setHostels , replaceHostel } = hostelSlice.actions;

export default hostelSlice.reducer;