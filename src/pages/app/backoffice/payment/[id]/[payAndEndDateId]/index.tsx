import BasicDatePicker from "@/components/DatePicker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deletePayAndEndDate, updatePayAndEndDate } from "@/store/slices/payAndEndDateSlice";
import { UpdatedPayAndEndDateOptions } from "@/types/payAndEndDate";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material"
import { PayAndEndDate } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteWarning from "@/components/DeleteWarning";
import { setSnackBar } from "@/store/slices/snackBarSlice";

const PayAndEndDateEditPage = () => {
    const router = useRouter();
    const payAndEndDateId = Number(router.query.payAndEndDateId);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ updatedPayAndEndDate , setUpdatedPayAndEndDate ] = useState<UpdatedPayAndEndDateOptions>();
    const [ updatedPayDate , setUpdatedPayDate ] = useState<Dayjs | null>(null);
    const [ originalPayAndEndDate , setOriginalPayAndEndDate ] = useState<PayAndEndDate>();
    const dispatch = useAppDispatch();
    const [ openDelete , setOpenDelete ] = useState<boolean>(false);

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
            const payAndEndDate = payAndEndDates.find(item => item.id === payAndEndDateId);
            if(payAndEndDate) {
                setUpdatedPayAndEndDate(payAndEndDate);
                setOriginalPayAndEndDate(payAndEndDate);
                setUpdatedPayDate(dayjs(`${payAndEndDate.payYear}-${payAndEndDate.payMonth}-${payAndEndDate.payDate}`))
            }
        }
    } , [ payAndEndDateId , payAndEndDates ]);

    if(!updatedPayAndEndDate || !originalPayAndEndDate) return null;

    const handleUpdatePayAndEndDate = () => {
        dispatch(updatePayAndEndDate({...updatedPayAndEndDate , onSuccess : () => dispatch(setSnackBar({message : "This payment is successfully updated" , snackBarOpen : true }))}));
    }

    const handleDeletePayAndEndDate = () => {
        dispatch(deletePayAndEndDate({ id : originalPayAndEndDate.id , onSuccess : () => {
            router.push(`/app/backoffice/payment/${originalPayAndEndDate.studentId}`);
            dispatch(setSnackBar({message : "Payment is successfully Deleted" , snackBarOpen : true }))
        }}));
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <Typography variant="h6">Payment Edit</Typography>
                <DeleteOutlineRoundedIcon onClick={() => setOpenDelete(true)} sx={{ color : "error.dark" , fontSize : "30px" , border : "1px solid red" , p : "3px" , borderRadius : "7px" , cursor : "pointer"}} />
            </Box>
            <BasicDatePicker dateValue={updatedPayDate} setDateValue={setUpdatedPayDate} />
            <TextField defaultValue={updatedPayAndEndDate.totalMonths} label="Total months" onChange={(event) => setUpdatedPayAndEndDate({...updatedPayAndEndDate , totalMonths : Number(event.target.value)})} />
            <TextField defaultValue={updatedPayAndEndDate.price} label="price (kyat)" onChange={(event) => setUpdatedPayAndEndDate({...updatedPayAndEndDate , price : Number(event.target.value)})}  />
            <Divider/>
            <FormGroup sx={{ display : "flex" , flexDirection : "row" , ml : "13px" }}>
                <FormControlLabel control={<Checkbox checked={updatedPayAndEndDate.breakFast} onChange={(event) =>  setUpdatedPayAndEndDate({...updatedPayAndEndDate , breakFast : event.target.checked })} />} label="Breakfast" />
                <FormControlLabel control={<Checkbox checked={updatedPayAndEndDate.lunch} onChange={(event) =>  setUpdatedPayAndEndDate({...updatedPayAndEndDate , lunch : event.target.checked })} />} label="Lunch" />
                <FormControlLabel control={<Checkbox checked={updatedPayAndEndDate.dinner} onChange={(event) =>  setUpdatedPayAndEndDate({...updatedPayAndEndDate , dinner : event.target.checked })} />} label="Dinner" />
            </FormGroup>
            <Divider/>
            <FormGroup sx={{ ml : "13px" }}>
                <FormControlLabel control={<Checkbox checked={updatedPayAndEndDate.isPaidUp} onChange={(event) =>  setUpdatedPayAndEndDate({...updatedPayAndEndDate , isPaidUp : event.target.checked })} />} label="Paid" />
            </FormGroup>
            <Divider/>
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button variant="contained" onClick={() => router.push(`/app/backoffice/payment/${originalPayAndEndDate.studentId}`)}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdatePayAndEndDate} 
                    disabled={!updatedPayAndEndDate.totalMonths || 
                    (updatedPayAndEndDate.payDate === originalPayAndEndDate.payDate 
                    && updatedPayAndEndDate.payMonth === originalPayAndEndDate.payMonth 
                    && updatedPayAndEndDate.payYear === originalPayAndEndDate.payYear 
                    && updatedPayAndEndDate.totalMonths === originalPayAndEndDate.totalMonths 
                    && updatedPayAndEndDate.price === originalPayAndEndDate.price 
                    && updatedPayAndEndDate.breakFast === originalPayAndEndDate.breakFast 
                    && updatedPayAndEndDate.lunch === originalPayAndEndDate.lunch 
                    && updatedPayAndEndDate.dinner === originalPayAndEndDate.dinner 
                    && updatedPayAndEndDate.isPaidUp === originalPayAndEndDate.isPaidUp )} 
                >Update</Button>
            </Box>
            <DeleteWarning item="Payment" handleDeleteFunction={handleDeletePayAndEndDate} openDelete={openDelete} setOpenDelete={setOpenDelete} />
        </Box>
    )
}

export default PayAndEndDateEditPage;