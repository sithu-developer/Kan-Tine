import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, TextField } from "@mui/material"
import BasicDatePicker from "./DatePicker";
import { useEffect, useState } from "react";
import { Dayjs } from 'dayjs';
import { useAppDispatch } from "@/store/hooks";
import { CreatedPayAndEndDateOptions } from "@/types/payAndEndDate";
import { createPayAndEndDate } from "@/store/slices/payAndEndDateSlice";
import { setSnackBar } from "@/store/slices/snackBarSlice";


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
    studentId : number;
}

const defaultNewPayAndEndDate : CreatedPayAndEndDateOptions = {
    studentId : 0 , payDate : 0 , payMonth : 0 , payYear : 0 , totalMonths : 0 , price : 0 , breakFast : true , lunch : true , dinner : true , isPaidUp : false , note : ""
}

const CreatePayAndEndDate = ({ open , setOpen , studentId } : Props ) => {
    const [ newPayAndEndDate , setNewPayAndEndDate ] = useState<CreatedPayAndEndDateOptions>(defaultNewPayAndEndDate);
    const [ dateValue , setDateValue] = useState<Dayjs | null>(null);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(dateValue) {
            const payDate = dateValue.date();
            const payMonth = dateValue.month() + 1;
            const payYear = dateValue.year();
            setNewPayAndEndDate({...newPayAndEndDate , payDate , payMonth , payYear });
        } else {
            setNewPayAndEndDate({...newPayAndEndDate , payDate : 0 , payMonth : 0 , payYear : 0 })
        }
    } , [ dateValue ]);

    const handleCreatePayAndEndDate = () => {
        dispatch(createPayAndEndDate({...newPayAndEndDate , studentId , 
            onSuccess : () => {
                setNewPayAndEndDate(defaultNewPayAndEndDate);
                setDateValue(null);
                setOpen(false);
                dispatch(setSnackBar({message : "New payment is successfully created" , snackBarOpen : true }))
        }}))
    }

    return (
        <Dialog open={open} onClose={() => {
            setNewPayAndEndDate(defaultNewPayAndEndDate);
            setDateValue(null);
            setOpen(false);
        }} >
            <DialogTitle>New Payment</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" }}>
                <span></span>
                <BasicDatePicker setDateValue={setDateValue} dateValue={dateValue} />
                <TextField  label="Total months" onChange={(event) => setNewPayAndEndDate({...newPayAndEndDate , totalMonths : Number(event.target.value)})} />
                <TextField  label="price (kyat)" onChange={(event) => setNewPayAndEndDate({...newPayAndEndDate , price : Number(event.target.value)})}  />
                <Divider/>
                <FormGroup sx={{ display : "flex" , flexDirection : "row" ,  ml : "13px"   }}>
                    <FormControlLabel control={<Checkbox checked={newPayAndEndDate.breakFast} onChange={(event) =>  setNewPayAndEndDate({...newPayAndEndDate , breakFast : event.target.checked })} />} label="Breakfast" />
                    <FormControlLabel control={<Checkbox checked={newPayAndEndDate.lunch} onChange={(event) =>  setNewPayAndEndDate({...newPayAndEndDate , lunch : event.target.checked })} />} label="Lunch" />
                    <FormControlLabel control={<Checkbox checked={newPayAndEndDate.dinner} onChange={(event) =>  setNewPayAndEndDate({...newPayAndEndDate , dinner : event.target.checked })} />} label="Dinner" />
                </FormGroup>
                <Divider/>
                <FormGroup sx={{ ml : "13px" }}>
                    <FormControlLabel control={<Checkbox sx={{ width : "fit-content"}} checked={newPayAndEndDate.isPaidUp} onChange={(event) =>  setNewPayAndEndDate({...newPayAndEndDate , isPaidUp : event.target.checked })} />} label="Paid" />
                </FormGroup>
                <Divider/>
                <TextField multiline label="Note (optional)" onChange={(event) => setNewPayAndEndDate({...newPayAndEndDate , note : event.target.value })} />
                <Divider/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setNewPayAndEndDate(defaultNewPayAndEndDate);
                    setDateValue(null);
                    setOpen(false);
                }} variant="contained" >Cancel</Button>
                <Button onClick={handleCreatePayAndEndDate} variant="contained" 
                    disabled={!newPayAndEndDate.payDate || !newPayAndEndDate.payMonth 
                    || !newPayAndEndDate.payYear || !newPayAndEndDate.totalMonths 
                    || !newPayAndEndDate.price }
                >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePayAndEndDate;