import { useAppSelector } from "@/store/hooks";
import { Box, Fab, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CreateStudent from "@/components/CreateStudent";
import Link from "next/link";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';




const StudentPage = () => {
    const students = useAppSelector(store => store.student.items);
    const [ open , setOpen ] = useState<boolean>(false);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);
    const [ search , setSearch ] = useState<string>("");
    

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <span></span>
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
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon onClick={() => setOpen(true)}  />
                </Fab>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px" , flexWrap : "wrap"}}>
                {students.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => {
                    const notDonePayment = payAndEndDates.filter(payAndEndDate => payAndEndDate.studentId === item.id && payAndEndDate.isDone === false);
                    return (<Link key={item.id} href={`/app/backoffice/student/${item.id}`} style={{ textDecoration : "none"}}>
                        <Paper elevation={3} sx={{opacity : notDonePayment.length ? 1 : 0.5 , bgcolor : "secondary.light" , width : "95px" , p : "5px" , height : "90px" , display : "flex" , justifyContent : "center" , alignItems : "center"  }}>
                            <Typography sx={{ textAlign : "center"}}>{item.name}</Typography>
                        </Paper>
                    </Link>)
                })}
            </Box>
            <CreateStudent open={open} setOpen={setOpen} />
        </Box>
    )
}

export default StudentPage;