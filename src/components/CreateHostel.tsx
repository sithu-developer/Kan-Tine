import { useAppDispatch } from "@/store/hooks";
import { createHostel } from "@/store/slices/hostelSlice";
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
        dispatch(createHostel({...newHostel , onSuccess : () => setOpen(false)}))
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false)
            setNewHostel(defaultHostel)
        }}>
            <DialogTitle>New Hostel</DialogTitle>
            <DialogContent >
                <TextField label="name" autoFocus sx={{mt : "10px"}} onChange={(event) => setNewHostel({...newHostel , name : event.target.value })} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false)
                    setNewHostel(defaultHostel)
                }}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateHostel} disabled={!newHostel.name} >Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateHostel;