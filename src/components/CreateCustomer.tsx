import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import BasicDatePicker from "./DatePicker";
import { useState } from "react";
import { CreatedCustomer } from "@/types/customer";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultNewCustomer : CreatedCustomer = {
    name : "" , phone : "" , roomNumber : "" , major : null
}

const CreateCustomer = ({ open , setOpen } : Props ) => {
    const [ newCustomer , setNewCustomer ] = useState<CreatedCustomer>(defaultNewCustomer);


    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" }}>
                <TextField label="name" autoFocus onChange={(event) => setNewCustomer({...newCustomer , name : event.target.value})} sx={{ mt : "10px"}}  />
                <TextField label="Phone" onChange={(event) => setNewCustomer({...newCustomer , phone : event.target.value})} />
                <Box sx={{ display : "flex" , gap : "10px"}}>
                    <TextField label="Room" onChange={(event) => setNewCustomer({...newCustomer , roomNumber : event.target.value})} />
                    <TextField label="Major(optional)" onChange={(event) => setNewCustomer({...newCustomer , major : event.target.value})} />
                </Box>
                <BasicDatePicker />
                <TextField label="Total Pay Months" />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant="contained" >Cancel</Button>
                <Button onClick={() => console.log(newCustomer)} variant="contained" >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateCustomer;