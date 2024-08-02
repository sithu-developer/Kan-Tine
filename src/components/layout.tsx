import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { appFetch } from "@/store/slices/userSlice";
import SideBar from "./SideBar";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


interface Props {
    children : ReactNode
}

const Layout = ({ children } : Props ) => {
    const { data } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [ open , setOpen ] = useState<boolean>(false);

    
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
      };


    useEffect(() => {
        if(data && data.user && data.user.email) { 
            dispatch(appFetch({}));
            router.push(router.pathname);
        }
      } , [data]);

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" }}>
            <Box sx={{ bgcolor : "secondary.light" , display : "flex"  , justifyContent : "space-between" , alignItems : "center" , p : "10px 20px"  }}>
                {data ?
                    <DensityMediumIcon onClick={toggleDrawer(true)} sx={{ cursor : "pointer"}} />
                    : <span></span>
                }
                <Typography variant="h6">Kan Tine</Typography>
                {data ?
                    <Button onClick={() => signOut({callbackUrl : "/"})} variant="contained" >Sign out</Button>
                    : <span></span>
                }
            </Box>
            <SideBar open={open} toggleDrawer={toggleDrawer} />
            {children}
        </Box>
    )
}

export default Layout;

