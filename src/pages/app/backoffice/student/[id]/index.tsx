import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteStudent, updateStudent } from "@/store/slices/studentSlice";
import { UpdatedStudentOptions } from "@/types/student";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Student } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteWarning from "@/components/DeleteWarning";


const StudentEditPage = () => {
    const students = useAppSelector(store => store.student.items);
    const hostels = useAppSelector(store => store.hostel.items);
    const router = useRouter();
    const id = Number(router.query.id);
    const [ updatedStudent , setUpdatedStudent ] = useState<UpdatedStudentOptions>();
    const dispatch = useAppDispatch();
    const [ originalStudent , setOriginalStudent ] = useState<Student>();
    const [ openDelete , setOpenDelete ] = useState<boolean>(false);
    const payAndEndDates = useAppSelector(store => store.payAndEndDate.items);

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

    const handleDeleteStudent = () => {
      const payAndEndDatesThatShouldNotDelete = payAndEndDates.filter(item => item.studentId === originalStudent.id && !item.isPaidUp );
      if(payAndEndDatesThatShouldNotDelete.length) {
        // snap bar don't
        console.log(payAndEndDatesThatShouldNotDelete)
        alert("There are not paid up payments of this student! Please, paid up first.")
      } else {
        dispatch(deleteStudent({ id : originalStudent.id , onSuccess : () => {
          setOpenDelete(false)
          router.push("/app/backoffice/student");
        }}));
      }

    }

    return (
        <Box sx={{ p : "10px" , display : "flex" , flexDirection : "column" , gap : "10px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <Typography variant="h6">Student Edit</Typography>
                <DeleteOutlineRoundedIcon onClick={() => setOpenDelete(true)} sx={{ color : "error.dark" , fontSize : "30px" , border : "1px solid red" , p : "3px" , borderRadius : "7px" , cursor : "pointer"}} />
            </Box>
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
                  disabled={ !updatedStudent.name || !Number(updatedStudent.phone) || !updatedStudent.roomNumber || !updatedStudent.hostelId || isSame() } 
                >Update</Button>
            </Box>
            <Divider />
            <Box sx={{ display : "flex" }}>
              <Button variant="contained" onClick={() => router.push(`/app/backoffice/payment/${originalStudent.id}`)} >See Payments</Button>
            </Box>
            <DeleteWarning item="Student" handleDeleteFunction={handleDeleteStudent} openDelete={openDelete} setOpenDelete={setOpenDelete} />
        </Box>
        
    )
}
export default StudentEditPage;