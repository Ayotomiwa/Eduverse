import {Box, Button, lighten, SvgIcon, Typography} from "@mui/material";
import {PlusIcon} from "lucide-react";
import ImageUploadModal from "./ImageUploadModal.jsx";
import PollCreationModal from "./PollCreationModal.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../hooks/UserProvider.jsx";

const CreatePost = ({setNewPost}) => {


    const {jwtToken} = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [openImageModal, setOpenImageModal] = useState(false);
    const [openPollModal, setOpenPollModal] = useState(false);
    const universityId = 1;
    const [keyName, setKeyName] = useState(null);
    const [pictureFileName, setPictureFileName] = useState(null);
    const [pictureData, setPictureData] = useState(null);
    const [uploadDone, setUploadDone] = useState(false);
    const [postToUpload, setPostToUpload] = useState(false);


    useEffect(() => {
        if (pictureFileName) {
            setKeyName(`${universityId}/${pictureFileName}`);
        }
    }, [pictureFileName]);


    useEffect(() => {
        if (selectedImage) {
            setOpenImageModal(true);
        }
    }, [selectedImage]);


    useEffect(() => {
        if (uploadDone) {
            console.log("upload done");
            saveToDatabase();
            setUploadDone(false);
            setPostToUpload(null);
            setPictureFileName(null);
        }
    }, [uploadDone]);


    useEffect(() => {
        if (postToUpload) {
            console.log("post to upload");

            if (pictureData && postToUpload.imageUrl) {
                console.log("Uploading image to S3");
                (async () => {
                    try {
                        const signedUrl = await getSignedUrl();
                        if (signedUrl) {
                            try {
                                const response = await axios.put(signedUrl, pictureData, {
                                    headers: {
                                        'Content-Type': pictureData.type
                                    },
                                });
                                if (response.status === 200) {
                                    console.log('Image uploaded to S3', response);
                                    setUploadDone(true);
                                    setSelectedImage(null);
                                }
                            } catch (error) {
                                console.error('Error uploading to S3:', error);
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })();
            } else {
                console.log("No image to upload");
                setUploadDone(true);
            }
        }

        // if(postToUpload){
        //     setNewPost(postToUpload);
        // }

    }, [postToUpload]);


    const getSignedUrl = () => {
        console.log("In get signed" + pictureFileName);
        return axios.get(`http://localhost:8222/api/post-service/presigned-url?bucketName=eduverse-v1&keyName=${keyName}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const saveToDatabase = () => {
        console.log("saving to database");
        axios.post("http://localhost:8222/api/post-service/posts", postToUpload,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("Post saved to database");
                    // console.log(response.data);
                    setNewPost(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPictureFileName(event.target.files[0].name);
            setPictureData(event.target.files[0]);
            console.log(event.target.files[0].name);
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    }


    const handleOpenImageModal = () => {
        if (selectedImage) {
            setSelectedImage(null);
        }
        setOpenImageModal(true);
    }
    const handleCloseImageModal = () => {
        setSelectedImage(null);
        setOpenImageModal(false);
    }

    const handleOpenPollModal = () => setOpenPollModal(true);
    const handleClosePollModal = () => setOpenPollModal(false);


    return (
        <>
            <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center", p: 1, gap: 2}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                    <Button size="large" component="label" sx={{color: "grey"}} startIcon={
                        <img width="35" height="35" src="https://img.icons8.com/plasticine/100/camera--v1.png"
                             alt="camera--v1"/>
                    }>
                        <Typography>
                            Gallery
                        </Typography>
                        <input type="file" hidden onChange={handleImageChange}/>

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
                        width: "100%"
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
                    setPostToUpload={setPostToUpload}
                    setCaption={setCaption}
                    caption={caption}
                    pictureFileName={pictureFileName}
                    handleImageChange={handleImageChange}
                />
            </Box>
            <Box>
                <PollCreationModal isOpen={openPollModal} onClose={handleClosePollModal}/>
            </Box>
        </>
    )
}
export default CreatePost;