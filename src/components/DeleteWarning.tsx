import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface Props {
    openDelete : boolean;
    setOpenDelete : ( value : boolean ) => void;
    item : string;
    handleDeleteFunction : (value ?: any) => void;
}

const DeleteWarning = ( { openDelete , setOpenDelete , item , handleDeleteFunction } : Props ) => {
    return (
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)} >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure that you want to delete this <span style={{ color : "red" }}>{item}</span>?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpenDelete(false)} >Cancel</Button>
                <Button color="error" variant="outlined" onClick={handleDeleteFunction} >Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteWarning;