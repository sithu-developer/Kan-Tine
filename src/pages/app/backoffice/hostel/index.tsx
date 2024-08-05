import { useAppSelector } from "@/store/hooks";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

const HostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    
    if(!hostels.length) return null;

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Typography variant="h6">Hostels</Typography>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap"}}>
                {hostels.map(item =><Link  key={item.id} href={`/app/backoffice/hostel/${item.id}`} style={{ textDecoration : "none"}} > 
                    <Paper elevation={3} sx={{ width : "110px" , height : "110px" , display : "flex" , justifyContent : "center" , alignItems : "center" }} >
                        <Typography>{item.name}</Typography>
                    </Paper>
                </Link>
                )}
            </Box>
            
        </Box>

    )
}

export default HostelPage;