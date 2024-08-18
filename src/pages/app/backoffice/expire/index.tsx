import { useAppSelector } from "@/store/hooks";
import { Box, Chip, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Student } from "@prisma/client";
import { useEffect, useState } from "react";

const ExpireStudentPage = () => {
    const [ condition , setCondition ] = useState('all');
    const [ selectedHostelId , setSelectedHostelId ] = useState<number>();
    const [ filteredStudents , setFilteredStudents ] = useState<Student[]>([]);
    const hostels = useAppSelector(store => store.hostel.items);
    const students = useAppSelector(store => store.student.items); // should check with payAndEndDate

    useEffect(() => {
        if(hostels.length) {
            setSelectedHostelId(hostels[0].id);
        }
    } , [ hostels ])

    useEffect(() => {
        if(condition && selectedHostelId) {
            if(condition === "all") {
                
            } else if(condition === "current") {
                
            } else if(condition === "expired") {
                
            }else if(condition === "done") {
                
            }
        }
    } , [ condition , selectedHostelId ])

    if(!selectedHostelId) return <Typography>No Hostel added</Typography>;
    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px" }}>
            <Box sx={{ display : "flex" , justifyContent : "center"}}>
                <ToggleButtonGroup
                  color="primary"
                  value={condition}
                  exclusive
                  onChange={(event , value) => setCondition(value)}
                >
                  <ToggleButton value="all">All</ToggleButton>
                  <ToggleButton value="current">Current</ToggleButton>
                  <ToggleButton value="expired">Expired</ToggleButton>
                  <ToggleButton value="done">Done</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display : "flex" , gap : "10px"}}>
                {hostels.map(item => <Chip key={item.id} variant="outlined" clickable sx={{ color : selectedHostelId === item.id ? "primary.main" : "" , borderColor : selectedHostelId === item.id ? "primary.main" : ""  , borderRadius : "7px"}} onClick={() => setSelectedHostelId(item.id)} label={item.name}/>
                )}
            </Box>
            <Box sx={{}}>
                
            </Box>
        </Box>
    )
}

export default ExpireStudentPage;