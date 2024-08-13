import { useAppSelector } from "@/store/hooks";
import { Box, TextField } from "@mui/material"
import { PayAndEndDate } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PayAndEndDateEditPage = () => {
    const router = useRouter();
    const payAndEndDateId = Number(router.query.payAndEndDateId);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ updatedPayAndEndDate , setUpdatedPayAndEndDate ] = useState<PayAndEndDate>();

    useEffect(() => {
        if(payAndEndDateId && payAndEndDates.length) {
            const payAndEndDate = payAndEndDates.find(item => item.id === payAndEndDateId);
            setUpdatedPayAndEndDate(payAndEndDate);
        }
    } , [ payAndEndDateId , payAndEndDates ])
    console.log(updatedPayAndEndDate)

    if(!updatedPayAndEndDate) return null;
    return (
        <Box sx={{ p : "10px"}}>
            <TextField defaultValue={updatedPayAndEndDate.price} label="price" />
        </Box>
    )
}

export default PayAndEndDateEditPage;