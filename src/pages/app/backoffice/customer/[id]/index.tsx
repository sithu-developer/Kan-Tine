import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCustomer } from "@/store/slices/customerSlice";
import { UpdatedCustomerOptions } from "@/types/customer";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Customer } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomerEditPage = () => {
    const customers = useAppSelector(store => store.customer.items);
    const hostels = useAppSelector(store => store.hostel.items);
    const router = useRouter();
    const id = Number(router.query.id);
    const [ updatedCustomer , setUpdatedCustomer ] = useState<UpdatedCustomerOptions>();
    const dispatch = useAppDispatch();
    const [ originalCustomer , setOriginalCustomer ] = useState<Customer>()

    useEffect(() => {
        if(customers.length && id ) {
            const customer = customers.find(item => item.id === id)
            setUpdatedCustomer(customer);
            setOriginalCustomer(customer);
        }
    } , [ customers , id ])

    
    if(!updatedCustomer || !originalCustomer) return null;

    const handleUpdateCustomer = () => {
      dispatch(updateCustomer({...updatedCustomer , onSuccess : () => router.push("/app/backoffice/customer")}))
    }

    const isSame = () => {
      return (updatedCustomer.name === originalCustomer.name && updatedCustomer.phone === originalCustomer.phone && updatedCustomer.hostelId === originalCustomer.hostelId && updatedCustomer.roomNumber === originalCustomer.roomNumber && updatedCustomer.major === originalCustomer.major) ? true : false;
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Typography variant="h6">Customer Edit</Typography>
            <TextField label="name" defaultValue={updatedCustomer.name} onChange={(event) => setUpdatedCustomer({...updatedCustomer , name : event.target.value})} />
            <TextField label="phone" defaultValue={updatedCustomer.phone} onChange={(event) => setUpdatedCustomer({...updatedCustomer , phone : event.target.value})} />
            <TextField label="room" defaultValue={updatedCustomer.roomNumber} onChange={(event) => setUpdatedCustomer({...updatedCustomer , roomNumber : event.target.value})}  />
            <TextField label="major (optional)" defaultValue={updatedCustomer.major} onChange={(event) => setUpdatedCustomer({...updatedCustomer , major : event.target.value})}  />
            <FormControl fullWidth>
              <InputLabel>Hostels</InputLabel>
              <Select
                value={updatedCustomer.hostelId}
                label="Hostels"
                onChange={( event ) => setUpdatedCustomer({...updatedCustomer , hostelId : Number(event.target.value)}) }
              >
                {hostels.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> )}
              </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button onClick={() => router.push("/app/backoffice/customer")} variant="contained">Cancel</Button>
                <Button variant="contained" onClick={handleUpdateCustomer} 
                disabled={ !updatedCustomer.name || !Number(updatedCustomer.phone) || !updatedCustomer.roomNumber || !updatedCustomer.hostelId || isSame() } >Update</Button>
            </Box>
        </Box>
        
    )
}
export default CustomerEditPage;