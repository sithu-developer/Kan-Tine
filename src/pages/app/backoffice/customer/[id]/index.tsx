import { useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Customer } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomerEditPage = () => {
    const customers = useAppSelector(store => store.customer.items);
    const hostels = useAppSelector(store => store.hostel.items);
    const router = useRouter();
    const id = Number(router.query.id);
    const [ updatedCustomer , setUpdatedCustomer ] = useState<Customer>();

    useEffect(() => {
        if(customers.length && id ) {
            const customer = customers.find(item => item.id === id)
            setUpdatedCustomer(customer)
        }
    } , [ customers , id ])

    
    if(!updatedCustomer) return null;

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Typography variant="h6">Customer Edit</Typography>
            <TextField label="name" defaultValue={updatedCustomer.name} />
            <TextField label="phone" defaultValue={updatedCustomer.phone} />
            <TextField label="room" defaultValue={updatedCustomer.roomNumber} />
            <TextField label="major (optional)" defaultValue={updatedCustomer.major} />
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
                <Button variant="contained">Update</Button>
            </Box>
        </Box>
        
    )
}
export default CustomerEditPage;