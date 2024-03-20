import {useEffect, useState} from 'react';
import {Box, Button, Divider, lighten, Paper, SvgIcon, Typography} from '@mui/material';

import ImageUploadModal from "./ImageUploadModal.jsx";
import PollCreationModal from "./PollCreationModal.jsx";
import SimpleTab from "../../components/SimpleTab.jsx";
import {PlusIcon} from "lucide-react";


const CreatePost = ({setNewPost, posts}) => {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [openPollModal, setOpenPollModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const tabs = ["Public", "Friends"];


    useEffect(() => {
        if (selectedImage) {
            setOpenImageModal(true);
        }
    }, [selectedImage]);


    const handleTabChange = (event, newValue) => {


    };


    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleOpenImageModal = () => {
        if (selectedImage) {
            setSelectedImage(null);
        }
        setOpenImageModal(true);
    }
    const handleCloseImageModal = () => setOpenImageModal(false);

    const handleOpenPollModal = () => setOpenPollModal(true);
    const handleClosePollModal = () => setOpenPollModal(false);

    const profilePicture = "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <Paper sx={{
            padding: 2, mt: -0.02, pt: 0, pb: 0, mb: 1, width: "100%",
            borderTop: "0.3px grey solid", borderRadius: "0 0 12px 12px",
            // bgcolor:"#F0F0F0",
            bgcolor: "white"
            // bgcolor: lighten ("#c9d1d3", 0.5)
        }}>
            <Box sx={{m: "25px"}}>
                <Typography textAlign="center" variant="h4"
                            sx={{color: "grey"}}>
                    Content Feed
                </Typography>
            </Box>
            <Box>
                <SimpleTab
                    tabs={tabs}
                    handleTabChange={handleTabChange}
                />
            </Box>
            <Divider/>

            <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center", p: 1, gap:2}}>
                <Box sx={{display: "flex", flexDirection:"row", alignItems: "center", gap:1}}>
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
                    <Button size="medium" sx={{color: "grey"}} startIcon={
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/siren.png" alt="siren"/>
                    } onClick={handleOpenPollModal}>
                        <Typography>
                            Shout
                        </Typography>
                    </Button>
                </Box>

                <Button
                    variant="text"
                    size={"medium"}
                    transform="lowercase"
                    onClick={handleOpenImageModal}
                    sx={{
                        color: "grey", borderRadius: "25px",
                        bgcolor: lighten("#c9d1d3", 0.1),
                        border: "0.2px solid grey",
                        width:"100%"
                    }}
                >
                    <SvgIcon>
                        <PlusIcon/>
                    </SvgIcon>
                    <Typography variant="caption" sx={{color: "grey", letterSpacing: "0.1rem"}}>
                       Share Something
                    </Typography>
                </Button>
            </Box>
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
            <Box>
                <PollCreationModal isOpen={openPollModal} onClose={handleClosePollModal}/>
            </Box>
        </Paper>
    );
};

export default CreatePost;

