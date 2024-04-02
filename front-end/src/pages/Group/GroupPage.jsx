import {Avatar, Box, Button, Card, CircularProgress, Divider, Paper, Typography} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import SimpleTab from "../../components/SimpleTab.jsx";
import EventsCard from "../Home/RightHomeBar/EventsCard.jsx";
import Posts from "../Posts/Posts.jsx";
import Threads from "./Threads/Threads.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import About from "./About/About.jsx";
import UserContext from "../../hooks/UserProvider.jsx";
import EventCalendar from "../../components/EventCalendar.jsx";
import GroupEvents from "./Events/GroupEvents.jsx";
import EditGroupProfileModal from "./EditGroupProfileModal.jsx";

const GroupPage = ({setOpenEditModal}) => {
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [community, setCommunity] = useState(null);
    const[editModalOpen, setEditModalOpen] = useState(false)
    const [tabValue, setTabValue] = useState(0);
    const tabs = ["Threads", "About", "Events"];


    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    }

    useEffect(() => {
        fetchCommunity()
    }, [id]);


    const fetchCommunity = () => {
        axios.get(`http://localhost:8222/api/group-service/groups/${id}`)
            .then(response => {
                setCommunity(response.data);
                // console.log("response", response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch community", error);
            });
    }


    return (
        <Box sx={{ display: "flex", flexDirection: "column", mx: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ width: "100%" }}>
                    <Card sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 1,
                        borderRadius: "12px",
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
                            <Box sx={{ position: 'relative', height: "40vh", overflow: "hidden" }}>
                                <img src={"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt={community?.name} style={{ width: "100%", position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
                                <Box sx={{ position: 'absolute', top: 0, right: 10, p: 2 }}>
                                    <Button variant="contained" color="secondary" size="large">
                                        {community?.membersIds?.includes(user.id) ? "Leave" : "Join"}
                                    </Button>
                                </Box>
                                <Box sx={{position: 'absolute', top: 220, right: 10, p: 2}}>
                                    <Typography variant="h5" color="white">
                                        <b>{community?.discussionCount}</b> 200 Discussions
                                    </Typography>
                                    <Typography variant="h5" color="white">
                                        <b>{community?.membersIds?.length}</b>00 Members
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ px: 2, pb: 0 }}>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    <Box sx={{flex:1, p:1}}>
                                        <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                            {community?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {community?.description}
                                        </Typography>
                                        <Button onClick={() => setEditModalOpen(true)} startIcon={<EditIcon />} variant="text" sx={{
                                            textTransform: 'none',
                                            p: 0,
                                            color: 'primary',
                                            textDecoration: 'underline',
                                        }}>
                                            Edit Profile
                                        </Button>
                                        <EditGroupProfileModal open={editModalOpen} closeModal={() => setEditModalOpen(false)}
                                                               community={community}
                                                               setCommunity={setCommunity}
                                            />
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
                    {tabValue === 0 && community && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Threads
                                community={community}
                            />
                        </Box>
                    )}
                    {tabValue === 1 && community && (
                        <Box>
                            <About
                                community={community}
                            />
                        </Box>
                    )}
                    {tabValue === 2 && community && (
                        <Box>
                            <GroupEvents
                                community={community}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );

}

    export default GroupPage;