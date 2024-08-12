import { CreatedStudentOptions, StudentSliceInitialState, UpdatedStudentOptions } from "@/types/student";
import { config } from "@/util/config";
import { Student } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState : StudentSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createNewStudent = createAsyncThunk("studentSlice/createStudent" , async( options : CreatedStudentOptions , thunkApi ) => {
    const { name , phone , major , roomNumber , hostelId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/student` , {
            method : "POST",
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , hostelId  })
        });
        const { student } = await response.json();
        thunkApi.dispatch(addStudent(student));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateStudent = createAsyncThunk("studentSlice/updateStudent" , async( options : UpdatedStudentOptions , thunkApi ) => {
    const { id , name , phone , major , roomNumber , hostelId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/student?id=${id}` , {
            method : "PUT" , 
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ name , phone , major , roomNumber , hostelId })
        });
        const { student } = await response.json();
        thunkApi.dispatch(replaceStudent(student));
        onSuccess && onSuccess();
    } catch ( err ) {
        onError && onError();
    }
})


const studentSlice = createSlice({
    name : "studentSlice",
    initialState ,
    reducers : {
        setStudents : ( state , action : PayloadAction<Student[]>) => {
            state.items = action.payload;
        },
        addStudent : ( state , action : PayloadAction<Student> ) => {
            state.items = [ ...state.items , action.payload ];
        },
        replaceStudent : ( state , action : PayloadAction<Student>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    }
})

export const { addStudent , replaceStudent , setStudents } = studentSlice.actions;

export default studentSlice.reducer;