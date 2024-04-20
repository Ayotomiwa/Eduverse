import {useContext, useEffect, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import axios from "axios";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import CreateThreadModal from "../../Group/Threads/CreateThreadModal.jsx";
import Thread from "../../Group/Threads/Thread.jsx";
import Channel from "./Channel.jsx";


const Channels = ({module, setChannelCount}) => {


    const [page, setPage] = useState(0);
    const {user, jwtToken} = useContext(UserContext);
    const [channels, setChannels] = useState([]);
    const [threadModalOpen, setThreadModalOpen] = useState(false);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);


    useEffect(() => {
        fetchChannels();
    }, [page, module]);


    useEffect(() => {
        if (channel) {
            postChannel();
        }
    }, [channel]);


    const fetchChannels = () => {
        axios.get(`http://localhost:8222/api/chat-service/modules/${module.id}/channels?userId=${user.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                // console.log(response.data.content);
                setChannels(response.data);
                setChannelCount(response.data.length);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch channels", error);
                setLoading(false);
            });
    }


    const postChannel = () => {
        axios.post(`http://localhost:8222/api/chat-service/modules/${module.id}/channels?userId=${user.id}`, channel,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                console.log("response", response.data);
                setChannels([response.data, ...channels]);
               // setChannels([response.data, ...channel]);
            })
            .catch(error => {
                console.error("Failed to post Channel", error);
            });
    }

    const closeModal = () => {
        setThreadModalOpen(false);
    }

    const handleSubmission = (topic) => {
        setChannel({
            topic: topic,
            moduleId: module.id,
            creatorId: user.id,
            creator: user.username
        });
    }


    return (
        <>
            {(user.authority === "ADMIN" || user.userType === "STAFF") && (
                <>
                    <Button
                        onClick={() => setThreadModalOpen(true)}
                        sx={{mb: 2}}
                        fullWidth
                        color="secondary"
                        startIcon={<img width="30" height="30"
                                        src="https://img.icons8.com/stickers/100/communication.png"
                                        alt="communication"/>}
                    >
                        Create A Channel
                    </Button>
                    <CreateThreadModal
                        open={threadModalOpen}
                        closeModal={closeModal}
                        setDiscussion={setChannel}
                        handleSubmission={handleSubmission}
                    />
                </>
            )}
            {loading ? (
                <Box>
                    <CircularProgress color="secondary"/>
                </Box>
            ) : (
                channels.length === 0 ? (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh"}}>
                        <Typography variant="h6">
                            No Channels found
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{display:"flex", alignItems:"center",  flexDirection:"column", width:"100%"}}>
                            <Box sx={{
                                mt: 2,
                                p:3,
                                width:"100%",
                                boxSizing:"border-box",
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly',
                                gap: 4,
                            }}>
                                {channels.map((channel) => (
                                    <Channel
                                        key={channel.id}
                                        moduleName={module.name}
                                        channel={channel}/>
                                ))}
                            </Box>
                            <Box>
                                <Button>
                                    Load more
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                ))}
        </>
    );
}

export default Channels;