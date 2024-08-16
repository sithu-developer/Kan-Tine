import CreateHostel from "@/components/CreateHostel";
import { useAppSelector } from "@/store/hooks";
import { Box, Fab, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const HostelPage = () => {
    const hostels = useAppSelector(store => store.hostel.items);
    const [ open , setOpen ] = useState<boolean>(false);
    const [ search , setSearch ] = useState<string>("");
    const students = useAppSelector(store => store.student.items);
    
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center" }}>
                <span></span>
                <TextField sx={{ width : "280px" }} placeholder="search .." label="Hostels"
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
                {hostels.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => {
                    const exitSudents = students.filter(student => student.hostelId === item.id);
                    return (<Link  key={item.id} href={`/app/backoffice/hostel/${item.id}`} style={{ textDecoration : "none"}} > 
                      <Paper elevation={3} sx={{ opacity : exitSudents.length ? 1 : 0.5 , width : "100px" , p : "5px" , height : "90px" , display : "flex" , justifyContent : "center" , alignItems : "center" }} >
                          <Typography sx={{ textAlign : "center"}}>{item.name}</Typography>
                      </Paper>
                    </Link>)
                })}
            </Box>
            <CreateHostel open={open} setOpen={setOpen} />
        </Box>

    )
}

export default HostelPage;