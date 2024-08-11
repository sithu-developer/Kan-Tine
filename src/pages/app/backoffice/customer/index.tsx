import { useAppSelector } from "@/store/hooks";
import { Box, Button, Paper, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CreateCustomer from "@/components/CreateCustomer";
import Link from "next/link";



const CustomerPage = () => {
    const customers = useAppSelector(store => store.customer.items);
    const [ open , setOpen ] = useState<boolean>(false);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    
    if(!customers.length) return null;

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">Customers</Typography>
                <AddIcon onClick={() => setOpen(true)} sx={{ bgcolor : "primary.main" , borderRadius : "5px" , color : "white" , p : "6px" , cursor : "pointer"}} />
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap"}}>
                {customers.map(item => {
                    const notDoneDate = payAndEndDates.filter(payAndEndDate => payAndEndDate.customerId === item.id && payAndEndDate.isDone === false);
                    console.log(notDoneDate , item.id)
                    return (<Link key={item.id} href={`/app/backoffice/customer/${item.id}`} style={{ textDecoration : "none"}}>
                        <Paper elevation={3} sx={{opacity : notDoneDate.length ? 1 : 0.5  , width : "110px" , height : "100px" , display : "flex" , justifyContent : "center" , alignItems : "center" }}>
                            <Typography sx={{ textAlign : "center"}}>{item.name}</Typography>
                        </Paper>
                    </Link>)
                })}
            </Box>
            <CreateCustomer open={open} setOpen={setOpen} />
        </Box>
    )
}

export default CustomerPage;