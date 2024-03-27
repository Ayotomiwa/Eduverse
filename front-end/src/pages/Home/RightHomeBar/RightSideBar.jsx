import {Box} from "@mui/material";
import SearchCard from "./SearchCard.jsx";
import NotificationCard from "./NotificationCard.jsx";
import EventsCard from "./EventsCard.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";

const RightSideBar = () => {

    const [notificationOpen, setNotificationOpen] = useState(true);
    const [eventsOpen, setEventsOpen] = useState(false);
    const {user, university} = useContext(UserContext)







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
            <SearchCard/>
            <NotificationCard
                maxHeight={university.featureFlags.EVENTS? "44vh" : "54vh"}
             open={notificationOpen}
             handleOpen={handleOpen}
            />
            {university.featureFlags.EVENTS && (
            <EventsCard
                open={eventsOpen}
                handleOpen={handleOpen}
            />
                )}
        </Box>
    )
}
    export default RightSideBar;
