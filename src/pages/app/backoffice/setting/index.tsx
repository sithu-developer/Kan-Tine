import CompanyChange from "@/components/CompanyChange";
import { Box, Button } from "@mui/material"
import { useState } from "react";

const SettingPage  = () => {
    const [ open , setOpen ] = useState<boolean>(false);

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , alignItems : "center" , gap : "20px" }}>
            
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ width : "300px"}}>Change Company Name</Button>
            <Button variant="contained"  sx={{ width : "300px"}}>Deleated Customers</Button>
            <CompanyChange open={open} setOpen={setOpen} />
        </Box>
    )
}


export default SettingPage;