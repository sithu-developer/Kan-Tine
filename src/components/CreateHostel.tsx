import { useAppDispatch } from "@/store/hooks";
import { createHostel } from "@/store/slices/hostelSlice";
import { setSnackBar } from "@/store/slices/snackBarSlice";
import { CreatedHostel } from "@/types/hostel";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultHostel : CreatedHostel = {
    name : ""
}

const CreateHostel = ({ open , setOpen } : Props ) => {
    const [ newHostel , setNewHostel ] = useState<CreatedHostel>(defaultHostel);
    const dispatch = useAppDispatch();

    const handleCreateHostel = () => {
        dispatch(createHostel({...newHostel , onSuccess : () => {
            setNewHostel(defaultHostel);
            setOpen(false)
            dispatch(setSnackBar({message : "New hostel is successfully created" , snackBarOpen : true }));
        }}))
    }

    return (
        <Dialog open={open} onClose={() => {
            setNewHostel(defaultHostel)
            setOpen(false)
        }}>
            <DialogTitle>New Hostel</DialogTitle>
            <DialogContent >
                <TextField label="name" autoFocus sx={{mt : "10px"}} onChange={(event) => setNewHostel({...newHostel , name : event.target.value })} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setNewHostel(defaultHostel)                    
                    setOpen(false)
                }}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateHostel} disabled={!newHostel.name} >Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateHostel;