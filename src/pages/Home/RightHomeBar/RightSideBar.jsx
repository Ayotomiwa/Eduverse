import {Box} from "@mui/material";
import SearchCard from "./SearchCard.jsx";
import NotificationCard from "./NotificationCard.jsx";
import EventsCard from "./EventsCard.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import {UseCheckFeature} from "../../../hooks/FeatureChecks/UseCheckFeature.jsx";
import axios from "axios";

const RightSideBar = () => {

    const [notificationOpen, setNotificationOpen] = useState(true);
    const [eventsOpen, setEventsOpen] = useState(false);
    const[search, setSearch] = useState(false);
    const {user, jwtToken, API_GATEWAY} = useContext(UserContext)
    const featureCheck = UseCheckFeature();
    const eventsFeatureAllowed = featureCheck.checkUserAccess("EVENTS");
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        if(eventsFeatureAllowed){
        fetchEvents();
    }
    },[]);


    const fetchEvents = () => {
        axios.get(`${API_GATEWAY}/api/event-service/users/${user.id}/events`,
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


    const handleOpen = (event) => {
        if(event.currentTarget.id === "Events"){
            if(notificationOpen){
                setNotificationOpen(false);
            }
            setEventsOpen(!eventsOpen);
        }
        else if(event.currentTarget.id === "Notifications"){
            if(eventsOpen){
                setEventsOpen(false);
            }
            setNotificationOpen(!notificationOpen);
        }
    }


    return (
        <Box sx={{
            display: "flex", flexDirection: "column", height: "100%", gap:2
        }}>
            <SearchCard
            setSearch={setSearch}
            search={search}
            />
            <NotificationCard
                maxHeight={eventsFeatureAllowed? "43vh" : "52vh"}
             open={notificationOpen && !search}
             handleOpen={handleOpen}
            />
            {eventsFeatureAllowed  && (
            <EventsCard
                eventsData={eventsData}
                open={eventsOpen && !search}
                handleOpen={handleOpen}
            />
                )}
        </Box>
    )
}
    export default RightSideBar;
