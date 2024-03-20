import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Grid,
    Paper,
    IconButton,
    Avatar,
    SvgIcon,
    lighten, Divider
} from '@mui/material';

import ImageUploadModal from "./ImageUploadModal.jsx";
import PollCreationModal from "./PollCreationModal.jsx";



const CreatePost = ({ setNewPost, posts}) => {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [openPollModal, setOpenPollModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    useEffect(() => {
        if (selectedImage) {
            setOpenImageModal(true);
        }
    },[selectedImage]);


    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleOpenImageModal = () => {
        if(selectedImage){
            setSelectedImage(null);
        }
        setOpenImageModal(true);
    }
    const handleCloseImageModal = () => setOpenImageModal(false);

    const handleOpenPollModal = () => setOpenPollModal(true);
    const handleClosePollModal = () => setOpenPollModal(false);

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };

    const profilePicture = "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <Paper sx={{ padding: 2, mt:-0.02, pt:0, pb:0, mb:1,  width:"100%",
            borderTop:"0.3px grey solid", borderRadius:"0 0 12px 12px",
            // bgcolor:"#F0F0F0",
            bgcolor:"white"
            // bgcolor: lighten ("#c9d1d3", 0.5)
        }}>
            <Box sx={{m:"25px"}}>
                <Typography textAlign="center" variant="h4"
                            sx={{color:"grey"}}>
                    Content Feed
                </Typography>
            </Box>
            <Divider />

            <Box  sx={{ display:"flex", justifyContent:"flex-start", alignItems:"center", p:1, gap:2}}>
                <Button size="large" component="label" sx={{color: "grey"}} startIcon={
                    <img width="35" height="35" src="https://img.icons8.com/plasticine/100/camera--v1.png"
                         alt="camera--v1"/>
                }>
                    <Typography>
                        Gallery
                    </Typography>
                    <input type="file" hidden onChange={handleImageUpload}/>

                </Button>
                <Button size="medium" sx={{color: "grey"}} startIcon={
                        <img width="35" height="35" src="https://img.icons8.com/clouds/100/combo-chart.png"
                             alt="combo-chart"/>
                    } onClick={handleOpenPollModal}>
                        <Typography>
                            Poll
                        </Typography>
                    </Button>
                <Button
                    variant="text"
                    fullWidth
                    size={"medium"}
                    transform="lowercase"
                    onClick={handleOpenImageModal}
                    sx={{color:"grey", borderRadius: "25px",
                        bgcolor: lighten ("#c9d1d3", 0.5),
                        border:"0.2px solid grey"}}
                >
                    <Typography variant="caption" sx={{color:"grey", letterSpacing:"0.1rem"}}>
                        +Share an Idea, a Question, a Story....
                    </Typography>
                </Button>
            </Box>
            {/*<Modal*/}
            {/*    open={openImageModal}*/}
            {/*    onClose={handleCloseImageModal}*/}
            {/*>*/}
                <Box>
                    <ImageUploadModal
                        open={openImageModal}
                        closeModal={handleCloseImageModal}
                                      selectedImage={selectedImage}
                                      setSelectedImage={setSelectedImage}
                                      setNewPost={setNewPost}
                                      posts={posts}
                    />
                </Box>
            {/*</Modal>*/}

                <Box>
                    <PollCreationModal isOpen={openPollModal} onClose={handleClosePollModal} />
                </Box>
        </Paper>
    );
};

export default CreatePost;

