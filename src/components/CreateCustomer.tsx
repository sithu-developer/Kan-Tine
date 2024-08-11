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
    name : "" , phone : "" , roomNumber : "" , major : null  , hostelId : ""
}

const CreateCustomer = ({ open , setOpen } : Props ) => {
    const [ newCustomer , setNewCustomer ] = useState<CreatedCustomerOptions>(defaultNewCustomer);
    const hostels = useAppSelector(store => store.hostel.items);
    const dispatch = useAppDispatch();

    const handleCreateCustomer = () => {
        dispatch(createNewCustomer({...newCustomer , onSuccess : () => {
            setOpen(false);
            setNewCustomer(defaultNewCustomer);
        }}))
    }
    
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewCustomer(defaultNewCustomer);
        }} >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" , minWidth : "250px" }}>
                <TextField label="name" autoFocus onChange={(event) => setNewCustomer({...newCustomer , name : event.target.value})} sx={{ mt : "10px"}}  />
                <TextField label="Phone" onChange={(event) => setNewCustomer({...newCustomer , phone : event.target.value})} />
                <TextField label="Room" onChange={(event) => setNewCustomer({...newCustomer , roomNumber : event.target.value})} />
                <TextField label="Major(optional)" onChange={(event) => setNewCustomer({...newCustomer , major : event.target.value})} />
                <FormControl fullWidth>
                  <InputLabel>Hostels</InputLabel>
                  <Select
                    value={newCustomer.hostelId}
                    label="Hostels"
                    onChange={( event ) => setNewCustomer({...newCustomer , hostelId : Number(event.target.value)}) }
                  >
                    {hostels.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> )}
                  </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewCustomer(defaultNewCustomer);
                }} variant="contained" >Cancel</Button>
                <Button onClick={handleCreateCustomer} variant="contained" disabled={!newCustomer.name || !Number(newCustomer.phone) || !newCustomer.roomNumber || !newCustomer.hostelId} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateCustomer;