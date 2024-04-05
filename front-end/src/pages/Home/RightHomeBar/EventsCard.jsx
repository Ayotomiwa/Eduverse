import {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Card,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import { ExpandLess, ExpandMore, LocationOn, AccessTime, CalendarMonth } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import UserContext from "../../../hooks/UserProvider.jsx";
import axios from "axios";


const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(1),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const EventsCard = ({open, handleOpen, maxHeight="45vh",
                        borderRadius = "12px",
                        showButton=true}) => {


    const{user, jwtToken} = useContext(UserContext);
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        fetchEvents();
    },[]);


    const fetchEvents = () => {
        axios.get(`http://localhost:8222/api/event-service/users/${user.id}/events`,
            {headers: {
                    Authorization: `Bearer ${jwtToken}`
                }})
            .then(response => {
                setEventsData(response.data);
                console.log("events", response.data);
            })
            .catch(error => {
                console.error("Failed to fetch events", error);
            });
    };


    const handleClick = (event) => {
        handleOpen(event);
    };

    return (
        <Card sx={{ bgcolor: "white", borderRadius:borderRadius, overflow: "hidden", width:"100%"}}>
            <CustomListItemButton id="Events" onClick={handleClick}>
                <Avatar sx={{ mr: 1 }}>
                    <img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png" alt="planner"/>
                </Avatar>
                <ListItemText primary="Upcoming Events"
                              primaryTypographyProps={{ color: "secondary", fontWeight: "bold" }}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </CustomListItemButton>
            <Box sx={{
                overflowY: "auto",
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
                maxHeight: {maxHeight}
            }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ width: '100%', boxSizing:"border-box" }}>
                    {eventsData.map((event) => (
                        <ListItem key={event.id} divider sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemText
                                primary={
                                <>
                                    <Typography variant="body1" color="text.primary"  textAlign="center"  sx={{mb:1}}   >
                                        {event.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.primary" textAlign="center"
                                    sx={{m:0.5}}
                                    >
                                {event.description}
                             </Typography>
                                    </>
                                }
                                secondary={
                                    <>
                                        <Box sx={{display:"flex", alignItems:"center", gap:1, justifyContent:"space-around"}}>
                                            <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', color: "text.secondary" }}>
                                                <AccessTime sx={{ verticalAlign: 'middle' }} />
                                                {event.date};
                                            </Typography>
                                            <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', color: "text.secondary" }}>
                                                <CalendarMonth sx={{ verticalAlign: 'middle' }} />
                                                {event.time}
                                            </Typography>
                                            <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', color: "text.secondary" }}>
                                                <LocationOn sx={{ verticalAlign: 'middle', mr: 0.2 }} />
                                                {event.location}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" display="block"  textAlign="center"   color="text.secondary">
                                            Hosted by: {event.organizer}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                    {showButton && (
                    <ListItemButton size="small" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemText primary="View all Events"/>
                    </ListItemButton>
                        )}
                </List>
            </Collapse>
            </Box>
        </Card>
    );
};

export default EventsCard;
