import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import companyReducer from "./slices/companySlice"
import hostelReducer from "./slices/hostelSlice"
import customerReducer from "./slices/customerSlice"
import payAndEndDateReducer from './slices/payAndEndDateSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    company : companyReducer,
    hostel : hostelReducer,
    customer : customerReducer,
    payAndEndDate : payAndEndDateReducer,
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch