

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Button,
    Card,
    CardActions,
    Divider,
    Typography,
    Box,
    TextField,
    styled,
    Modal,
    IconButton,
    useTheme
} from "@mui/material";
import {CardOverflow, Textarea} from "@mui/joy";
import {Close as CloseIcon} from "@mui/icons-material";
import {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../hooks/UserProvider.jsx";

export default function EditProfileModal({open, closeModal, userProfile }) {
     const theme = useTheme();


    const userProfileHolder=  useRef(null);
    const{user, university} = useContext(UserContext);
    const [picFileName, setPicFileName] = useState(null);
    const [coverPicFileName, setCoverPicFileName] = useState(null);
    const [picData, setPicData] = useState(null)
    const [coverPicData, setCoverPicData] = useState(null)


    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }



    useEffect(() => {
        userProfileHolder.current = {
            ...userProfile,
            name: userProfile?.name || '',
            bio: userProfile?.bio || '',
            profilePicUrl: userProfile?.profilePicUrl || "",
            coverPicUrl: userProfile?.coverPicUrl || "",
        }
    },[userProfile])


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
             setCoverPicFileName(event.target.files[0].name);
             setCoverPicData(event.target.files[0]);
            console.log(event.target.files[0].name);
            userProfileHolder.current.coverPicUrl = URL.createObjectURL(event.target.files[0]);

        }
    }

    const handleProfileImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPicFileName(event.target.files[0].name);
            setPicData(event.target.files[0]);
            console.log(event.target.files[0].name);
            userProfileHolder.current.profilePicUrl = URL.createObjectURL(event.target.files[0]);
        }
    }



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
                <Box sx={{display:"flex", FlexDirection:"row", alignItems:"center", border:"1px red solid", justifyContent:"space-between"}}>
                    <Box sx={{display: 'flex',
                        flexDirection: 'column',
                        width:"100%",
                        height: "15vh",
                        position: "relative", m:2}}>
                        <img
                            src={userProfileHolder.current?.profilePicUrl}
                            style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "25px"}}
                        />
                        <Button
                            component="label"
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{position: "absolute", top: "50%", left: "50%"}}
                        >
                            Change
                            <input type="file" hidden onChange={handleProfileImageChange}/>
                        </Button>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{mx: 2}} />
                    <Box sx={{
                        m:2,
                        position: "relative",
                        borderRadius: "12px",
                        height: "15vh",
                        width:"100%"
                    }}>
                        <img
                            src={userProfileHolder.current?.coverPicUrl}
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                        />
                        <Button
                            component="label"
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{position: "absolute", top: "50%", left: "50%"}}
                        >
                            Change
                            <input type="file" hidden onChange={handleImageChange}/>
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ flex: 1, p: 2 }}>
                    <Typography level="h5" sx={{ mt: 2, mb: 2 }}>
                        {capitalizeFirstLetter(userProfile.firstName)} {capitalizeFirstLetter(userProfile.lastName)}
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


