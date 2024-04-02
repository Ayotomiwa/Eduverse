import {
    Avatar,
    Box,
    Card,
    Collapse,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText, Typography
} from "@mui/material";
import {InboxIcon} from "lucide-react";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";

const ModuleCard = ({maxHeight}) => {

    const [open, setOpen] = useState(true);
    const {user} = useContext(UserContext);
    const [groups, setGroups] = useState([])

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(groups.length === 0){
            fetchMyGroups()
        }
    },[]);

    const fetchMyGroups = () =>{
        axios.get(`http://localhost:8222/api/group-service/user/${user.id}/groups`)
            .then(res => {
                setGroups(res.data)
            }).catch(error => {
            console.log(error);
        });
    }

    const handleMenuClick = (id) => {
        window.location.pathname = `/communities/${id}`;
    }


    return (
        <Card sx={{
            bgcolor: "white",
            pt: 0,
            borderRadius: "12px"
        }}>
                <ListItemButton onClick={handleClick}>
                    <Avatar sx={{ mr: 1 }}>
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                             alt="groups"/>
                    </Avatar>
                    <ListItemText color="secondary" primary={
                        <Typography color="secondary" sx={{ fontWeight: "bold"}}>
                            Communities
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
                        <List component="div" disablePadding>
                            {groups.map((community, index) => {
                                return(
                                    <ListItemButton sx={{pl: 4}}
                                                    onClick={() => handleMenuClick(community.id)}
                                                    key={index}>
                                        <ListItemAvatar>
                                            <Avatar variant="square"  sx={{ bgcolor: 'green', width: 24, height: 24  }}>
                                                {community.profilePic}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={community.name}/>
                                    </ListItemButton>
                                )
                            })}
                        </List>
                    </Collapse>
                </Box>
        </Card>
    )

}
export default ModuleCard;