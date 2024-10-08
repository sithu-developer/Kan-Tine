import { useAppSelector } from "@/store/hooks";
import { Box, Chip, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Hostel, PayAndEndDate } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ExpireStudentPage = () => {
    const [ condition , setCondition ] = useState('current');
    const [ selectedHostelId , setSelectedHostelId ] = useState<number>();
    const [ filteredPayments , setFilteredPayments ] = useState<PayAndEndDate[]>([]);
    const hostels = useAppSelector(store => store.hostel.items);
    const students = useAppSelector(store => store.student.items);
    const payAndEndDate = useAppSelector(store => store.payAndEndDate.items);
    const router = useRouter();
    
    useEffect(() => {
        if(hostels.length) {
            setSelectedHostelId(hostels[0].id);
        }
    } , [ hostels ])

    useEffect(() => {
        if(condition && selectedHostelId) {
            const now = new Date();
            const currentTime = now.getTime();

            if(condition === "current") {
                const currentPayments = payAndEndDate.filter(item => {
                    now.setFullYear(item.payYear , item.payMonth - 1 , item.payDate);
                    const payTime = now.getTime();
                    now.setFullYear(item.endYear , item.endMonth - 1 , item.endDate);
                    const endTime = now.getTime();
                    if(payTime <= currentTime && currentTime < endTime && !item.isDone ) {
                        return item;
                    }
                });
                const selectedHostelStudentIds = students.filter(item => item.hostelId === selectedHostelId).map(item => item.id);
                const currentHostelPayments = currentPayments.filter(item => selectedHostelStudentIds.includes(item.studentId))
                setFilteredPayments(currentHostelPayments);
            
            } else if(condition === "expired") {
                const expiredPayments = payAndEndDate.filter(item => {
                    now.setFullYear(item.endYear , item.endMonth - 1 , item.endDate);
                    const endTime = now.getTime();
                    if(  endTime <= currentTime && !item.isDone ) {
                        return item;
                    }
                }).sort(( a , b ) => a.studentId - b.studentId );
                const selectedHostelStudentIds = students.filter(item => item.hostelId === selectedHostelId).map(item => item.id);
                const expiredHostelPayments = expiredPayments.filter(item => selectedHostelStudentIds.includes(item.studentId))
                setFilteredPayments(expiredHostelPayments);
            }else if(condition === "done") {
                const donePayments = payAndEndDate.filter(item => item.isDone ).sort(( a , b ) => a.studentId - b.studentId);
                const selectedHostelStudentIds = students.filter(item => item.hostelId === selectedHostelId).map(item => item.id);
                const doneHostelPayments = donePayments.filter(item => selectedHostelStudentIds.includes(item.studentId));
                setFilteredPayments(doneHostelPayments);
            }
        }
    } , [ condition , selectedHostelId ])

    if(!selectedHostelId) return <Box sx={{ display : "flex" , justifyContent : "center" , pt : "40px" }}><Chip label="No Hostel created" sx={{bgcolor : "info.main" , p : "20px" , fontSize : "20px"}} /></Box>;
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px" }}>
            <Box sx={{ display : "flex" , justifyContent : "center"}}>
                
                <ToggleButtonGroup
                  color="primary"
                  value={condition}
                  exclusive
                  onChange={(event , value) => setCondition(value)}
                >
                  <ToggleButton value="current">Current</ToggleButton>
                  <ToggleButton value="expired">Expired</ToggleButton>
                  <ToggleButton value="done">Done</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , overflowX : "auto"}}>
                {hostels.map(item => <Chip key={item.id} variant="outlined" clickable sx={{ color : selectedHostelId === item.id ? "primary.main" : "" , borderColor : selectedHostelId === item.id ? "primary.main" : ""  , borderRadius : "7px"}} onClick={() => setSelectedHostelId(item.id)} label={item.name}/>
                )}
            </Box>
            
            <Box sx={{ display : "flex" , flexDirection : "column" ,  gap : "10px" }}>
                {filteredPayments.length ? filteredPayments.map(item => {
                    const currentStudent = students.find(student => student.id === item.studentId);
                    if(currentStudent)
                    return (
                        <Link  key={item.id} href={`${router.pathname}/${item.id}?condition=${condition}`} style={{ textDecoration : "none"}}>
                            <Paper variant="outlined" sx={{ borderColor : condition === "expired" ? "error.main" : "secondary.main" , bgcolor : item.isDone ? "lightgray" : ""   , p : "8px"  , display : "flex"  , justifyContent : "space-between" , alignItems : "center" }}>
                                <Typography>{currentStudent.name}</Typography>
                                <Typography>R-{currentStudent.roomNumber}</Typography>
                                <Box sx={{ display : "flex"}}>
                                    <Chip label={"Exp-" + item.endMonth + "/" + item.endDate + "/" + item.endYear} sx={{ bgcolor : "secondary.light" }} />
                                </Box>
                            </Paper>
                        </Link>
                    )
                })
                : <Typography>No {condition} payment in {(hostels.find(item => item.id === selectedHostelId) as Hostel).name}.</Typography>}
            </Box>
        </Box>
    )
}

export default ExpireStudentPage;