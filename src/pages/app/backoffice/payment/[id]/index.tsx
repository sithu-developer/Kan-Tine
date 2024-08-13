import { useAppSelector } from "@/store/hooks";
import { Box, Chip, Fab, Typography } from "@mui/material"
import { PayAndEndDate, Student } from "@prisma/client";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const PaymentEditPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const students = useAppSelector(store => store.student.items);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ currentStudent , setCurrentStudent ] = useState<Student>();
    const [ currentPayAndEndDates , setCurrentPayAndEndDates ] = useState<PayAndEndDate[]>([]);
    const [ open , setOpen ] = useState(false);

    useEffect(() => {
        if(id && students.length && payAndEndDates.length) {
            const student = students.find(item => item.id === id) as Student;
            setCurrentStudent(student);
            const filteredPayAndEndDates = payAndEndDates.filter(item => item.studentId === student.id );
            setCurrentPayAndEndDates(filteredPayAndEndDates);
        }
    } , [ id , students , payAndEndDates ])

    if(!currentStudent) return null;
    return (
        <Box sx={{ p : "10px" , display :"flex" , flexDirection : "column" , gap : "10px" }}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <Typography variant="h6" >{currentStudent.name} 's Payments</Typography>
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon onClick={() => setOpen(true)}  />
                </Fab>
            </Box>
            {currentPayAndEndDates.map(item => <Box key={item.id} sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center", bgcolor : "secondary.light" , borderRadius : "5px" , p : "10px"}}>
                {item.isPaidUp ? <CheckCircleOutlineRoundedIcon sx={{ color : "success.main"}} /> : <CancelRoundedIcon />}
                <Box sx={{ display : "flex" , alignItems : "center" }}>
                    <Chip label={item.payDate + "/" + item.payMonth + "/" + item.payYear} sx={{ bgcolor : "primary.main" , color : "white"}} />
                    <ArrowRightAltIcon />
                    <Chip label={item.endDate + "/" + item.endMonth + "/" + item.endYear} sx={{ bgcolor : "primary.main" , color : "white"}} />
                </Box>
                <Chip label={item.price + " K"} sx={{bgcolor : "primary.main" , color : "white" , minWidth : "80px"}} />
                <EditRoundedIcon  onClick={() => router.push({ pathname : router.pathname + `/${item.id}`})} sx={{ color : "white" , fontSize : "20px" , bgcolor : "primary.main" , p : "3px" , borderRadius : "7px"}} />
            </Box> )}
            
            
        </Box>
    )
}

export default PaymentEditPage;