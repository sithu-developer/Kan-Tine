import { useAppSelector } from "@/store/hooks";
import { Box, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";

const ExpireStudentPage = () => {
    const [ condition , setCondition ] = useState('all');
    const [ selectedHostelId , setSelectedHostelId ] = useState<number>();
    const hostels = useAppSelector(store => store.hostel.items);

    useEffect(() => {
        if(hostels.length) {
            setSelectedHostelId(hostels[0].id);
        }
    } , [ hostels ])

    if(!selectedHostelId) return null;
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
                {hostels.map(item => <Chip key={item.id} clickable sx={{ bgcolor : selectedHostelId === item.id ? "secondary.main" : "" , borderRadius : "7px"}} onClick={() => setSelectedHostelId(item.id)} label={item.name}/>
                )}
            </Box>
        </Box>
    )
}

export default ExpireStudentPage;