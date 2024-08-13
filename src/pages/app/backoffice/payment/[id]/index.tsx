import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material"
import { PayAndEndDate, Student } from "@prisma/client";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const PaymentEditPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const students = useAppSelector(store => store.student.items);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ currentStudent , setCurrentStudent ] = useState<Student>();
    const [ currentPayAndEndDates , setCurrentPayAndEndDates ] = useState<PayAndEndDate[]>([]);

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
            <Typography variant="h6" >{currentStudent.name}</Typography>
            
        </Box>
    )
}

export default PaymentEditPage;