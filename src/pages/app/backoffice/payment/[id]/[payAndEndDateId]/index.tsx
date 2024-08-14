import BasicDatePicker from "@/components/DatePicker";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material"
import { PayAndEndDate } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PayAndEndDateEditPage = () => {
    const router = useRouter();
    const payAndEndDateId = Number(router.query.payAndEndDateId);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ updatedPayAndEndDate , setUpdatedPayAndEndDate ] = useState<PayAndEndDate>();
    const [ updatedPayDate , setUpdatedPayDate ] = useState<Dayjs | null>(null);
    const [ originalPayAndEndDate , setOriginalPayAndEndDate ] = useState<PayAndEndDate>();

    useEffect(() => {
        if(updatedPayDate && updatedPayAndEndDate) {
            const payDate = updatedPayDate.date();
            const payMonth = updatedPayDate.month() + 1;
            const payYear = updatedPayDate.year();
            setUpdatedPayAndEndDate({...updatedPayAndEndDate , payDate , payMonth , payYear });
        }
    } , [ updatedPayDate ])

    useEffect(() => {
        if(payAndEndDateId && payAndEndDates.length) {
            const payAndEndDate = payAndEndDates.find(item => item.id === payAndEndDateId) as PayAndEndDate;
            setUpdatedPayAndEndDate(payAndEndDate);
            setOriginalPayAndEndDate(payAndEndDate);
            setUpdatedPayDate(dayjs(`${payAndEndDate.payYear}-${payAndEndDate.payMonth}-${payAndEndDate.payDate}`))
        }
    } , [ payAndEndDateId , payAndEndDates ]);

    if(!updatedPayAndEndDate) return null;
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Typography variant="h6">Payment Edit</Typography>
            <BasicDatePicker dateValue={updatedPayDate} setDateValue={setUpdatedPayDate} />
            <TextField defaultValue={updatedPayAndEndDate.totalMonths} label="Total months" />
            <TextField defaultValue={updatedPayAndEndDate.price} label="price" />
            <Divider/>
            <FormGroup sx={{ display : "flex" , flexDirection : "row" , justifyContent : "space-evenly" }}>
                <FormControlLabel control={<Checkbox defaultChecked={updatedPayAndEndDate.breakFast} />} label="Breakfast" />
                <FormControlLabel control={<Checkbox defaultChecked={updatedPayAndEndDate.lunch} />} label="Lunch" />
                <FormControlLabel control={<Checkbox defaultChecked={updatedPayAndEndDate.dinner} />} label="Dinner" />
            </FormGroup>
            <Divider/>
            <FormGroup sx={{ ml : "13px" }}>
                <FormControlLabel control={<Checkbox defaultChecked={updatedPayAndEndDate.isPaidUp} />} label="Paid" />
            </FormGroup>
            <Divider/>
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push(`/app/backoffice/payment/${updatedPayAndEndDate.studentId}`)}>Cancel</Button>
                <Button variant="contained" onClick={() => console.log(updatedPayAndEndDate)}  >Update</Button>
            </Box>
        </Box>
    )
}

export default PayAndEndDateEditPage;