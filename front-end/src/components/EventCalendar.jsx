import {useState} from 'react'
import Scheduler from "react-mui-scheduler"

const EventCalendar = () =>{
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

    const events = [
        {
            id: "event-1",
            label: "Medical consultation",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "04:00 AM",
            endHour: "05:00 AM",
            date: "2022-05-05",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-2",
            label: "Medical consultation",
            groupLabel: "Dr Claire Brown",
            user: "Dr Claire Brown",
            color: "#099ce5",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2024-03-30",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-3",
            label: "Medical consultation",
            groupLabel: "Dr Menlendez Hary",
            user: "Dr Menlendez Hary",
            color: "#263686",
            startHour: "13 PM",
            endHour: "14 PM",
            date: "2022-05-10",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-4",
            label: "Consultation prénatale",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "08:00 AM",
            endHour: "09:00 AM",
            date: "2022-05-11",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        }
    ]

    const handleCellClick = (event, row, day) => {
        // Do something...
    }

    const handleEventClick = (event, item) => {
        // Do something...
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
        <Scheduler
            locale="en"
            events={events}
            legacyStyle={false}
            options={state?.options}
            toolbarProps={state?.toolbarProps}
            onEventsChange={handleEventsChange}
            onCellClick={handleCellClick}
            onTaskClick={handleEventClick}
            onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
        />
    )
}

export default EventCalendar;