import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import BasicDatePicker from "./DatePicker";
import { useEffect, useState } from "react";
import {  CreatedCustomerOptions } from "@/types/customer";
import { Dayjs } from 'dayjs';


interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultNewCustomer : CreatedCustomerOptions = {
    name : "" , phone : "" , roomNumber : "" , major : null , totalMonths : 1
}

const CreateCustomer = ({ open , setOpen } : Props ) => {
    const [ newCustomer , setNewCustomer ] = useState<CreatedCustomerOptions>(defaultNewCustomer);
    const [ dateValue , setDateValue] = useState<Dayjs | null>(null);
    
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
            setDateValue(null);
        }} >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" }}>
                <TextField label="name" autoFocus onChange={(event) => setNewCustomer({...newCustomer , name : event.target.value})} sx={{ mt : "10px"}}  />
                <TextField label="Phone" onChange={(event) => setNewCustomer({...newCustomer , phone : event.target.value})} />
                <Box sx={{ display : "flex" , gap : "10px"}}>
                    <TextField label="Room" onChange={(event) => setNewCustomer({...newCustomer , roomNumber : event.target.value})} />
                    <TextField label="Major(optional)" onChange={(event) => setNewCustomer({...newCustomer , major : event.target.value})} />
                </Box>
                <BasicDatePicker setDateValue={setDateValue} dateValue={dateValue} />
                <TextField label="Total Pay Months" onChange={(event) => setNewCustomer({...newCustomer , totalMonths : Number(event.target.value) })} />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewCustomer(defaultNewCustomer);
                    setDateValue(null);
                }} variant="contained" >Cancel</Button>
                <Button onClick={() => console.log(newCustomer)} variant="contained" disabled={!newCustomer.name || !Number(newCustomer.phone) || !newCustomer.roomNumber || !newCustomer.totalMonths || !dateValue} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateCustomer;