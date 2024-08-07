import { useAppSelector } from "@/store/hooks";
import { Box, Button, Paper, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';



const CustomerPage = () => {
    const customers = useAppSelector(store => store.customer.items);
    
    if(!customers.length) return null;

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">Customers</Typography>
                <Button variant="contained" ><AddIcon /></Button>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap"}}>
                {customers.map(item => <Paper key={item.id} elevation={3} sx={{ width : "110px" , height : "100px" , display : "flex" , justifyContent : "center" , alignItems : "center" }}>
                <Typography sx={{ textAlign : "center"}}>{item.name}</Typography>
                </Paper>)}
            </Box>
        </Box>
    )
}

export default CustomerPage;