import { Box, Button, Typography } from "@mui/material"
import { ReactNode, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
    const company = useAppSelector(store => store.company.item);


    useEffect(() => {
        if(data && data.user && data.user.email) { 
            dispatch(appFetch({}));
            router.push(router.pathname);
        }
      } , [data]);

    // if(!company) return null;
    
    return (
        <Box sx={{ display : "flex" , flexDirection : "column" }}>
            <Box sx={{ bgcolor : "secondary.light" , display : "flex"  , justifyContent : "space-between" , alignItems : "center" , p : "10px 20px"  }}>
                {data ?
                    <DensityMediumIcon onClick={() => setOpen(true)} sx={{ cursor : "pointer"}} />
                    : <span></span>
                }
                <Typography variant="h6">{company ? company.name : "Kan Tine"}</Typography>
                {data ?
                    <Button onClick={() => signOut({callbackUrl : "/"})} variant="contained" >Sign out</Button>
                    : <span></span>
                }
            </Box>
            <SideBar open={open} setOpen={setOpen} />
            {children}
        </Box>
    )
}

export default Layout;

