import {useEffect, useState} from "react";
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
    CardActionArea
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import CommentIcon from "@mui/icons-material/Comment.js";
import CommentInput from "../../../components/CommentInput.jsx";
import Comments from "../../Posts/Comments.jsx";
import {useNavigate} from "react-router-dom";

const ThreadCard= ({post}) => {
    const navigate = useNavigate();

    const [openComments, setOpenComments] = useState(false);
    const [newComment, setNewComment] = useState(null);
    const [commentId, setCommentId] = useState(null);

    const [replyWhom, setReplyWhom] = useState(null);
    const [isLikedButton, setIsLikedButton] = useState(false)
    const [isLikedByUser, setIsLikeByUser] = useState(false);
    const commentsUrl = `http://localhost:8080/api/post-service/${post.id}/comments`;
    const fetchCommentsUrl = `http://localhost:8080/api/post-service/${post.id}/comments`;
    const replyUrl = `http://localhost:8080/api/post-service/comments/${commentId}/reply`;
    const likeUrl = `http://localhost:8080/api/post-service/posts/${post.id}/likes/${isLikedButton}?userId=1`;
    const [comments, setComments] = useState(null);

    const userId = 1;



    useEffect(() => {
        // console.log(post);
        if (openComments){
            fetchComments();
        }
    }, [openComments]);


    useEffect(() => {
        if(post.likesIds?.includes(userId)){
            setIsLikedButton(true);
            setIsLikeByUser(true);
        }
    },[]);


    useEffect(() => {
        if(isLikedButton !== isLikedByUser){
            postLikes();
            setIsLikeByUser(!isLikedByUser);
        }
    },[isLikedButton]);

    useEffect(() => {
        if (newComment) {
            if(replyWhom){
                console.log("replying, new comment", newComment);
                postReply();
                return
            }
            postComment();
        }
    }, [newComment]);




    const fetchComments = () => {
        axios.get(fetchCommentsUrl, post.commentIds)
            .then((response) => {
                if (response.data) {
                    console.log("comments", response.data);
                    setComments(response.data.sort((a, b) => a.createdAt - b.createdAt));
                }
            }).catch((error) => {
            console.error("Error fetching comments:", error);
        });
    }
    const postComment = () => {
        axios.post(commentsUrl, newComment)
            .then((response) => {
                console.log("response", response.data);
                fetchComments();
            }).catch((error) => {
            console.error("Error adding comment:", error);
        });
        setNewComment(null)
    };

    const postReply = () => {
        axios.post(replyUrl, newComment)
            .then((response) => {
                console.log("response", response.data);
                fetchComments();
            }).catch((error) => {
            console.error("Error adding comment:", error);
        });
        setNewComment(null)
    }


    const postLikes = () => {
        axios.post(likeUrl)
            .then((response) => {
                console.log("response", response.data);
            }).catch((error) => {
            console.error("Error adding like:", error);
        });
    }

    const handleLike = () => {
        setIsLikedButton(!isLikedButton)
    }

    const toggleComments = () => {
        console.log(post.commentIds);
        setOpenComments(!openComments);
    };


    const addComment = (comment) => {
        setOpenComments(true);
        setNewComment({
            username: "Mike Tyson",
            userId: 1,
            comment: comment,
            postId: post.id,
            userProfilePicUrl: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
        });
    }


    return (

        <Card sx={{width: "100%", border: "1 grey solid"}}>
            <CardActionArea
                onClick={() => {
                    navigate(`/community/thread`)
                    // window.location.href = `/contract/edit?contractId=${contractId}&color=${encodeURIComponent(color)}&default=${true}`;
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                            {post.username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={post.username}
                    subheader={new Date(post.createdAt).toLocaleDateString()}
                />
                {post.imageUrl && (
                    <CardMedia
                        component="img"
                        height="150"
                        image={post.imageUrl}
                        alt="User post"
                    />
                )}
            {post.caption && (
                <CardContent sx={{
                    display: "flex", alignItems: "center", justifyContent: !post.imageUrl ? "center" : "unset",
                    height: "100px",
                    mt: 0, mb: 0, pt: post.imageUrl ? 0 : 3
                }}>
                    <Typography variant={"h6"} color="black"
                                sx={{color: "black"}}
                    >
                        {post.caption}
                    </Typography>
                </CardContent>
            )}
            </CardActionArea>

            <CardActions disableSpacing sx={{
                display: "flex",
                justifyContent:"center",
                flexDirection: "row", mt: 0, mb: 0, pt: 0, pb: 0
            }}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <IconButton
                        onClick={handleLike}
                        sx={{'& svg': {fontSize: "30px"}}}>

                        {isLikedButton ?
                            (<Favorite sx={{color: "red"}}/>
                            ) : (
                                <FavoriteBorderOutlined sx={{color: "grey"}}/>
                            )}
                    </IconButton>
                    <Typography variant="body2" component="div">
                        {post.likes}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap:0.5}}>
                        <GroupsTwoToneIcon fontSize="large" sx={{color:"grey"}} />
                    <Typography variant="body2" component="div">
                        {post.commentIds?.length}
                    </Typography>
                </Box>

            </CardActions>

            <Divider/>
        </Card>

    );
};

export default ThreadCard;
