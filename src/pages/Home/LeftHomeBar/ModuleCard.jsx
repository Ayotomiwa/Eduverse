import {
    Avatar,
    Card,
    Collapse,
    List,
    ListItemAvatar,
    Box,
    ListItemButton,
    Typography,
    ListItemText,
    SvgIcon, useTheme, Divider
} from "@mui/material";
import {InboxIcon} from "lucide-react";
import {ExpandLess, ExpandMore, LibraryBooks, StarBorder} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";

const ModuleCard = ({maxHeight}) => {
    const theme = useTheme();
    const{university, user, jwtToken, API_GATEWAY} = useContext(UserContext);

    const [open, setOpen] = useState(true);
    const[modules, setModules] = useState([])


    useEffect(() => {
        fetchModules();
    },[])


    const fetchModules = () => {
        axios.get(`${API_GATEWAY}/api/user-service/users/${user.id}/modules`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }).then(response => {
            setModules(response.data);
          }).catch(error => {
            console.log(error);
          })
      };



    const handleClick = () => {
        setOpen(!open);
    };


    const handleMenuClick = (id) => {
        window.location.href = `/modules/${id}`;
    }


    return (
        <Card sx={{
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"
        }}>
                <ListItemButton onClick={handleClick}>
                    <Avatar sx={{mr: 1}}>
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/books.png" alt="books"/>
                    </Avatar>
                    <ListItemText  primary={
                        <Typography color="secondary.dark" sx={{ fontWeight: "bold"}}>
                            Modules
                        </Typography>
                    }>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Box sx={{overflowY: "auto",
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'white',
                        borderRadius: '25px',
                        outline: '1px solid slategrey'
                    },
                    maxHeight: maxHeight }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Divider />
                    <List component="div" disablePadding sx={{minHeight:"20vh"}}>
                        {modules.map((module, index) => {
                            return(
                                <Box key={index}>
                                <ListItemButton

                                    onClick={() => handleMenuClick(module.id)}
                                    sx={{pl: 4}} key={index}>
                                    {/*<ListItemAvatar>*/}
                                    {/*    <Avatar variant="square"  sx={{ bgcolor: 'green', width: 24, height: 24  }}>*/}
                                    {/*        {module.name?.charAt(0).toUpperCase()}</Avatar>*/}
                                    {/*</ListItemAvatar>*/}
                                    <ListItemText primary={module.name}/>

                                </ListItemButton>
                                </Box>
                            )

                        })}
                    </List>
                </Collapse>
                </Box>
        </Card>
    )

}
export default ModuleCard;