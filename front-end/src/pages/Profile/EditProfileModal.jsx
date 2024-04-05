

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Button, Card, CardActions, Divider, Typography, Box, TextField, styled, Modal, IconButton} from "@mui/material";
import {CardOverflow, Textarea} from "@mui/joy";
import {Close as CloseIcon} from "@mui/icons-material";

export default function EditProfileModal({open, closeModal}) {






    const userProfile = {
        name: "Jane Doe",
        bio: "Hello! I'm a 4th-year Engineering Student passionate about technology and design. Excited to connect with like-minded peers.",
        avatar: "https://via.placeholder.com/150",
        email: "janedoe@example.com",
        timezone: "GMT+5"
    };

    const StyledModal = styled(Modal)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    const ModalContent = styled(Card)({
        position: 'relative',
        width: '90%',
        maxWidth: '600px',
        outline: 'none',
        boxShadow: '24px',
        padding: '20px',
        borderRadius: '10px',
    });

    const CloseButton = styled(IconButton)({
        position: 'absolute',
        right: '10px',
        top: '10px',
    });




    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <CloseButton onClick={closeModal}>
                    <CloseIcon />
                </CloseButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRight: 1, borderColor: 'divider' }}>
                    <img
                        src={userProfile.avatar}
                        alt="profile"
                        style={{ width: 150, height: 150, borderRadius: '50%' }}
                    />
                    <Button
                        startDecorator={<PhotoCamera />}
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        Change Profile Pic
                    </Button>
                </Box>
                <Box sx={{ flex: 1, p: 2 }}>
                    <Typography level="h5" sx={{ mt: 2, mb: 2 }}>
                        {userProfile.name}
                    </Typography>
                    <Divider />
                    <TextField
                        defaultValue={userProfile.bio}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                        <Box sx={{ justifyContent: 'flex-end', p: 2 , mb:2 }}>
                            <Button variant="outlined" size="sm">Cancel</Button>
                            <Button variant="solid" size="sm">Save Changes</Button>
                        </Box>
                </Box>
            </ModalContent>
        </StyledModal>
    );
}


