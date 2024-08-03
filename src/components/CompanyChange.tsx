import { useAppSelector } from "@/store/hooks";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}
const CompanyChange = ( { open , setOpen } : Props) => {
    const company = useAppSelector(store => store.company.item);

    if(!company) return null;
    return (
        <Dialog open={open} onClose={() => setOpen(false)}  >
            <DialogTitle sx={{ textAlign : "center"}}>Change Company Name</DialogTitle>
            <DialogContent>
                <TextField defaultValue={company.name} label={"name"} sx={{ mt : "10px" }} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false) }>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyChange;