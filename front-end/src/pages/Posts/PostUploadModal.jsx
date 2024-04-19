import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    IconButton,
    styled,
    Card,
    Select,
    InputLabel,
    FormControl, MenuItem
} from '@mui/material';
import {PhotoCamera as PhotoCameraIcon, Close as CloseIcon} from '@mui/icons-material';
import UserContext from "../../hooks/UserProvider.jsx";
import {useContext, useEffect, useState} from "react";
import SimpleSelect from "../../components/Input/SimpleSelect.jsx";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";

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

const PostUploadModal = ({
                              open,
                              closeModal,
                              selectedImage,
                              setPostToUpload,
                              pictureFileName,
                              handleImageChange,
                              caption, setCaption

                          }) => {

    const {user, jwtToken, university} = useContext(UserContext);
    const [faculties, setFaculties] = useState([]);
    const [faculty, setFaculty] = useState({});


    const handlePost = () => {
        if(caption === '' && !pictureFileName){
            return;
        }

        let post = {
            username: user.username,
            universityId: university.id,
            userId: user.id,
            imageUrl: pictureFileName,
            caption: caption,
            access: "STANDARD",
            like: 0,
            comments: []
        };

        console.log("Faculty ", faculty);
        if (faculty) {
            post = {
                ...post,
                facultyId: faculty.id,
                facultyName: faculty.name,
                access: "PUBLIC",
            };
        }

        setPostToUpload(post);
        setCaption('');
        closeModal();
    }

    useEffect(() => {
        if(user.authority !== "ADMIN"){
            return
        }
        fetchFaculties();
       },[]);



    const fetchFaculties = () => {
        axios.get(`http://localhost:8222/api/user-service/university/${university.id}/admin/${user.id}/faculties`,
            {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }).then((response) => {
                console.log(response.data);
            setFaculties(response.data);
        }).catch((error) => {
            console.error("Error fetching user:", error);
        })
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
                    <Box sx={{display:"flex", alignItems:"center", gap:2 , width: selectedImage ? "100%" : "unset"}}>
                        {user.authority === "ADMIN" && (
                            <Autocomplete
                                size="small"
                                sx={{width:"200px"}}
                                fullWidth
                                options={faculties.length > 0 ? faculties.map(faculty => faculty.name) : []}
                                getOptionLabel={(option) => option}
                                onChange={(event, newValue) => {
                                    setFaculty(faculties.find(faculty => faculty.name === newValue));
                                }}
                                renderInput={(params) => <TextField {...params} label="Post as" />}
                            />
                            )}
                        <Button variant="contained"
                                color="primary"
                                fullWidth={!!selectedImage}
                                onClick={handlePost}
                                sx={{width: selectedImage ? "100%" : "unset"}}>
                            Post
                        </Button>
                    </Box>
                </Box>

            </ModalContent>
        </StyledModal>
    );
};

export default PostUploadModal;
