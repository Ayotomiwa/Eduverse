import {Box, Button, Paper, Typography} from "@mui/material";
import AddEventModal from "../../pages/Group/Events/AddEventModal.jsx";
import EventCalendar from "./EventCalendar.jsx";
import BigEventsCard from "./BigEventCard.jsx";
import EventViewModal from "./EventViewModal.jsx";

const EventTab = (props) =>  {


    return(
    <Box
        sx={{display: "flex", flexDirection: "column", alignItems: "left", width: "100%", boxSizing: "border-box"}}>
        {props.isModerator || props.isAdmin && (
            <Button
                variant="contained"
                onClick={props.handleAddModal}
                fullWidth
                color="secondary"
                startIcon={<img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png"
                                alt="planner"/>}
            >
                Create Event
            </Button>
        )}
        <AddEventModal
            open={props.addEventModalOpen}
            handleClose={props.handleClose}
            eventPlaceholder={props.eventPlaceholder}
            setEventPlaceHolder={props.setEventPlaceHolder}
            handleEventSubmit={props.handleEventSubmit}
        />
        <Box sx={{mt: 2, boxSizing: "border-box"}}>
            <Typography variant="h5">
                Calendar
            </Typography>
            <Paper sx={{
                display: "flex", flexDirection: "column", boxSizing: "border-box",
                alignItems: "stretch", mt: 1,
                mb: 3
            }}>
                {!props.loading && (
                    <Box sx={{width: "100%"}}>
                        <EventCalendar
                            events={props.events}
                            setSelectedEvent={props.setSelectedEvent}
                        />
                    </Box>
                )}
                <Box sx={{width: "100%", height: "100%"}}>
                    <BigEventsCard
                        events={props.events}
                        open={true}
                        minheight={"80vh"}
                        showButton={false}
                        borderRadius={"0px"}
                    />
                </Box>
            </Paper>
            {props.selectedEvent &&
                <EventViewModal
                    open={props.viewEventModalOpen}
                    event={props.selectedEvent}
                    setOpen={props.setViewEventModalOpen}
                />
            }
        </Box>
    </Box>
    );
}
export default EventTab;

