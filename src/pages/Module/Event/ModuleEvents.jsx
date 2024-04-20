import { useTheme} from "@mui/material";
import UserContext from "../../../hooks/UserProvider.jsx";
import {useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import EventTab from "../../../components/Event/EventTab.jsx";


const ModuleEvents = ({module, setUpComingEventCount}) => {
    const theme = useTheme();
    const {user, jwtToken} = useContext(UserContext);
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
       fetchModuleEvents()
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


    useEffect(() => {
        setUpComingEventCount(events.filter(event => new Date(event.date) > new Date()).length);
    }, [events]);



    const fetchModuleEvents = () => {
        axios.get(`http://localhost:8222/api/event-service/modules/${module.id}/events`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setEvents(response.data.map(event => {
                    return {
                        ...event,
                        host: module.name,
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
            moduleId: module.id,
            date: eventPlaceholder.dateTime.format('YYYY-MM-DD'),
            time: eventPlaceholder.dateTime.format('HH:mm'),
            creatorId: user.id,
            moduleName: module.name
        });
        setAddEventModalOpen(false);
    };

    const postEvent = () => {
        axios.post(`http://localhost:8222/api/event-service/modules/${module.id}/events`, newEvent,
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
                  isModerator={module?.teachingTeam?.some(teacher => teacher.id === user.id)}
                  isAdmin={user.authority === "ADMIN"}
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

export default ModuleEvents;