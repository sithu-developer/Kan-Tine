import CreateHostel from "@/components/CreateHostel";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const HostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    const [ open , setOpen ] = useState<boolean>(false);
    
    if(!hostels.length) return null;

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">Hostels</Typography>
                <Button variant="contained" onClick={() => setOpen(true)} ><AddIcon /></Button>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap"}}>
                {hostels.map(item =><Link  key={item.id} href={`/app/backoffice/hostel/${item.id}`} style={{ textDecoration : "none"}} > 
                    <Paper elevation={3} sx={{ width : "110px" , height : "100px" , display : "flex" , justifyContent : "center" , alignItems : "center" }} >
                        <Typography>{item.name}</Typography>
                    </Paper>
                </Link>
                )}
            </Box>
            <CreateHostel open={open} setOpen={setOpen} />
        </Box>

    )
}

export default HostelPage;