import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateHostel } from "@/store/slices/hostelSlice";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Hostel } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditHostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    const [ newHostel , setNewHostel ] = useState<Hostel>();
    const router = useRouter();
    const id = Number(router.query.id);
    const dispatch = useAppDispatch();
    
    
    useEffect(() => {
        if(hostels.length && id ) {
            const hostel = hostels.find(item => item.id === id);
            setNewHostel(hostel);
        }
    } , [ hostels , id ])

    
    
    if(!newHostel) return null;

    const handleUpdateHostel = () => {
        dispatch(updateHostel({...newHostel , onSuccess : () => router.push("/app/backoffice/hostel")}));
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Typography variant="h6" >Hostel Change</Typography>
            <TextField defaultValue={newHostel.name} label={"name"} onChange={(event) => setNewHostel({...newHostel , name : event.target.value})} />
            
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/hostel")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateHostel}>Comfirm</Button>
            </Box>
        </Box>
    )
}

export default EditHostelPage;