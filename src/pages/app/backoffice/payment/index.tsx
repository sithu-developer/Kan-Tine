import { useAppSelector } from "@/store/hooks";
import { Box, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



const PaymentPage = () => {
    const students = useAppSelector(store => store.student.items);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ search , setSearch ] = useState<string>("");

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px" }}>
            <Box sx={{ display : "flex" , justifyContent : "center" }}>
                <TextField sx={{ width : "280px" }} placeholder="search .." label="Students"
                  onChange={(event) => setSearch(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap" }}>
                {students.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => {
                    const notDonePayment = payAndEndDates.filter(payAndEndDate => payAndEndDate.studentId === item.id && payAndEndDate.isDone === false);
                    return <Link key={item.id} href={`/app/backoffice/payment/${item.id}`} style={{ textDecoration : "none"}} > 
                        <Paper  elevation={3} sx={{ opacity : notDonePayment.length ? 1 : 0.5 , border : "1px solid blue" , width : "100px" , p : "5px" , height : "100px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" }}>
                            <Typography sx={{ textAlign : "center"}} >{item.name}</Typography>
                            <Typography sx={{textAlign : "center"}}>( Payment )</Typography>
                        </Paper>
                    </Link>}
                )}
            </Box>
        </Box>
    )
}

export default PaymentPage;