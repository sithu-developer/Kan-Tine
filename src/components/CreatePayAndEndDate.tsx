import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import BasicDatePicker from "./DatePicker";
import { useEffect, useState } from "react";
import {  CreatedCustomerOptions } from "@/types/customer";
import { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewCustomer } from "@/store/slices/customerSlice";


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultNewCustomer : CreatedCustomerOptions = {
    name : "" , phone : "" , roomNumber : "" , major : null , totalMonths : 1  , hostelId : ""
}

const CreatePayAndEndDate = ({ open , setOpen } : Props ) => {
    const [ newCustomer , setNewCustomer ] = useState<CreatedCustomerOptions>(defaultNewCustomer); // need to change
    const [ dateValue , setDateValue] = useState<Dayjs | null>(null);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        if(dateValue) {
            const payDate = dateValue.date();
            const payMonth = dateValue.month() + 1;
            const payYear = dateValue.year();
            setNewCustomer({...newCustomer , payDate , payMonth , payYear });
        }
    } , [ dateValue ]);

    
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewCustomer(defaultNewCustomer);
        }} >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" }}>
                <BasicDatePicker setDateValue={setDateValue} dateValue={dateValue} />
                <TextField label="Total Pay Months" onChange={(event) => setNewCustomer({...newCustomer , totalMonths : Number(event.target.value) })} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewCustomer(defaultNewCustomer);
                    setDateValue(null);
                }} variant="contained" >Cancel</Button>
                <Button onClick={() => {}} variant="contained" disabled={!newCustomer.name || !Number(newCustomer.phone) || !newCustomer.roomNumber || !newCustomer.totalMonths || !dateValue || !newCustomer.hostelId} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePayAndEndDate;