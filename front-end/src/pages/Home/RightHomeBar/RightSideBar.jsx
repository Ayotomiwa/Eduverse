import {Box} from "@mui/material";
import SearchCard from "./SearchCard.jsx";
import NotificationCard from "./NotificationCard.jsx";
import EventsCard from "./EventsCard.jsx";
import {useEffect, useState} from "react";

const RightSideBar = () => {

    const [notificationOpen, setNotificationOpen] = useState(true);
    const [eventsOpen, setEventsOpen] = useState(false);







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
            display: "flex", flexDirection: "column",
            position: "sticky", top: 20, m: "20px", height: "100%", mt: 2, gap: 2, width: "26%", maxWidth: "26%"
        }}>
            <SearchCard/>
            <NotificationCard
             open={notificationOpen}
             handleOpen={handleOpen}
            />
            <EventsCard
                open={eventsOpen}
                handleOpen={handleOpen}
            />
        </Box>
    )
}
    export default RightSideBar;
