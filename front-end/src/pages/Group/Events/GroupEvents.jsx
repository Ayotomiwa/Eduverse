import {Box, Button, Card, CardContent, Paper, Typography, useTheme} from "@mui/material";
import Members from "../About/Members.jsx";
import EventCalendar from "../../../components/EventCalendar.jsx";
import EventsCard from "../../Home/RightHomeBar/EventsCard.jsx";
import UserContext from "../../../hooks/UserProvider.jsx";
import {useContext, useEffect, useState} from "react";
import AddEventModal from "./AddEventModal.jsx";
import dayjs from "dayjs";
import axios from "axios";


const GroupEvents = ({community}) => {
    const theme = useTheme();
    const {user} = useContext(UserContext);
    const [eventData, setEventData] = useState(null);
    const [event, setEvent] = useState({
        name: '',
        description: '',
        dateTime: dayjs(),
        location: ''
    });
    const [addEventModalOpen, setAddEventModalOpen] = useState(false);




    useEffect(() => {
        if(eventData){
            postEvent();
        }
    }, [eventData]);


    const handleEventSubmit = () => {
        setEventData({
            ...event,
            groupId: community.id,
            eventDate: event.dateTime.format('YYYY-MM-DD'),
            eventTime: event.dateTime.format('HH:mm')
        });
        setAddEventModalOpen(false);
    };

    const postEvent = () => {
        axios.post(`http://localhost:8222/api/event-service/events`, eventData,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                console.log("response", response.data);
            })
            .catch(error => {
                console.error("Failed to post event", error);
            });
    }



    const handleModalOpen = () => {
        setAddEventModalOpen(true);
    }

    const handleModalClose = () => {
        setAddEventModalOpen(false);
    }



    return(
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: "left", width:"100%", boxSizing:"border-box"}}>
            {community.moderatorsIds?.includes(user.id) && (
                <Button
                    onClick={handleModalOpen}
                fullWidth
                color="secondary"
                startIcon={<img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png"
                                alt="planner"/>}
            >
                Create Event
            </Button>
                )}
          <AddEventModal
              open={addEventModalOpen}
              handleClose={handleModalClose}
                event={event}
              setEvent={setEvent}
              handleEventSubmit={handleEventSubmit}
          />
            <Box sx={{mt:2, boxSizing:"border-box"}}>
                <Typography variant="h5">
                    Calendar
                </Typography>
                <Paper sx={{ mt:1, display:"flex", flexDirection:"row", boxSizing:"border-box",
                    alignItems:"stretch",
                    mb:3}}>
                    <Box>
                        <EventCalendar
                            community={community}
                        />
                    </Box>
                    <Box sx={{width:"100%", height:"100%"}}>
                        <EventsCard
                         open={true}
                         maxHeight={"80vh"}
                         showButton={false}
                         borderRadius={"0px"}
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>

    );
}

export default GroupEvents;