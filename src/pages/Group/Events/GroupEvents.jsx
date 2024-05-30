import {Box, Button, Card, CardContent, Paper, Typography, useTheme} from "@mui/material";
import Members from "../About/Members.jsx";
import EventCalendar from "../../../components/Event/EventCalendar.jsx";
import UserContext from "../../../hooks/UserProvider.jsx";
import {useContext, useEffect, useState} from "react";
import AddEventModal from "./AddEventModal.jsx";
import dayjs from "dayjs";
import axios from "axios";
import BigEventsCard from "../../../components/Event/BigEventCard.jsx";
import EventViewModal from "../../../components/Event/EventViewModal.jsx";
import * as PropTypes from "prop-types";
import EventTab from "../../../components/Event/EventTab.jsx";


const GroupEvents = ({community}) => {
    const theme = useTheme();
    const {user, jwtToken,API_GATEWAY } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState(null);
    const[selectedEvent, setSelectedEvent] = useState(null);
    const[loading, setLoading] = useState(true);
    const [eventPlaceholder, setEventPlaceholder] = useState({
        name: '',
        description: '',
        dateTime: dayjs(),
        location: ''
    });
    const [addEventModalOpen, setAddEventModalOpen] = useState(false);
    const [viewEventModalOpen, setViewEventModalOpen] = useState(false);


    useEffect(() => {
        fetchGroupEvents();
    },[])

    useEffect(() => {
        if(selectedEvent){
            window.scrollTo(0,20);
            setViewEventModalOpen(true);
        }
    }, [selectedEvent]);

    useEffect(() => {
        if(newEvent){
            setLoading(true);
            postEvent();
        }
    }, [newEvent]);


    const fetchGroupEvents = () => {
        axios.get(`${API_GATEWAY}/api/event-service/groups/${community.id}/events`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setEvents(response.data.map(event => {
                    return {
                        ...event,
                        host: community.name,
                    }
                }));
                console.log("events", response.data);
                setLoading(false);
            }).catch(error => {
            console.error("Failed to fetch events", error);
            setLoading(false);
        });
    }


    const handleEventSubmit = () => {
        setNewEvent({
            ...eventPlaceholder,
            groupId: community.id,
            date: eventPlaceholder.dateTime.format('YYYY-MM-DD'),
            time: eventPlaceholder.dateTime.format('HH:mm'),
            creatorId: user.id,
            groupName: community.name
        });
        setAddEventModalOpen(false);
    };

    const postEvent = () => {
        axios.post(`${API_GATEWAY}/api/event-service/groups/events`, newEvent,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                console.log("response", response.data);
                setEvents([...events, response.data]);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to post eventPlaceholder", error);
            });
    }

    const revertEvent = () => {
        setEventPlaceholder({
            name: '',
            description: '',
            dateTime: dayjs(),
            location: ''
        });
    }

    const handleAddModal = () => {
        setAddEventModalOpen(true);
    }

    const handleCloseAddModal = () => {
        setAddEventModalOpen(false);
        revertEvent();
    }


    return(
        <EventTab
                  isModerator={community?.moderatorsIds?.includes(user.id)}
                  isAdmin={user.authority === "ADMIN"}
                  user={user}
                  handleAddModal={handleAddModal}
                  addEventModalOpen={addEventModalOpen}
                  handleClose={handleCloseAddModal}
                  eventPlaceholder={eventPlaceholder}
                  setEventPlaceHolder={setEventPlaceholder}
                  handleEventSubmit={handleEventSubmit}
                  loading={loading}
                  events={events}
                  setSelectedEvent={setSelectedEvent}
                  selectedEvent={selectedEvent}
                  viewEventModalOpen={viewEventModalOpen}
                  setViewEventModalOpen={setViewEventModalOpen}/>

    );
}

export default GroupEvents;