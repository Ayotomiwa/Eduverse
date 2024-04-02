import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Thread from "./Thread.jsx";
import UserContext from "../../../hooks/UserProvider.jsx";
import CreateThreadModal from "./CreateThreadModal.jsx";

const Threads = ({community}) => {
    const [page, setPage] = useState(0);
    const {user} = useContext(UserContext);
    const [discussions, setDiscussions] = useState([]);
    const [threadModalOpen, setThreadModalOpen] = useState(false);
    const [discussion, setDiscussion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        fetchDiscussions();
    }, [page, community]);


    useEffect(() => {
        if (discussion) {
            postDiscussion();
        }
    }, [discussion]);


    const fetchDiscussions = () => {
        axios.get(`http://localhost:8222/api/group-service/groups/${community.id}/discussions?page=${page}`)
            .then(response => {
                // console.log(response.data.content);
                setDiscussions(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch discussions", error);
                setLoading(false);
            });
    }


    const postDiscussion = () => {
        axios.post(`http://localhost:8222/api/group-service/groups/${community.id}/discussions`, discussion)
            .then(response => {
                console.log("response", response.data);
                setDiscussions( [response.data, ...discussions]);
            })
            .catch(error => {
                console.error("Failed to post discussion", error);
            });
    }

    const closeModal = () => {
        setThreadModalOpen(false);
    }

    const handleSubmission = (topic) => {
        setDiscussion({
            topic: topic,
            groupId: community.id,
            userId: user.id,
            username: user.username
        });
    }


    return (
        <>
            {!community?.moderatorsIds?.includes(user.id) && (
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
                        Create A Discussion
                    </Button>
                    <CreateThreadModal
                        open={threadModalOpen}
                        closeModal={closeModal}
                        setDiscussion={setDiscussion}
                        handleSubmission={handleSubmission}
                    />
                </>
            )}
            {loading ? (
                <Box>
                    <CircularProgress color="secondary"/>
                </Box>
            ) : (
                discussions.length === 0 ? (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh"}}>
                        <Typography variant="h6">
                            No discussions found
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{
                            display: "flex", flexDirection: "column", justifyContent: "center",
                            alignItems: "center", gap: 4, mb: "150px", minHeight: "20vh"
                        }}>
                            {discussions.map((disc) => (
                                <Thread key={disc.id} discussion={disc}/>
                            ))}
                        </Box>
                        <Box>
                            <Button>
                                Load more
                            </Button>
                        </Box>
                    </Box>
                ))}
        </>
    );
}

export default Threads;