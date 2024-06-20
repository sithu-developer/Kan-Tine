import { Box, Button } from "@mui/material"
import { signOut } from "next-auth/react";


const OrderPage = () => {
    
    return (
        <Box>
            Order page
            <Button variant="contained" onClick={() => signOut({callbackUrl : "/app/signOption"})}>Sign out</Button>
        </Box>
    )
}

export default OrderPage;