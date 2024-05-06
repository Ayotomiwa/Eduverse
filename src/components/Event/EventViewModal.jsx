import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const EventViewModal = ({ open, event, setOpen }) => {


    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box sx={{display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'secondary.main',
                p: 1, pb:0
            }}>
                <DialogTitle
                    sx={{color: 'secondary.contrastText'}}
                >Event Details</DialogTitle>
                <IconButton
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon
                     sx={{color: 'secondary.contrastText'}}
                    />
                </IconButton>
            </Box>
            <DialogContent sx={{mb: 1, mt:0}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mt: 1}}>
                        <Typography variant="body1">
                            <b>Event Name:</b> {event?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <b>Description:</b> {event?.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <b>Location:</b> {event?.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <b>Host:</b> {event?.host}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <b>Date:</b> {event?.date}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <b>Time:</b> {event?.time}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default EventViewModal;