import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Box, Button, Card, IconButton, Modal, styled, TextField, Typography} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";


const EditModuleModal = ({
                             open, closeModal,
                             module,
                             saveChanges

                         }) => {

    const modulePlaceHolder = useRef(null);
    const {user} = useContext(UserContext);
    const [picFileName, setPicFileName] = useState(null);
    const [picData, setPicData] = useState(null)
    const [courses, setCourses] = useState([])


    useEffect(() => {
        modulePlaceHolder.current = {
            ...module,
            name: module?.name || '',
            description: module?.description || '',
            about: module?.about || '',
            code: module?.code || '',
            profileUrl: module?.profileUrl || "",
        }
    }, [module])


    useEffect(() => {


    }, [])


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPicFileName(event.target.files[0].name);
            setPicData(event.target.files[0]);
            console.log(event.target.files[0].name);
            modulePlaceHolder.current.profileUrl = URL.createObjectURL(event.target.files[0]);
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "code") {
            modulePlaceHolder.current[e.target.name] = e.target.value.toUpperCase();
        } else {
            modulePlaceHolder.current[e.target.name] = e.target.value;
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
        maxHeight: "80vh",
        overflowY: "auto",
        outline: 'none',
        boxShadow: '24px',
        padding: '20px',
        borderRadius: '10px',
        boxSizing: "border-box"
    });

    const CloseButton = styled(IconButton)({
        position: 'absolute',
        right: '10px',
        top: '10px',
    });


    const handleSave = () => {
        modulePlaceHolder.current.profileUrl = picFileName
        console.log("CommunityPlaceholder", modulePlaceHolder.current)
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
                        src={modulePlaceHolder.current?.profileUrl}

                        style={{width: "100%", height: 200, objectFit: "cover"}}
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

                <Box style={{display: "flex", flexDirection: "column",}}>
                    <Typography variant="subtitle" sx={{textAlign: 'left'}}>
                        Module Name
                    </Typography>
                    <TextField
                        name="name"
                        placeholder="Name of your module"
                        defaultValue={modulePlaceHolder.current?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{my: 2}}
                    />
                    <Typography variant="subtitle" sx={{textAlign: 'left'}}>
                        Module Code
                    </Typography>
                    <TextField
                        name="code"
                        placeholder="e.g CS101"
                        defaultValue={modulePlaceHolder.current?.code}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{my: 2}}
                    />
                    <Typography variant="subtitle" sx={{textAlign: 'left'}}>
                        Description
                    </Typography>
                    <TextField
                        name="description"
                        placeholder="One liner about the module"
                        defaultValue={modulePlaceHolder.current?.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        sx={{my: 2}}
                    />
                    <Typography variant="subtitle" sx={{textAlign: 'left'}}>
                        About
                    </Typography>
                    <TextField
                        name="about"
                        placeholder="Summary of the Module"
                        defaultValue={modulePlaceHolder.current?.about}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        sx={{my: 2}}
                    />
                    {/*<Typography variant="subtitle" sx={{ textAlign: 'left' }}>*/}
                    {/*    Course Name*/}
                    {/*</Typography>*/}
                    {/*<Autocomplete*/}
                    {/*    freeSolo*/}
                    {/*    id="courseName"*/}
                    {/*    options={courses}*/}
                    {/*    getOptionLabel={(option) => option.name || ''}*/}
                    {/*    // getOptionSelected={(option, value) => option.name === value.name}*/}
                    {/*    renderInput={(params) => <TextField {...params} />}*/}
                    {/*    // onChange={handleChange}*/}
                    {/*    onChange={(event, newValue) => {*/}
                    {/*        modulePlaceHolder.current.course = newValue? newValue : null*/}
                    {/*        // setFieldValue('name', newValue ? newValue.name : '');*/}
                    {/*        // const domain = newValue?.domains ? newValue.domains[0] : '';*/}
                    {/*        // setFieldValue('domain', domain);*/}
                    {/*    }}*/}
                    {/*    value={modulePlaceHolder.current.course?.name? modulePlaceHolder.current.course?.name : ""}*/}
                    {/*/>*/}

                    {/*<Select*/}
                    {/*    name="category"*/}
                    {/*    sx={{mb:5, mt:2}}*/}
                    {/*    defaultValue={modulePlaceHolder.current?.course.name}*/}
                    {/*    onChange={handleChange}*/}
                    {/*>*/}
                    {/*    <MenuItem value='TECHNOLOGY'>Technology</MenuItem>*/}
                    {/*    <MenuItem value='CAREER'>Career</MenuItem>*/}
                    {/*    <MenuItem value='SPORTS'>Sports</MenuItem>*/}
                    {/*    <MenuItem value='SOCIAL'>Social</MenuItem>*/}
                    {/*    <MenuItem value='CULTURE'>Culture</MenuItem>*/}
                    {/*    <MenuItem value='NETWORKING'>Networking</MenuItem>*/}
                    {/*    <MenuItem value='ALUMNI'>Alumni</MenuItem>*/}
                    {/*    <MenuItem value='OTHER'>Other</MenuItem>*/}
                    {/*</Select>*/}
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <Box sx={{display: "flex", boxSizing: "border-box", gap: 3}}>
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
