import {
    Avatar,
    Box,
    Card,
    Collapse, Divider,
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
import {useNavigate} from "react-router-dom";

const ModuleCard = ({maxHeight}) => {

    const [open, setOpen] = useState(true);
    const {user, jwtToken, API_GATEWAY} = useContext(UserContext);
    const [groups, setGroups] = useState([])
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(groups.length === 0){
            fetchMyGroups()
        }
    },[]);

    const fetchMyGroups = () =>{
        axios.get(`${API_GATEWAY}/api/group-service/users/${user.id}/groups`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(res => {
                setGroups(res.data)
            }).catch(error => {
            console.log(error);
        });
    }

    const handleMenuClick = (id) => {
        console.log("Clicked on: ", id);
        // navigate(`/communities/${id}`, {replace: false});
        window.location.pathname = `/communities/${id}`;
    }


    return (
        <Card sx={{
            bgcolor: "white",
            pt: 0,
            borderRadius: "12px",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"
        }}>
                <ListItemButton onClick={handleClick}>
                    <Avatar sx={{ mr: 1 }}>
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                             alt="groups"/>
                    </Avatar>
                    <ListItemText color="secondary" primary={
                        <Typography color="secondary.dark" sx={{ fontWeight: "bold"}}>
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
                        <Divider />
                        <List component="div" disablePadding sx={{minHeight:"15vh"}}>
                            {!groups || groups.length === 0 ? (
                                <ListItemText sx={{textAlign:"center"}} primary="No Community. Click the Community Tab to search and join community"/>
                            ) : (
                            groups.map((community, index) => {
                                return(
                                    <ListItemButton sx={{pl: 4}}
                                                    onClick={() => handleMenuClick(community.id)}
                                                    key={index}>
                                        {/*<ListItemAvatar>*/}
                                        {/*    <Avatar variant="square"  sx={{ bgcolor: 'green', width: 24, height: 24  }}>*/}
                                        {/*        {community.profilePicUrl}</Avatar>*/}
                                        {/*</ListItemAvatar>*/}
                                        <ListItemText primary={community.name}/>
                                    </ListItemButton>
                                )})
                                )}
                        </List>
                    </Collapse>
                </Box>
        </Card>
    )

}
export default ModuleCard;