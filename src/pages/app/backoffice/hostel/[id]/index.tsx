import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteHostel, updateHostel } from "@/store/slices/hostelSlice";
import { setSnackBar } from "@/store/slices/snackBarSlice";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Hostel } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteWarning from "@/components/DeleteWarning";


const EditHostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    const [ updatedHostel , setUpdatedHostel ] = useState<Hostel>();
    const router = useRouter();
    const id = Number(router.query.id);
    const dispatch = useAppDispatch();
    const [ originalHostel , setOriginalHostel ] = useState<Hostel>();
    const [ openDelete , setOpenDelete ] = useState<boolean>(false);
    const students = useAppSelector(store => store.student.items);
    
    
    useEffect(() => {
        if(hostels.length && id ) {
            const hostel = hostels.find(item => item.id === id);
            setUpdatedHostel(hostel);
            setOriginalHostel(hostel);
        }
    } , [ hostels , id ])

    
    
    if(!updatedHostel || !originalHostel) return null;

    const handleUpdateHostel = () => {
        dispatch(updateHostel({...updatedHostel , onSuccess : () => dispatch(setSnackBar({message : "Hostel name is successfully changed" , snackBarOpen : true }))}));
    }

    const handleDeleteHostel = () => {
        const relatedStudents = students.filter(item => item.hostelId === originalHostel.id);
        console.log(relatedStudents)
        if(relatedStudents.length) {
            dispatch(setSnackBar({ message : "Can't delete! It have Related students!" , snackBarOpen : true , forFail : true }))
        } else {
            dispatch(deleteHostel({ id : originalHostel.id , onSuccess : () => {
                dispatch(setSnackBar({ message : originalHostel.name + " is successfully deleted." , snackBarOpen : true }))
                router.push("/app/backoffice/hostel");
            } }))
        }
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6" >Hostel Change</Typography>
                <DeleteOutlineRoundedIcon onClick={() => setOpenDelete(true)} sx={{ color : "error.dark" , fontSize : "30px" , border : "1px solid red" , p : "3px" , borderRadius : "7px" , cursor : "pointer"}} />
            </Box>
            <TextField defaultValue={updatedHostel.name} label={"name"} onChange={(event) => setUpdatedHostel({...updatedHostel , name : event.target.value})} />
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/hostel")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateHostel} disabled={!updatedHostel.name || (updatedHostel.name === originalHostel.name )} >Update</Button>
            </Box>
            <DeleteWarning openDelete={openDelete} setOpenDelete={setOpenDelete} item="Hostel" handleDeleteFunction={handleDeleteHostel}  />
        </Box>
    )
}

export default EditHostelPage;