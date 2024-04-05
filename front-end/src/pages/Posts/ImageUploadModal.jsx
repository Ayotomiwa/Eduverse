import {Box, Button, Typography, Modal, TextField, IconButton, styled, Card} from '@mui/material';
import {PhotoCamera as PhotoCameraIcon, Close as CloseIcon} from '@mui/icons-material';
import UserContext from "../../hooks/UserProvider.jsx";
import {useContext} from "react";

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

const ImageUploadModal = ({
                              open,
                              closeModal,
                              selectedImage,
                              setPostToUpload,
                              pictureFileName,
                              handleImageChange,
                              caption, setCaption

                          }) => {

    const {user} = useContext(UserContext);
    const {university} = useContext(UserContext);


    const handlePost = () => {
        setPostToUpload({
            username: user.username,
            universityId: university.id,
            userId: user.id,
            imageUrl: pictureFileName,
            caption: caption,
            access: "PUBLIC",
            like: 0,
            comments: []
        });
        setCaption('');
        closeModal();
    }


    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <CloseButton onClick={closeModal}>
                    <CloseIcon/>
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
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    {!selectedImage && (
                        <Button variant="contained" component="label" startIcon={<PhotoCameraIcon/>}
                                sx={{textTransform: 'none'}}>
                            Choose Photo
                            <input type="file" hidden onChange={handleImageChange}/>
                        </Button>
                    )}
                    <Button variant="contained" onClick={handlePost} sx={{width: selectedImage ? "100%" : "unset"}}>
                        Post
                    </Button>
                </Box>

            </ModalContent>
        </StyledModal>
    );
};

export default ImageUploadModal;
