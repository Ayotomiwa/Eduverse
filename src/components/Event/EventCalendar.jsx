import {useEffect, useState} from 'react'
import Scheduler from "react-mui-scheduler"

const EventCalendar = ({events, setSelectedEvent}) =>{
   const [transformedEvents, setTransformedEvents] = useState(null);
    const eventColors = [
        "#3f51b5",
        "#ff4081",
        "#FF6B6B",
        "#1B998B",
        "#2E294E",
        "#5F0F40",
        "#9A031E",
        "#FB8B24",
        "#E36414",
        "#0F4C5C",
        "#D90368",
        "#00CC66"
    ];

    useEffect(() => {
        setTransformedEvents(events.map(event => {
            return{
               ...event,
               color: eventColors[Math.floor(Math.random() * eventColors.length)],
               label: event.name,
            }
         }))
    },[events])


    const [state, setState] = useState({
        options: {
            transitionMode: "zoom",
            startWeekOn: "mon",
            defaultMode: "month",
        },
        toolbarProps: {
            showSearchBar: false,
            showSwitchModeButtons: false,
            showDatePicker: true
        }
    })






    const handleCellClick = (event, row, day) => {
        // Do something...
    }

    const handleEventClick = (event, item) => {
        console.log("handleEventClick", item)
        setSelectedEvent(item)
    }

    const handleEventsChange = (item) => {
        // Do something...
    }

    const handleAlertCloseButtonClicked = (item) => {
        console.log("handleAlertCloseButtonClicked", item)
       setState({
           ...state,
           alertProps: {
               ...state.alertProps,
               open: false
           }
       })
    }

    return (
        transformedEvents && (
        <Scheduler
            locale="en"
            events={transformedEvents}
            legacyStyle={true}
            options={state?.options}
            toolbarProps={state?.toolbarProps}
            onEventsChange={handleEventsChange}
            onCellClick={handleCellClick}
            onTaskClick={handleEventClick}
            onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
        />
        )
    )
}

export default EventCalendar;