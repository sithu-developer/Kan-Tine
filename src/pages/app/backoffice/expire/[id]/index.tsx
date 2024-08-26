import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { isDonePayAndEndDate } from "@/store/slices/payAndEndDateSlice";
import { setSnackBar } from "@/store/slices/snackBarSlice";
import { Box, Button, Checkbox, Chip, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { PayAndEndDate, Student } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const PaymentDetail = () => {
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const students = useAppSelector(store => store.student.items);
    const router = useRouter();
    const id = Number(router.query.id);
    const condition = String(router.query.condition);
    const [ checkedPayAndEndDate , setCheckedPayAndEndDate ] = useState<PayAndEndDate>();
    const [ checkedStudent , setCheckedStudent ] = useState<Student>()
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id && students.length && payAndEndDates.length) {
            const payment = payAndEndDates.find(item => item.id === id);
            if(payment) {
                const student = students.find(item => item.id === payment.studentId)
                setCheckedPayAndEndDate(payment);
                setCheckedStudent(student);
            }
        }
    } , [ id , students , payAndEndDates ])


    if(!checkedPayAndEndDate || !checkedStudent) return <Typography>wait</Typography>

    const handleIsDonePayAndEndDate = () => {
        if( !checkedPayAndEndDate.isPaidUp ) {
            dispatch(setSnackBar({message : "Cannot move not-paid payment!" , snackBarOpen : true , forFail : true }))
        }  else {
            dispatch(isDonePayAndEndDate({ id , onSuccess : () =>{
                dispatch(setSnackBar({ message : checkedStudent.name + "'s payment is successfully moved to Done" , snackBarOpen : true}));
                router.push("/app/backoffice/expire");
            } }))
        }
    }
    
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <TableContainer>
                <Table size="small" >
                    <TableBody>
                        <TableRow>
                            <TableCell><Typography variant="h6">Name </Typography></TableCell>
                            <TableCell><Typography variant="h6">{checkedStudent.name}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Room </Typography></TableCell>
                            <TableCell><Typography>{checkedStudent.roomNumber}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Phone</Typography></TableCell>
                            <TableCell><Link style={{ textDecoration : "none"}} href={`tel:${checkedStudent.phone}`}><Typography>{checkedStudent.phone}</Typography></Link></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Major</Typography></TableCell>
                            <TableCell><Typography>{checkedStudent.major ? checkedStudent.major : "Not added"}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Pay Date</Typography></TableCell>
                            <TableCell><Chip label={checkedPayAndEndDate.payMonth + "/" + checkedPayAndEndDate.payDate + "/" + checkedPayAndEndDate.payYear} sx={{ bgcolor : "secondary.main"}} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Expire Date</Typography></TableCell>
                            <TableCell><Chip label={checkedPayAndEndDate.endMonth + "/" + checkedPayAndEndDate.endDate + "/" + checkedPayAndEndDate.endYear} sx={{ bgcolor : "secondary.main"}}  /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Total months</Typography></TableCell>
                            <TableCell><Typography>{checkedPayAndEndDate.totalMonths}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Price</Typography></TableCell>
                            <TableCell><Typography>{checkedPayAndEndDate.price} Kyats</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>Is Paid</Typography></TableCell>
                            <TableCell><Typography sx={{ color : checkedPayAndEndDate.isPaidUp ? "success.main" : "error.main"}}>{checkedPayAndEndDate.isPaidUp ? "Paid" : "Not Paid"}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Box sx={{ display : "flex" , gap : "5px"}}>
                                    <FormControlLabel control={<Checkbox checked={checkedPayAndEndDate.breakFast} />} label="Breakfast" />
                                    <FormControlLabel control={<Checkbox checked={checkedPayAndEndDate.lunch} />} label="Lunch" />
                                    <FormControlLabel control={<Checkbox checked={checkedPayAndEndDate.dinner} />} label="Dinner" />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TextField disabled label="Note" value={checkedPayAndEndDate.note} multiline />
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/app/backoffice/expire")}>Exit</Button>
                {condition === "expired" 
                && <Button variant="outlined" color="info" onClick={handleIsDonePayAndEndDate} >Move to Done</Button>}
            </Box>
        </Box>
    )
}

export default PaymentDetail;