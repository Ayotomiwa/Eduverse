import {Box, Button, Card, Typography, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../hooks/UserProvider.jsx";
import {Edit as EditIcon} from "@mui/icons-material";
import EditGroupProfileModal from "../../components/EditGroupProfileModal.jsx";
import SimpleTab from "../../components/Input/SimpleTab.jsx";
import useImageUpload from "../../hooks/useImageUpload.jsx";
import Threads from "../Group/Threads/Threads.jsx";
import GroupEvents from "../Group/Events/GroupEvents.jsx";
import axios from "axios";
import About from "./About/About.jsx";
import ModuleEvents from "./Event/ModuleEvents.jsx";
import ChatPage from "./Chat/ChatPage.jsx";
import Channels from "./Chat/Channels.jsx";

const ModulePage = () => {
    const theme = useTheme();
    const {id} = useParams();
    const {user, jwtToken, university} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [module, setModule] = useState(null);
    const[editModalOpen, setEditModalOpen] = useState(false)
    const [newMemberAdded, setNewMemberAdded] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const tabs = ["Chats", "About", "Events"];
    const postUrl = `http://localhost:8222/api/group-service/university/${university.id}/community`;

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    }


    const {
        saveToDatabase, initUpload, newDataSaved, initUploadDone,setNewDataSaved
    } = useImageUpload(jwtToken, university, postUrl);



    useEffect(() => {
        console.log("In Module Page");
        if(module && !newDataSaved && !newMemberAdded){
            return
        }
        console.log("Fetching module");
        fetchModule();
    }, [id, newDataSaved, newMemberAdded]);




    const fetchModule = () => {
        axios.get(`http://localhost:8222/api/user-service/modules/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                setModule(response.data);
                console.log("Community: ", response.data);
                setIsLoading(false);
                setNewDataSaved(false);
                setNewMemberAdded(false);
            })
            .catch(error => {
                console.error("Failed to fetch community", error);
            });
    }


    const saveChanges= (community, picData, fileName) => {
        const keyName =   `${university.id}/${fileName}`
        initUpload(community, picData, keyName);
    }




    return(
        <Box sx={{ display: "flex", flexDirection: "column", mx: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ width: "100%" }}>
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            pb: 1,
            borderRadius: "0 0 12px 12px",
            border:`0.5px ${theme.palette.secondary.main} solid`,
            boxShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            flexDirection: 'column',
            position: "sticky",
            zIndex: 1000,
            top: -290,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: "100%",
            }}>
                <Box sx={{ position: 'relative', height: "40vh", overflow: "hidden"}}>
                    <img src={"https://eduverse-v1.s3.eu-west-2.amazonaws.com/1/494106.jpg"} alt={module?.name} style={{ width: "100%", position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
                    {/*<Box sx={{ position: 'absolute', top: 0, right: 10, p: 2 }}>*/}
                    {/*    <Button variant="contained" color="secondary" size="large">*/}
                    {/*        {module?.membersIds?.includes(user.id) ? "Leave" : "Join"}*/}
                    {/*    </Button>*/}
                    {/*</Box>*/}
                    <Box sx={{position: 'absolute', top: 220, right: 10, p: 2}}>
                        <Typography variant="h5" color="white">
                            <b>{module?.discussionCount}</b> 200 Discussions
                        </Typography>
                        <Typography variant="h5" color="white">
                            <b>{module?.membersIds?.length}</b>00 Members
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ px: 2, pb: 0 }}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Box sx={{flex:1, p:1}}>
                            <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                {module?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {module?.description}
                            </Typography>
                            <Button onClick={() => setEditModalOpen(true)} startIcon={<EditIcon />} variant="text" sx={{
                                textTransform: 'none',
                                p: 0,
                                color: 'primary',
                                textDecoration: 'underline',
                            }}>
                                Edit Profile
                            </Button>
                            {/*<EditGroupProfileModal open={editModalOpen} closeModal={() => setEditModalOpen(false)}*/}
                            {/*                       community={module}*/}
                            {/*                       saveChanges={saveChanges}*/}

                            {/*/>*/}
                        </Box>
                        <Box sx={{ alignSelf: "flex-end", mt: 1, px: 1, width:"50%" }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center",
                                p: 2,
                                pb: 0,
                            }}>
                                <SimpleTab
                                    tabs={tabs}
                                    handleTabChange={handleTabChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
                    {tabValue === 0 && module && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Channels
                              module={module}
                          />
                        </Box>
                    )}
                    {tabValue === 1 && module && (
                        <Box>
                           <About
                               module={module}
                               setNewMemberAdded={setNewMemberAdded}
                               />
                        </Box>
                    )}
                    {tabValue === 2 && module && (
                        <Box>
                            <ModuleEvents
                                module={module}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>

    );
}

export default ModulePage;