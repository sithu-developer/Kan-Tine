

export interface SnackBarInitialState {
    item : SnackItem;
    isLoading : boolean;
    error : Error | null;
}

export interface SnackItem {
    snackBarOpen : boolean;
    message : string;
    forFail ?: boolean;
}