import { useAppSelector } from "@/store/hooks";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";


const PaymentPage = () => {
    const students = useAppSelector(store => store.student.items);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px" }}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">Payments</Typography>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap" }}>
                {students.map(item => {
                    const notDonePayment = payAndEndDates.filter(payAndEndDate => payAndEndDate.studentId === item.id && payAndEndDate.isDone === false);
                    return <Link key={item.id} href={`/app/backoffice/payment/${item.id}`} style={{ textDecoration : "none"}} > 
                        <Paper  elevation={3} sx={{ opacity : notDonePayment.length ? 1 : 0.5 , width : "110px" , height : "100px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" }}>
                            <Typography variant="h6" sx={{textAlign : "center"}}>Payment</Typography>
                            <Typography sx={{textAlign : "center"}}>for</Typography>
                            <Typography sx={{ textAlign : "center"}} >{item.name}</Typography>
                        </Paper>
                    </Link>}
                )}
            </Box>
        </Box>
    )
}

export default PaymentPage;