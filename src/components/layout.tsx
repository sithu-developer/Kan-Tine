import { Box, Button, Typography } from "@mui/material"
import { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { appFetch } from "@/store/slices/userSlice";

interface Props {
    children : ReactNode
}

const Layout = ({ children } : Props ) => {
    const { data } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(data && data.user && data.user.email) { 
            dispatch(appFetch({}));
        }
      } , [data]);

    return (
        <Box>
            <Box sx={{ bgcolor : "blueviolet" , display : "flex" , justifyContent : "space-between" , p : "10px 20px"}}>
                <Typography variant="h6">Kan Tine</Typography>
                {data && 
                <Button onClick={() => signOut({callbackUrl : "/"})} variant="contained" >Sign out</Button>
                }
            </Box>
            {children}
        </Box>
    )
}

export default Layout;