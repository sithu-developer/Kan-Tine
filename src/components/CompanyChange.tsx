import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCompany } from "@/store/slices/companySlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { Company } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}
const CompanyChange = ( { open , setOpen } : Props) => {
    const company = useAppSelector(store => store.company.item);
    const [ newCompany , setNewCompany ] = useState<Company>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(company) {
            setNewCompany(company)
        }
    } , [ company ])

    if(!newCompany || !company) return null;

    const handleUpdateCompany = () => {
        dispatch(updateCompany({...newCompany , onSuccess : () => setOpen(false)}))
    }

    return (
        <Dialog open={open} onClose={() =>{
            setOpen(false);
            setNewCompany(company)
        }}  >
            <DialogTitle sx={{ textAlign : "center"}}>Change Company Name</DialogTitle>
            <DialogContent>
                <TextField defaultValue={newCompany.name} autoFocus onChange={(event) => setNewCompany({...company , name : event.target.value }) } label={"name"} sx={{ mt : "10px" }} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewCompany(company);
                }}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateCompany}>Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyChange;