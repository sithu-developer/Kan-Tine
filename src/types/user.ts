import { User } from "@prisma/client"

export interface UserSliceInitialState {
    item : User | null
    isLoading : boolean
    error : Error | null
}

export interface BaseOptions {
    isSuccess ?: (value ?: any) => void;
    isError ?: (value ?: any) => void;
}

export interface UserOptions extends BaseOptions {
    email : string
}