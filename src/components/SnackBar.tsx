import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSnackBar } from "@/store/slices/snackBarSlice";
import { Alert, Box, Snackbar } from "@mui/material";

const SnackBarComponent = () => {
    const item = useAppSelector(store => store.snackBar.item);
    const dispatch = useAppDispatch();

    const handleSetOpen = () => {
        dispatch(setSnackBar({message : "" , snackBarOpen : false }))
    }

     return (
        <Box>
            <Snackbar open={item.snackBarOpen} autoHideDuration={5000} onClose={handleSetOpen}>
              <Alert
                onClose={handleSetOpen}
                severity={item.forFail ? "error" : "success"}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {item.message}
              </Alert>
            </Snackbar>
        </Box>
    )

}

export default SnackBarComponent;