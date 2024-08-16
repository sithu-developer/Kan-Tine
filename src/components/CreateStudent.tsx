import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreatedStudentOptions } from "@/types/student";
import { createNewStudent } from "@/store/slices/studentSlice";
import { setSnackBar } from "@/store/slices/snackBarSlice";


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultNewStudent : CreatedStudentOptions = {
    name : "" , phone : "" , roomNumber : "" , major : null  , hostelId : ""
}

const CreateStudent = ({ open , setOpen } : Props ) => {
    const [ newStudent , setNewStudent ] = useState<CreatedStudentOptions>(defaultNewStudent);
    const hostels = useAppSelector(store => store.hostel.items);
    const dispatch = useAppDispatch();

    const handleCreateStudent = () => {
        dispatch(createNewStudent({...newStudent , onSuccess : () => {
            dispatch(setSnackBar({message : "New Student is successfully created" , snackBarOpen : true }))
            setOpen(false);
            setNewStudent(defaultNewStudent);
        }}))
    }
    
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewStudent(defaultNewStudent);
        }} >
            <DialogTitle>New Student</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" , minWidth : "250px" }}>
                <TextField label="name" autoFocus onChange={(event) => setNewStudent({...newStudent , name : event.target.value})} sx={{ mt : "10px"}}  />
                <TextField label="Phone" onChange={(event) => setNewStudent({...newStudent , phone : event.target.value})} />
                <TextField label="Room" onChange={(event) => setNewStudent({...newStudent , roomNumber : event.target.value})} />
                <TextField label="Major(optional)" onChange={(event) => setNewStudent({...newStudent , major : event.target.value})} />
                <FormControl fullWidth>
                  <InputLabel>Hostels</InputLabel>
                  <Select
                    value={newStudent.hostelId}
                    label="Hostels"
                    onChange={( event ) => setNewStudent({...newStudent , hostelId : Number(event.target.value)}) }
                  >
                    {hostels.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> )}
                  </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewStudent(defaultNewStudent);
                }} variant="contained" >Cancel</Button>
                <Button onClick={handleCreateStudent} variant="contained" disabled={!newStudent.name || !Number(newStudent.phone) || !newStudent.roomNumber || !newStudent.hostelId} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateStudent;