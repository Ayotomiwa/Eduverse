import {Card, Box, Avatar, Button, Divider, ListItemButton, ListItemIcon, ListItemText, ListItem, List} from "@mui/material";
import {SearchBar} from "../../components/SearchBar.jsx";
import {Dropdown} from "react-day-picker";
import SimpleMenu from "../../components/SimpleMenu.jsx";
import {CogIcon} from "@heroicons/react/20/solid";
import {ExitToApp} from "@mui/icons-material";
import {InboxIcon} from "lucide-react";


const HomeSearch = () =>{
    const title = "Ayotomiwa Omope";
const optionsWithIcons = [
    {label: "Profile",
        icon: <Avatar
            sx={{width:24, height:24}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" />,
        path: "/profile"},
    {label: "Log Out", icon: <ExitToApp />, path: "/create-post"},
    ];


const handleMenuClick = (label) => {
    optionsWithIcons.forEach(option => {
        if(option.label === label){
            window.location.pathname = option.path;
        }
    });
}


//implement search service

    return(
       <Card sx={{
           bgcolor:"white",
           // position: 'sticky',
           // top:20,
           maxHeight:"700px",
           p:"20px",
           pt:0,
           borderRadius:"12px"
       }}>
           <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"20px"}}>
               <SimpleMenu
                   options={optionsWithIcons}
                   handleMenuClick={handleMenuClick}
                   title={title}
               />
           </Box>
           {/*<Box sx={{ }}>*/}
           {/*    <SearchBar placeHolder={"Search Eduverse"}/>*/}
           {/*</Box>*/}
           <Divider />
           <Box>
               <List>
                   <ListItem disablePadding>
                       <ListItemButton>
                           <ListItemIcon>
                               <InboxIcon />
                           </ListItemIcon>
                           <ListItemText primary="Feed" />
                       </ListItemButton>
                   </ListItem>
                   <ListItem disablePadding>
                       <ListItemButton>
                           <ListItemIcon>

                           </ListItemIcon>
                           <ListItemText primary="Groups" />
                       </ListItemButton>
                   </ListItem>
               </List>
           </Box>
       </Card>

    )
}

export default HomeSearch;