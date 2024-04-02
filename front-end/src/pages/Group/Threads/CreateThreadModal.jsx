import {Box, Button, Card, IconButton, Modal, styled, TextField, Typography} from "@mui/material";
import {Close as CloseIcon, PhotoCamera as PhotoCameraIcon} from "@mui/icons-material";
import {useState} from "react";

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

const CreateThreadModal = ({ open,
                              closeModal,
                              setDiscussion,
                              handleSubmission

                          }) => {


    const [topic, setTopic] = useState('');

    const handleCreate = () => {
        handleSubmission(topic);
        setTopic('');
        closeModal();
    }



    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <CloseButton onClick={closeModal}>
                    <CloseIcon />
                </CloseButton>
                <Typography variant="h6" textAlign="center" marginBottom="20px">
                    Create a Post
                </Typography>

                <Box textAlign="center" marginBottom="20px">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write a Topic to Discuss..."
                        multiline
                        rows={3}
                        margin="normal"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </Box>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Button variant="contained"  onClick={handleCreate}>
                        Create
                    </Button>
                </Box>

            </ModalContent>
        </StyledModal>
    );
};

export default CreateThreadModal;