import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Button,
    Card,
    CardActions,
    Divider,
    Typography,
    Box,
    Select,
    TextField,
    styled,
    Modal,
    IconButton,
    Paper, MenuItem, CardMedia
} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import UserContext from "../hooks/UserProvider.jsx";


const EditModuleModal = ({open, closeModal,
                                   module ,
                                   saveChanges

                               }) =>  {

    const modulePlaceHolder=  useRef(null);
    const{user} = useContext(UserContext);
    const [picFileName, setPicFileName] = useState(null);
    const [picData, setPicData] = useState(null)


    useEffect(() => {
        modulePlaceHolder.current = {
            ...module,
            name: module?.name || '',
            description: module?.description || '',
            category: module?.category || '',
            about: module.about || '',
            profilePicUrl: module?.profilePicUrl || "",
        }

    },[module])


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPicFileName(event.target.files[0].name);
            setPicData(event.target.files[0]);
            console.log(event.target.files[0].name);
            modulePlaceHolder.current.profilePicUrl = URL.createObjectURL(event.target.files[0]);
        }
    }

    const handleChange = (e) => {
        modulePlaceHolder.current[e.target.name] = e.target.value;
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
        maxHeight:"80vh",
        overflowY:"auto",
        outline: 'none',
        boxShadow: '24px',
        padding: '20px',
        borderRadius: '10px',
        boxSizing:"border-box"
    });

    const CloseButton = styled(IconButton)({
        position: 'absolute',
        right: '10px',
        top: '10px',
    });


    const handleSave = () => {
        modulePlaceHolder.current.profilePicUrl = picFileName
        console.log("module", modulePlaceHolder.current)
        saveChanges(modulePlaceHolder.current, picData, picFileName)
        closeModal()
    }


    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <CloseButton onClick={closeModal}>
                    <CloseIcon/>
                </CloseButton>
                <Card sx={{display: "flex", alignItems: "stretch", m: 3}}>
                    <img
                        // src={community?.profilePicUrl ? community.profilePicUrl :  "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                        // src={"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                        src={modulePlaceHolder.current?.profilePicUrl}

                        style={{width: "100%", height: 230, objectFit: "cover"}}
                    />
                </Card>
                <Button
                    component="label"
                    startIcon={<PhotoCamera/>}
                    variant="contained"
                    color="secondary"
                    sx={{position: "absolute", top: 200, right: 50}}
                >
                    Change Profile Pic
                    <input type="file" hidden onChange={handleImageChange}/>
                </Button>

                <Box style={{display: "flex", flexDirection: "column", }}>
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        Module Name
                    </Typography>
                    <TextField
                        name="name"
                        placeholder="Name of your module"
                        defaultValue={modulePlaceHolder.current?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        Description
                    </Typography>
                    <TextField
                        name="description"
                        placeholder="One liner description of your module"
                        defaultValue={modulePlaceHolder.current?.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        About
                    </Typography>
                    <TextField
                        name="about"
                        placeholder="Brief Introduction to your Module"
                        defaultValue={modulePlaceHolder.current?.about}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        Category
                    </Typography>
                    <Select
                        name="course"
                        sx={{mb:5, mt:2}}
                        defaultValue={modulePlaceHolder.current?.category}
                        onChange={handleChange}
                    >
                        <MenuItem value='TECHNOLOGY'>Technology</MenuItem>
                        <MenuItem value='CAREER'>Career</MenuItem>
                        <MenuItem value='SPORTS'>Sports</MenuItem>
                        <MenuItem value='SOCIAL'>Social</MenuItem>
                        <MenuItem value='CULTURE'>Culture</MenuItem>
                        <MenuItem value='NETWORKING'>Networking</MenuItem>
                        <MenuItem value='ALUMNI'>Alumni</MenuItem>
                        <MenuItem value='OTHER'>Other</MenuItem>
                    </Select>
                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                        <Box sx={{ display:"flex", boxSizing:"border-box", gap:3}}>
                            <Button
                                onClick={closeModal}
                                variant="outlined" size="sm">Cancel</Button>
                            <Button
                                onClick={handleSave}
                                variant="solid" size="sm">Save Changes</Button>
                        </Box>
                    </Box>
                </Box>
            </ModalContent>
        </StyledModal>
    );
}

export default EditModuleModal;