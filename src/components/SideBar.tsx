import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Person3Icon from '@mui/icons-material/Person3';
import VillaIcon from '@mui/icons-material/Villa';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    open : boolean;
    toggleDrawer : (newOpen: boolean) => () => void
}


const SideBar = ( {open , toggleDrawer} : Props ) => {
    const router = useRouter();
    const pathName = router.pathname;

    return (
        <Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: "fit-content"}} role="presentation" onClick={toggleDrawer(false)}>
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
        icon : Person3Icon,
        name : "Monthly Customers",
        href : "/app/backoffice/customer"
    },
    {
        id : 2,
        icon : VillaIcon ,
        name : "Hostels",
        href : "/app/backoffice/hostel"
    },
    {
        id : 5,
        icon : SettingsIcon ,
        name : "Setting",
        href : "/app/backoffice/setting"
    },
    
]