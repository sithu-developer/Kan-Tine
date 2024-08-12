import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import VillaIcon from '@mui/icons-material/Villa';
import SettingsIcon from '@mui/icons-material/Settings';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Link from "next/link";
import { useRouter } from "next/router";
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void
}


const SideBar = ( {open , setOpen} : Props ) => {
    const router = useRouter();
    const pathName = router.pathname;

    return (
        <Box>
            <Drawer open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: "fit-content"}} role="presentation" onClick={() => setOpen(false)}>
              {sideButtons.slice(0 , -1).map(item => <Link href={item.href} key={item.id} style={{ textDecoration : "none" , color : "black"}} >
                    <List sx={{ bgcolor :  pathName === item.href ? "secondary.light" : "white" }}>
                        <ListItem  disablePadding>
                          <ListItemButton >
                            <ListItemIcon>
                                < item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{width : "100px" , textAlign : "center" }} />
                          </ListItemButton>
                        </ListItem>
                    </List> 
                </Link>
              )}
              
              <Divider sx={{ mx : "10px"}} />
              
              {sideButtons.slice(-1).map(item => <Link href={item.href} key={item.id} style={{ textDecoration : "none" , color : "black"}} >
                    <List sx={{ bgcolor :  pathName === item.href ? "secondary.light" : "white" }}>
                        <ListItem  disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                                < item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{width : "100px" , textAlign : "center" }} />
                          </ListItemButton>
                        </ListItem>
                    </List> 
                </Link>
              )}

            </Box>
            </Drawer>
        </Box>
    )
}

export default SideBar;

interface SideButton {
    id : number
    icon : any ;
    name : string;
    href : string
}

export const sideButtons : SideButton[] = [
    {
        id : 1,
        icon : CookieOutlinedIcon,
        name : "Expire Check",
        href : "/app/backoffice/expire"
    },
    {
        id : 2,
        icon : VillaIcon ,
        name : "Hostels",
        href : "/app/backoffice/hostel"
    },
    {
        id : 3,
        icon : Face6OutlinedIcon ,
        name : "Students",
        href : "/app/backoffice/student"
    },{
        id : 4,
        icon : PaidOutlinedIcon ,
        name : "Payments",
        href : "/app/backoffice/payment"
    },
    {
        id : 5,
        icon : SettingsIcon ,
        name : "Setting",
        href : "/app/backoffice/setting"
    },
    
]