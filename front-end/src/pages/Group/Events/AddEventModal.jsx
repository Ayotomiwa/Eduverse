import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, TextField, FormControlLabel,
    Checkbox, Button, Grid, Box, IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Close as CloseIcon} from "@mui/icons-material";

const AddEventModal = ({ open, handleClose, event, setEvent,
                       handleEventSubmit
                       }) => {



    const handleChange = (prop) => (e) => {
        setEvent({ ...event, [prop]: e.target.value });
    };

    const handleDateChange = (date) => {
        setEvent({ ...event, dateTime: dayjs(date) });
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p:1}}>
                <DialogTitle
                    sx={{color: 'secondary.main'}}
                >Add Event</DialogTitle>
            <IconButton
             onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
                </Box>
            <DialogContent sx={{mb:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mt:1}}>
                        <TextField label="Event Name" value={event.name} onChange={handleChange('name')} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Description" value={event.description} onChange={handleChange('description')} fullWidth multiline />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="Date & Time" value={event.dateTime} onChange={handleDateChange} renderInput={(props) => <TextField {...props} fullWidth />} />
                        </LocalizationProvider>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <FormControlLabel control={<Checkbox checked={event.allDay} onChange={handleCheckChange} />} label="All Day" />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12}>*/}
                    {/*    <TextField label="Duration" value={event.duration} onChange={handleChange('duration')} fullWidth disabled={event.allDay} helperText="Enter duration in the format: '2:30' for 2hrs 30min" />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <TextField label="Location" value={event.location} onChange={handleChange('location')} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleEventSubmit}
                                color="secondary"
                                variant="contained"
                                fullWidth>Submit</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AddEventModal;