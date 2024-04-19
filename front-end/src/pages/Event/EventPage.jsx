import EventCalendar from "../../components/Event/EventCalendar.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../hooks/UserProvider.jsx";
import {Box, lighten, Paper, Typography, useTheme} from "@mui/material";
import EventViewModal from "../../components/Event/EventViewModal.jsx";
import BigEventsCard from "../../components/Event/BigEventCard.jsx";
import SimpleSelect from "../../components/Input/SimpleSelect.jsx";





const EventPage = () => {
    const theme = useTheme();
    const{user, jwtToken} = useContext(UserContext);
    const[events, setEvents] = useState([]);
    const[selectedEvent, setSelectedEvent] = useState(null);
    const[transformedEvents, setTransformedEvents] = useState([]);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(["All"]);
    const [selectedFilter, setSelectedFilter] = useState("All");



     useEffect(() =>{
            fetchUserEvents();
      },[])


    useEffect(() => {
        if(selectedEvent === null){
            return;
        }
        setViewModalOpen(true);
    },[selectedEvent])

    useEffect(() => {
        if(loading){
            return;
        }
        setLoading(true);
        if(selectedFilter !== "All"){
            console.log("selectedFilter", selectedFilter);
            setTransformedEvents(events.filter(event => event.host === selectedFilter));
        }
        else{
            setTransformedEvents(events);
        }
    },[selectedFilter])


    useEffect(() => {
        if(loading && transformedEvents.length === 0){
            return;
        }
        setLoading(false);

    },[transformedEvents]);

    const fetchUserEvents = () =>{
        axios.get(`http://localhost:8222/api/event-service/users/${user.id}/events`,
            {headers: {
                    Authorization: `Bearer ${jwtToken}`
                }})
            .then(response => {
                setEvents(response.data);
                setTransformedEvents(response.data);
                setOptions(() => {
                    const seenHosts = {};
                    const uniqueEvents = response.data.filter(event => {
                        if (seenHosts[event.host]) {
                            return false;
                        } else {
                            seenHosts[event.host] = true;
                            return true;
                        }
                    });
                    return [{host: "All"}, ...uniqueEvents];
                });
                setLoading(false);
                console.log("events", response.data);
            })
            .catch(error => {
                console.error("Failed to fetch events", error);
                setLoading(false);
            });
    }




    return(
        <Box sx={{ display:"flex", flexDirection:"column"}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    p: 2,
                    position: "sticky",
                    top: 0,
                    backgroundColor: lighten(theme.palette.primary.main, 0.7),
                    zIndex: 500
                }}
            >
                <Typography textAlign="left" variant="h4"
                            sx={{color: "grey"}}>
                   My Events
                </Typography>
                <SimpleSelect
                    options={options}
                    setSelectedFilter={setSelectedFilter}
                />
            </Box>
            <Box sx={{m:4, p:3}}>
                <Paper sx={{ mt:1, display:"flex", flexDirection:"column", boxSizing:"border-box",
                    alignItems:"stretch",
                    mb:3}}>
                    {!loading && (
                        <Box sx={{width:"100%"}}>
                            <EventCalendar
                                events={transformedEvents}
                                setSelectedEvent={setSelectedEvent}

                            />
                        </Box>
                    )}
                    <Box sx={{width:"100%", height:"100%"}}>
                        <BigEventsCard
                            events={transformedEvents}
                            open={true}
                            minheight={"80vh"}
                            showButton={false}
                            borderRadius={"0px"}
                        />
                    </Box>
                </Paper>
                <EventViewModal
                    event={selectedEvent}
                    open={viewModalOpen}
                    setOpen={(value) => {
                        setViewModalOpen (value);
                        setSelectedEvent(null);
                    }}
                />
            </Box>
        </Box>

    );
}

export default EventPage;