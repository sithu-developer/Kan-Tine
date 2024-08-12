import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateHostel } from "@/store/slices/hostelSlice";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Hostel } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditHostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    const [ updatedHostel , setUpdatedHostel ] = useState<Hostel>();
    const router = useRouter();
    const id = Number(router.query.id);
    const dispatch = useAppDispatch();
    const [ originalHostel , setOriginalHostel ] = useState<Hostel>();
    
    
    useEffect(() => {
        if(hostels.length && id ) {
            const hostel = hostels.find(item => item.id === id);
            setUpdatedHostel(hostel);
            setOriginalHostel(hostel);
        }
    } , [ hostels , id ])

    
    
    if(!updatedHostel || !originalHostel) return null;

    const handleUpdateHostel = () => {
        dispatch(updateHostel({...updatedHostel , onSuccess : () => router.push("/app/backoffice/hostel")}));
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Typography variant="h6" >Hostel Change</Typography>
            <TextField defaultValue={updatedHostel.name} label={"name"} onChange={(event) => setUpdatedHostel({...updatedHostel , name : event.target.value})} />
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/hostel")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateHostel} disabled={!updatedHostel.name || (updatedHostel.name === originalHostel.name )} >Update</Button>
            </Box>
        </Box>
    )
}

export default EditHostelPage;