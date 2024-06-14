import { useState } from 'react';
import {Box, Button, Typography, TextField, IconButton, styled, Card, Stack, Modal} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// const StyledModal = styled(({ className, ...other }) => (
//   <Card {...other} classes={{ root: className }} />
// ))(({ theme }) => ({
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '400px',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   bgcolor: theme.palette.background.paper,
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: theme.shape.borderRadius,
// }));

const AnnouncementModal = ({ isOpen, onClose }) => {





    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    bgcolor: "white",
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "25px",
                }}

            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={true}
                    >
                        Future Update
                    </Button>
            </Box>
        </Modal>
    );
};


export default AnnouncementModal;
