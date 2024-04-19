import {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button,
    Card,
    Collapse, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import { ExpandLess, ExpandMore, LocationOn, AccessTime, CalendarMonth } from "@mui/icons-material";
import { styled } from "@mui/material/styles";


const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(2),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const BigEventsCard = ({open,
                        events,
                        minheight="150vh",
                        borderRadius = "12px",
                       }) => {

    const upComingEvents = events.filter(event => new Date(event.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));

    const [openEvent, setOpenEvent] = useState(true);
    const handleClick = () => {
        setOpenEvent(!openEvent);
    };

    return (
        <Card sx={{ bgcolor: "white",
            borderRadius:borderRadius,
            overflow: "hidden", width:"100%"}}>
            <CustomListItemButton id="Events" onClick={handleClick}>
                <Avatar sx={{ mr: 1 }}>
                    <img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png" alt="planner"/>
                </Avatar>
                <ListItemText primary="Upcoming Events"
                              primaryTypographyProps={{ color: "secondary.dark", fontWeight: "bold" }}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </CustomListItemButton>
            <Box sx={{
                mb:3,
                overflowY: "auto",
                '&::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'secondary.main',
                    borderRadius: '25px',
                    outline: '1px solid slategrey'
                },
                minHeight: {minheight},
                maxHeight: "200vh",
            }}>
                <Collapse in={openEvent} timeout="auto" unmountOnExit>
                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Button variant="outlined" color="secondary">
                            View Past Events
                        </Button>
                    </Box>
                    <List sx={{ width: '100%', boxSizing:"border-box", p:2 }}>
                        {upComingEvents.length === 0 && (
                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"20vh"}}>
                                <Typography variant="body1" color="text.secondary">
                                    No Upcoming Events
                                </Typography>
                            </Box>
                        )}
                        {upComingEvents.map((event) => (
                            <ListItem key={event.id} divider sx={{ display: "flex" }}>
                                <ListItemText
                                    primary={
                                        <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                                            <Box sx={{display:"flex", gap:3}}>
                                                <Typography variant="body1">
                                                    <b>Date:</b> {event.date}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <b>Time:</b> {event.time}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" color="text.primary">
                                                <b>Event Name:</b> {event.name}
                                            </Typography>
                                            <Typography variant="body1" color="text.primary"
                                            >
                                               <b>Description:</b>  {event.description}
                                            </Typography>

                                            <Typography variant="body1">
                                                <b>Location:</b> {event.location}
                                            </Typography>
                                            <Typography>
                                                <b>Hosted By:</b>: {event.host}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Divider  flexItem />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </Box>
        </Card>
    );
};

export default BigEventsCard;
