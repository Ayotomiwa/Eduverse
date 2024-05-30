import {Box, Button, Card, CircularProgress, Typography, useTheme} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import SimpleTab from "../../components/Input/SimpleTab.jsx";
import Threads from "./Threads/Threads.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import About from "./About/About.jsx";
import UserContext from "../../hooks/UserProvider.jsx";
import GroupEvents from "./Events/GroupEvents.jsx";
import EditGroupProfileModal from "../../components/EditGroupProfileModal.jsx";
import useImageUpload from "../../hooks/useImageUpload.jsx";

const GroupPage = () => {
    const theme = useTheme();
    const {id} = useParams();
    const {user, jwtToken, university, API_GATEWAY} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [community, setCommunity] = useState(null);
    const [membersIds, setMembersIds] = useState(null);
    const [moderatorsIds, setModeratorsIds] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [discussionCount, setDiscussionCount] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [joined, setJoined] = useState(false);
    const [processingJoin, setProcessingJoin] = useState(false);

    const postUrl = `${API_GATEWAY}/api/group-service/university/${university.id}/groups`;
    const tabs = ["Threads", "About", "Events"];


    const {
        saveToDatabase, initUpload, newDataSaved, initUploadDone, setNewDataSaved
    } = useImageUpload(jwtToken, university, postUrl);


    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    }

    useEffect(() => {
        if (moderatorsIds && membersIds) {
            setJoined(moderatorsIds?.includes(user.id) || membersIds?.includes(user.id));
        }
    }, [moderatorsIds, membersIds])

    useEffect(() => {
        if (initUploadDone) {
            saveToDatabase();
        }
    }, [initUploadDone]);


    useEffect(() => {
        if (community && !newDataSaved) {
            return
        }
        fetchMembers();
        fetchCommunity();
    }, [id, newDataSaved]);


    const handleFollow = () => {
        setProcessingJoin(true);
        if (!joined) {
            joinGroup();
            return;
        }
      leaveGroup();
    }


    const leaveGroup = () => {
        axios.post(`${API_GATEWAY}/api/group-service/groups/${id}/members/${user.id}/leave`, {},
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }).then(() => {
            fetchMembers();
            fetchCommunity();
            setProcessingJoin(false);
        }).catch(error => {
            console.error("Failed to update relationship", error);
            setProcessingJoin(false);
        });
    }


    const joinGroup = () => {
        axios.post(`${API_GATEWAY}/api/group-service/groups/${id}/members`,
            {
                userId: user.id,
                username: user.username,
            },
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }).then(() => {
            fetchMembers();
            fetchCommunity();
            setProcessingJoin(false);
        }).catch(error => {
            setProcessingJoin(false);
            console.error("Failed to update relationship", error);
        });
    }

    const fetchMembers = () => {
        axios.get(`${API_GATEWAY}/api/group-service/groups/${id}/members?isAccepted=true`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((response) => {
                // console.log("membersIds", response.data);
                console.log(response.data)
                setModeratorsIds(response.data.filter(member => member.role === "MODERATOR").map(moderator => moderator.userId));
                setMembersIds(response.data.filter(member => member.role === "MEMBER").map(member => member.userId));
                setIsLoading(false);
                console.log("ModeratorsIds", moderatorsIds);
                console.log("MembersIds", membersIds);
            }).catch((error) => {
            console.error("Error fetching membersIds:", error);
            setIsLoading(false);
        });
    }


    const fetchCommunity = () => {
        axios.get(`${API_GATEWAY}/api/group-service/groups/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setCommunity(response.data);
                console.log("Community: ", response.data);
                setNewDataSaved(false);
            })
            .catch(error => {
                console.error("Failed to fetch community", error);
                setIsLoading(false);
            });
    }

    const saveChanges = (community, picData, fileName) => {
        const keyName = `${university.id}/${fileName}`
        initUpload(community, picData, keyName);
    }


    return (
        <Box sx={{display: "flex", flexDirection: "column", mx: 4}}>
            {isLoading ? (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <CircularProgress/>
                </Box>
            ) : (

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2}}>
                    <Box sx={{width: "100%"}}>
                        <Card sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            pb: 1,
                            borderRadius: "0 0 12px 12px",
                            border: `0.5px ${theme.palette.secondary.main} solid`,
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
                                <Box sx={{position: 'relative', height: "40vh", overflow: "hidden"}}>
                                    <img src={community?.profilePicUrl} alt={community?.name} style={{
                                        width: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        objectFit: "cover"
                                    }}/>
                                    <Box sx={{position: 'absolute', top: 0, right: 10, p: 2}}>
                                        <Button
                                            onClick={handleFollow}
                                            disabled={processingJoin}
                                            variant="contained"
                                            color="secondary"
                                            size="large">
                                            {joined ? "Leave" : "Join"}
                                        </Button>
                                    </Box>
                                    <Box sx={{position: 'absolute', top: 150, right: 10, p: 2}}>
                                        <Typography variant="h5" color="white">
                                            <b>{discussionCount}</b> Discussions
                                        </Typography>
                                        <Typography variant="h5" color="white">
                                            <b>{membersIds?.length + moderatorsIds?.length}</b> Members
                                        </Typography>
                                        <Typography variant="h5" color="white">
                                            <b>0</b> Upcoming Events
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{px: 2, pb: 0}}>
                                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        <Box sx={{flex: 1, p: 1}}>
                                            <Typography variant="h5" sx={{textAlign: 'left'}}>
                                                {community?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {community?.description}
                                            </Typography>
                                            <Button onClick={() => setEditModalOpen(true)} startIcon={<EditIcon/>}
                                                    variant="text" sx={{
                                                textTransform: 'none',
                                                p: 0,
                                                color: 'primary',
                                                textDecoration: 'underline',
                                            }}>
                                                Edit Profile
                                            </Button>
                                            <EditGroupProfileModal open={editModalOpen}
                                                                   closeModal={() => setEditModalOpen(false)}
                                                                   community={community}
                                                                   saveChanges={saveChanges}

                                            />
                                        </Box>
                                        <Box sx={{alignSelf: "flex-end", mt: 1, px: 1, width: "50%"}}>
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
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Threads
                                    community={community}
                                    setDiscussionCount={setDiscussionCount}
                                    isModerator={moderatorsIds?.includes(user.id)}
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
            )}
        </Box>
    );

}

export default GroupPage;