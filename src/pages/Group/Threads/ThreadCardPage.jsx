import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Divider,
    IconButton,
    Typography,
    CardHeader,
    CardActionArea, LinearProgress, CircularProgress
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import CommentInput from "../../../components/Input/CommentInput.jsx";
import ThreadComment from "./ThreadComment.jsx";
import {Pagination} from "@mui/material";
import {useParams} from "react-router-dom";
import UserContext from "../../../hooks/UserProvider.jsx";

const ThreadCardPage = () => {

    const {id} = useParams();
    const {user, jwtToken} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isLikedButton, setIsLikedButton] = useState(false)
    const [newComment, setNewComment] = useState(null);
    const [isLikedByUser, setIsLikeByUser] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [paginationPage, setPaginationPage] = useState(null)
    const [page, setPage] = useState(0)

    const SIZE = 15;
    const [discussion, setDiscussion] = useState(null);
    const [comments, setComments] = useState(null);


    useEffect(() => {
        if (newComment) {
            postComment();
        }
    }, [newComment]);


    useEffect(() => {
        if (!discussion) {
            fetchThread();
            return;
        }
        fetchComments();

    }, [discussion, paginationPage, commentAdded]);


    const fetchThread = () => {
        axios.get(`http://localhost:8222/api/group-service/groups/discussions/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                // console.log("response", response.data);
                setDiscussion(response.data);
                setIsLoading(false);
                // console.log("response", response.data);
            })
            .catch(error => {
                console.error("Failed to fetch discussion", error);
                setIsLoading(false);
            });
    }

    const fetchComments = () => {
        axios.get(`http://localhost:8222/api/group-service/discussions/${discussion.id}/comments?page=${page}&size=${SIZE}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                // console.log("comments", response.data);
                if (!comments || commentAdded) {
                    setPaginationPage(Math.ceil(response.data.totalElements / SIZE));
                    setPage(Math.ceil(response.data.totalElements / SIZE) - 1);
                    scrollTo(0, 0)
                }
                setComments(response.data.content);
                // console.log("comments", response.data);
                setTotalPages(response.data.totalPages);
                setCommentAdded(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch comments", error);
            });
    }


    const postComment = () => {
        axios.post(`http://localhost:8222/api/group-service/discussions/${id}/comments`, newComment,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                if (response.status === 200) {
                    console.log("comment added", response.data);
                    setCommentAdded(true);
                }
            }).catch(error => {
            console.log(error);
        });
    }

    const handleComment = (comment) => {
        console.log("comment", comment);
        setNewComment({
            comment: comment,
            username: user.username,
            userId: user.id,
            groupId: id
        });
    }


    const handlePageChange = (event, value) => {
        setPaginationPage(value);
        setPage(value - 1);
    }


    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px grey solid",
            minHeight: "95vh",
            mt: 2,
            boxSizing: 'border-box',
            boxShadow: "1.5px 1.5px 3px rgba(0,0,0,0.5)",
            m: 2
        }}>
            <Box>
                {isLoading || !discussion ? (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <CircularProgress color="secondary"/>
                    </Box>
                ) : (
                    <>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", p: 0.5}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: 'secondary.main'}} aria-label="recipe">
                                {discussion?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={discussion?.username}
                        subheader={new Date(discussion?.createdAt).toLocaleDateString()}
                    />
                    <CardActions disableSpacing sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        flexDirection: "row", mt: 0, mb: 0, pt: 0, pb: 0
                    }}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <IconButton
                                sx={{'& svg': {fontSize: "30px"}}}>
                                {isLikedButton ?
                                    (<Favorite sx={{color: "red"}}/>
                                    ) : (
                                        <FavoriteBorderOutlined sx={{color: "grey"}}/>
                                    )}
                            </IconButton>
                            <Typography variant="body2" component="div">
                                {discussion?.likesIds?.length}
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                            <GroupsTwoToneIcon fontSize="large" sx={{color: "grey"}}/>
                            <Typography variant="body2" component="div">
                                {discussion?.count}
                            </Typography>
                        </Box>
                    </CardActions>
                </Box>

                <CardContent sx={{
                    display: "flex", alignItems: "center", justifyContent: "unset",
                    mt: 0, mb: 0, pt: 3
                }}>
                    <Typography variant={"subtitle2"} color="black"
                                sx={{color: "black"}}
                    >
                        {discussion.topic}
                    </Typography>
                </CardContent>
                <Divider/>
                        {comments?.length > 0 && (
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mt: 2}}>
                    <Pagination count={totalPages} page={paginationPage} onChange={handlePageChange} variant="outlined"
                                color="secondary"/>
                </Box>
                        )}
                    </>
            )}
            </Box>
            <Box sx={{mx: 2, display: "flex", flexDirection: "column-reverse"}}>
                {comments?.map((comment, index) => (
                    <ThreadComment key={index}
                                   threadComment={comment}
                                   setCommentAdded={setCommentAdded}

                    />
                ))}
            </Box>

            {comments?.length > 0 && (
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mt: 3}}>
                <Pagination count={totalPages} page={paginationPage} onChange={handlePageChange} variant="outlined"
                            color="secondary"/>
            </Box>
                )}
            <Box sx={{p: 2, alignSelf: "flex-end", width: "100%", boxSizing: 'border-box'}}>
                <CommentInput
                    handleComment={handleComment}
                />
            </Box>
        </Card>
    );
}

export default ThreadCardPage;