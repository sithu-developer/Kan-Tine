import { useAppSelector } from "@/store/hooks";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { Company } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}
const CompanyChange = ( { open , setOpen } : Props) => {
    const company = useAppSelector(store => store.company.item);
    const [ newCompany , setNewCompany ] = useState<Company>();

    useEffect(() => {
        if(company) {
            setNewCompany(company)
        }
    } , [ company ])

    if(!newCompany || !company) return null;
    return (
        <Dialog open={open} onClose={() => setOpen(false)}  >
            <DialogTitle sx={{ textAlign : "center"}}>Change Company Name</DialogTitle>
            <DialogContent>
                <TextField defaultValue={newCompany.name} onChange={(event) => setNewCompany({...company , name : event.target.value }) } label={"name"} sx={{ mt : "10px" }} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false) }>Cancel</Button>
                <Button variant="contained" onClick={() => console.log(newCompany)}>Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyChange;