import CompanyChange from "@/components/CompanyChange";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Divider, Typography } from "@mui/material"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const SettingPage  = () => {
    const [ open , setOpen ] = useState<boolean>(false);
    const company = useAppSelector(store => store.company.item);
    const data = useSession();

    if(!company) return null;
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , alignItems : "center" , gap : "20px" }}>
            <Typography variant="h5">Company Name : {company.name}</Typography>
            <Button variant="contained" onClick={() => setOpen(true)} sx={{ width : "260px"}}>Change Company Name</Button>
            <Divider sx={{ width : "330px"}} />
            {data && <Button onClick={() => signOut({ callbackUrl : "/app/signOption"})} variant="contained" sx={{ width : "260px"}}>Sign out</Button>}
            <CompanyChange open={open} setOpen={setOpen} />
        </Box>
    )
}


export default SettingPage;