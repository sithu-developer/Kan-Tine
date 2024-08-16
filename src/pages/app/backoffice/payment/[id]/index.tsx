import { useAppSelector } from "@/store/hooks";
import { Box, Button, Chip, Fab, Typography } from "@mui/material"
import { PayAndEndDate, Student } from "@prisma/client";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PriceCheckRoundedIcon from '@mui/icons-material/PriceCheckRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import CreatePayAndEndDate from "@/components/CreatePayAndEndDate";

const PaymentEditPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const students = useAppSelector(store => store.student.items);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ currentStudent , setCurrentStudent ] = useState<Student>();
    const [ currentPayAndEndDates , setCurrentPayAndEndDates ] = useState<PayAndEndDate[]>([]);
    const [ open , setOpen ] = useState(false);

    useEffect(() => {
        if(id && students.length ) {
            const student = students.find(item => item.id === id);
            if(student) {
                setCurrentStudent(student);
                const filteredPayAndEndDates = payAndEndDates.filter(item => item.studentId === student.id );
                setCurrentPayAndEndDates(filteredPayAndEndDates);
            }
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
            {currentPayAndEndDates.length ? 
            currentPayAndEndDates.map(item => <Box key={item.id} sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center", bgcolor : "secondary.light" , borderRadius : "5px" , p : "10px"}}>
                {item.isPaidUp ? <PriceCheckRoundedIcon sx={{ color : "success.main" , fontSize : "28px" }} /> : <StrikethroughSRoundedIcon sx={{ color : "error.main" , fontSize : "23px" }} />}
                <Box sx={{ display : "flex" , alignItems : "center" }}>
                    <Chip label={item.payMonth + "/" + item.payDate + "/" + item.payYear} sx={{ bgcolor : "primary.main" , color : "white"}} />
                    <ArrowRightAltIcon />
                    <Chip label={item.endMonth + "/" + item.payDate + "/" + item.endYear} sx={{ bgcolor : "primary.main" , color : "white"}} />
                </Box>
                <Chip label={item.price + " K"} sx={{bgcolor : "primary.main" , color : "white" , minWidth : "60px"}} />
                <EditRoundedIcon  onClick={() => router.push({ pathname : router.pathname + `/${item.id}`})} sx={{ color : "white" , fontSize : "20px" , bgcolor : "primary.main" , p : "4px" , borderRadius : "7px" , cursor : "pointer"}} />
            </Box> ) 
            : <Chip label="No Payment" sx={{ bgcolor : "primary.dark" , color : "white" , fontSize : "20px" , height : "50px"}} />}
            <Box>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/payment")} >Back</Button>
            </Box>
            <CreatePayAndEndDate studentId={currentStudent.id} setOpen={setOpen} open={open} />
        </Box>
    )
}

export default PaymentEditPage;