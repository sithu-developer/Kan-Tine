import { User } from "@prisma/client"

export interface UserSliceInitialState {
    item : User | null
    isLoading : boolean
    error : Error | null
}

export interface BaseOptions {
    onSuccess ?: (value ?: any) => void;
    onError ?: (value ?: any) => void;
}
