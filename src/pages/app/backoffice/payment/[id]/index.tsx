import { useAppSelector } from "@/store/hooks";
import { Box, Button, Chip, Fab, Typography } from "@mui/material"
import { PayAndEndDate, Student } from "@prisma/client";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PriceCheckRoundedIcon from '@mui/icons-material/PriceCheckRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import CreatePayAndEndDate from "@/components/CreatePayAndEndDate";
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';


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
                <Typography variant="h6" >{currentStudent.name} &apos;s Payments</Typography>
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon onClick={() => setOpen(true)}  />
                </Fab>
            </Box>
            {currentPayAndEndDates.length ? 
            currentPayAndEndDates.sort(( a , b ) => b.id - a.id ).map(item => {
                const date = new Date();
                const nowTime = date.getTime();
                date.setFullYear(item.endYear , item.endMonth - 1 , item.endDate);
                const endTime = date.getTime();
            return <Box key={item.id} sx={{ border : endTime <= nowTime   && !item.isDone ? "1.5px solid red" : "1px solid gray" , display : "flex" , justifyContent : "space-between" , alignItems : "center", bgcolor : item.isDone ? "lightgray" : ( endTime <= nowTime   && !item.isDone ? "" :  "secondary.light") , borderRadius : "5px" , p : "8px"}}>
                {item.isPaidUp ? <PriceCheckRoundedIcon sx={{ color : "success.main" , fontSize : "28px" }} /> : <StrikethroughSRoundedIcon sx={{ color : "error.main" , fontSize : "23px" }} />}
                <Box sx={{ display : "flex" , alignItems : "center" }}>
                    <Box>
                        <Chip label={item.payMonth + "/" + item.payDate + "/" + item.payYear} sx={{ bgcolor : "primary.dark" , color : "white"}} />
                    </Box>
                    <ForwardRoundedIcon sx={{ fontSize : "19px"}}/>
                    <Box>
                        <Chip label={item.endMonth + "/" + item.endDate + "/" + item.endYear} sx={{ bgcolor : "primary.dark" , color :  endTime <= nowTime   && !item.isDone ? "error.main": "white"}} />
                    </Box>
                </Box>
                <Box>
                    <Chip label={item.price + " K"} sx={{bgcolor : "primary.dark" , color : "white" , minWidth : "60px"}} />
                </Box>
                <EditRoundedIcon  onClick={() => router.push({ pathname : router.pathname + "/" + item.id})} sx={{ color : "white" , fontSize : "20px" , bgcolor : "primary.main" , p : "4px" , borderRadius : "7px" , cursor : "pointer"}} />
            </Box>} ) 
            : <Chip label="No Payment" sx={{ bgcolor : "primary.dark" , color : "white" , fontSize : "20px" , height : "50px"}} />}
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/payment")} >Exit</Button>
                <Button variant="contained" onClick={() => router.push(`/app/backoffice/student/${currentStudent.id}`)} ><Face6OutlinedIcon sx={{ color : "darkgray" , pr : "10px"}} /> <Typography>To Student</Typography></Button>
            </Box>
            <CreatePayAndEndDate studentId={currentStudent.id} setOpen={setOpen} open={open} />
        </Box>
    )
}

export default PaymentEditPage;