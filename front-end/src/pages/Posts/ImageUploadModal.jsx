import { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton, styled, Card } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Close as CloseIcon } from '@mui/icons-material';

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

const ImageUploadModal = ({ open, closeModal, selectedImage, setSelectedImage, setNewPost, posts }) => {
    // const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };


    const handlePost = () => {
        setNewPost({
            id: posts.length + 1,
            username: "Jane Doe",
            imageUrl: selectedImage,
            caption: caption,
            like:0,
            comments: []
        });
        setSelectedImage(null);
        setCaption('');
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
                        {selectedImage && (
                        <Box>
                            <img src={selectedImage} alt="Upload" style={{maxWidth: '100%', borderRadius: '10px'}}/>
                        </Box>
                            )}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Write a caption..."
                            multiline
                            rows={3}
                            margin="normal"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </Box>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    {!selectedImage && (
                        <Button variant="contained" component="label" startIcon={<PhotoCameraIcon />} sx={{ textTransform: 'none' }}>
                            Choose Photo
                            <input type="file" hidden onChange={handleImageChange} />
                        </Button>
                    )}
                        <Button variant="contained"  onClick={handlePost} sx={{width:selectedImage ? "100%" : "unset" }}>
                            Post
                        </Button>
                </Box>

            </ModalContent>
        </StyledModal>
    );
};

export default ImageUploadModal;
