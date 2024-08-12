import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateStudent } from "@/store/slices/studentSlice";
import { UpdatedStudentOptions } from "@/types/student";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Student } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StudentEditPage = () => {
    const students = useAppSelector(store => store.student.items);
    const hostels = useAppSelector(store => store.hostel.items);
    const router = useRouter();
    const id = Number(router.query.id);
    const [ updatedStudent , setUpdatedStudent ] = useState<UpdatedStudentOptions>();
    const dispatch = useAppDispatch();
    const [ originalStudent , setOriginalStudent ] = useState<Student>()

    useEffect(() => {
        if(students.length && id ) {
            const student = students.find(item => item.id === id)
            setUpdatedStudent(student);
            setOriginalStudent(student);
        }
    } , [ students , id ])

    
    if(!updatedStudent || !originalStudent) return null;

    const handleUpdateStudent = () => {
      dispatch(updateStudent({...updatedStudent , onSuccess : () => router.push("/app/backoffice/student")}))
    }

    const isSame = () => {
      return (updatedStudent.name === originalStudent.name && updatedStudent.phone === originalStudent.phone && updatedStudent.hostelId === originalStudent.hostelId && updatedStudent.roomNumber === originalStudent.roomNumber && updatedStudent.major === originalStudent.major) ? true : false;
    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Typography variant="h6">Student Edit</Typography>
            <TextField label="name" defaultValue={updatedStudent.name} onChange={(event) => setUpdatedStudent({...updatedStudent , name : event.target.value})} />
            <TextField label="phone" defaultValue={updatedStudent.phone} onChange={(event) => setUpdatedStudent({...updatedStudent , phone : event.target.value})} />
            <TextField label="room" defaultValue={updatedStudent.roomNumber} onChange={(event) => setUpdatedStudent({...updatedStudent , roomNumber : event.target.value})}  />
            <TextField label="major (optional)" defaultValue={updatedStudent.major} onChange={(event) => setUpdatedStudent({...updatedStudent , major : event.target.value})}  />
            <FormControl fullWidth>
              <InputLabel>Hostels</InputLabel>
              <Select
                value={updatedStudent.hostelId}
                label="Hostels"
                onChange={( event ) => setUpdatedStudent({...updatedStudent , hostelId : Number(event.target.value)}) }
              >
                {hostels.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> )}
              </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "10px"}}>
                <Button onClick={() => router.push("/app/backoffice/student")} variant="contained">Cancel</Button>
                <Button variant="contained" onClick={handleUpdateStudent} 
                disabled={ !updatedStudent.name || !Number(updatedStudent.phone) || !updatedStudent.roomNumber || !updatedStudent.hostelId || isSame() } >Update</Button>
            </Box>
        </Box>
        
    )
}
export default StudentEditPage;