import React, { useState } from 'react';
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
import { Event as EventIcon, ExpandLess, ExpandMore, LocationOn, AccessTime } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const eventsData = [
    {
        id: 1,
        title: "Engineering Meetup",
        dateTime: "2023-10-05 18:00",
        location: "BR307",
        group: "Engineering Club"
    },
    {
        id: 2,
        title: "Mathematics Workshop",
        dateTime: "2023-10-10 15:00",
        location: "FW115",
        group: "Math Society"
    },
    {
        id: 3,
        title: "University Open Day",
        dateTime: "2023-11-01 09:00",
        location: "Library",
        group: "University"
    },
    {
        id: 4,
        title: "Physics Seminar",
        dateTime: "2023-11-15 14:00",
        location: "BR307",
        group: "Physics Department"
    },
    {
        id: 5,
        title: "Chemistry Lecture",
        dateTime: "2023-11-20 12:00",
        location: "FW115",
        group: "Chemistry Department"
    }

];

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(1),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const EventsCard = ({open, handleOpen}) => {


    const handleClick = (event) => {
        handleOpen(event);
    };

    return (
        <Card sx={{ bgcolor: "white", borderRadius: "12px", overflow: "hidden" }}>
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
                maxHeight: "45vh"
            }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ width: '100%' }}>
                    {eventsData.map((event) => (
                        <ListItem key={event.id} divider sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" color="text.primary">
                                        {event.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', color: "text.secondary" }}>
                                            <AccessTime sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                            {new Date(event.dateTime).toLocaleString()}
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center', color: "text.secondary" }}>
                                            <LocationOn sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                            {event.location}
                                        </Typography>
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Hosted by: {event.group}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                    <ListItemButton size="small" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemText primary="View all Events"/>
                    </ListItemButton>
                </List>
            </Collapse>
            </Box>
        </Card>
    );
};

export default EventsCard;
