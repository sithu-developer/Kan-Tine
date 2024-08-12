import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import BasicDatePicker from "./DatePicker";
import { useEffect, useState } from "react";
import { Dayjs } from 'dayjs';
import { useAppDispatch } from "@/store/hooks";
import { CreatedStudentOptions } from "@/types/student";


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultNewStudent : CreatedStudentOptions = {
    name : "" , phone : "" , roomNumber : "" , major : null , hostelId : ""
}

const CreatePayAndEndDate = ({ open , setOpen } : Props ) => {
    const [ newStudent , setNewStudent ] = useState<CreatedStudentOptions>(defaultNewStudent); // need to change
    const [ dateValue , setDateValue] = useState<Dayjs | null>(null);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        if(dateValue) {
            const payDate = dateValue.date();
            const payMonth = dateValue.month() + 1;
            const payYear = dateValue.year();
            // setNewStudent({...newStudent , payDate , payMonth , payYear });
        }
    } , [ dateValue ]);

    
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewStudent(defaultNewStudent);
        }} >
            <DialogTitle>New Student</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" }}>
                <BasicDatePicker setDateValue={setDateValue} dateValue={dateValue} />
                <TextField label="Total Pay Months" onChange={(event) => setNewStudent({...newStudent })} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewStudent(defaultNewStudent);
                    setDateValue(null);
                }} variant="contained" >Cancel</Button>
                <Button onClick={() => {}} variant="contained" disabled={!newStudent.name || !Number(newStudent.phone) || !newStudent.roomNumber || !dateValue || !newStudent.hostelId} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePayAndEndDate;