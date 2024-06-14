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
    Link,
    Typography, useTheme
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from "./Comments.jsx";
import {useContext, useEffect, useState} from "react";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import CommentInput from "../../components/Input/CommentInput.jsx";
import axios from "axios";
import UserContext from "../../hooks/UserProvider.jsx";
import {UseCheckFeature} from "../../hooks/FeatureChecks/UseCheckFeature.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const Post = ({post, setPosts}) => {
    const theme = useTheme();
    const {university} = useContext(UserContext)
    const {user, API_GATEWAY} = useContext(UserContext)
    const{jwtToken} = useContext(UserContext)

    const [openComments, setOpenComments] = useState(false);
    const [newComment, setNewComment] = useState(null);
    const [commentId, setCommentId] = useState(null);

    const [replyWhom, setReplyWhom] = useState(null);
    const [isLikedButton, setIsLikedButton] = useState(false)
    const [isLikedByUser, setIsLikeByUser] = useState(false);
    const commentsUrl = `/api/post-service/${post.id}/comments`;
    const fetchCommentsUrl = `/api/post-service/${post.id}/comments`;
    const replyUrl = `/api/post-service/comments/${commentId}/reply`;
    const likeUrl = `/api/post-service/posts/${post.id}/likes/${isLikedButton}?userId=1`;
    const deletePostUrl = `/api/post-service/posts/${post.id}/delete?user-id=${user.id}`;
    const [comments, setComments] = useState(null);

    const userId = user.id;

    const featureCheck = UseCheckFeature("POST_COMMENTING");
    const postCommentAllowed = featureCheck.checkUserAccess("POST_COMMENTING");



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
        axios.get(API_GATEWAY + fetchCommentsUrl,{
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }})
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
        axios.post(API_GATEWAY + commentsUrl, newComment, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }})
            .then((response) => {
                console.log("response", response.data);
                fetchComments();
                setPosts(posts => posts.map((p) => {
                    if(p.id === post.id) {
                        p.commentIds?.push(response.data.id);
                    }
                    return p;
                }));
            }).catch((error) => {
            console.error("Error adding comment:", error);
        });
        setNewComment(null)
    };

    const postReply = () => {
        axios.post(API_GATEWAY + replyUrl, newComment,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then((response) => {
                console.log("response", response.data);
                fetchComments();
            }).catch((error) => {
            console.error("Error adding comment:", error);
        });
        setNewComment(null)
    }


    const postLikes = () => {
        axios.post(API_GATEWAY + likeUrl, null,{
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then((response) => {
                setPosts(posts => posts.map((p) => {
                    if(p.id === post.id){
                        if(isLikedButton){
                            p.likesIds?.push(userId);
                        }
                        else{
                            p.likesIds = p.likesIds?.filter(id => id !== userId);
                        }
                    }
                    return p;
                }));
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
            username: user.username,
            userId: user.id,
            comment: comment,
            postId: post.id,
            userPicUrl: user.profileInfo?.profilePicUrl,
        });
    }


    const deletePost = () => {
     axios.post(API_GATEWAY + deletePostUrl, {}, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then((response) => {
            console.log("Post deleted", response.data);
            setPosts(posts => posts.filter(p => p.id !== post.id));
        }).catch((error) => {
            console.error("Error deleting post:", error);
        });
     }


    return (

        <Card sx={{width: "100%",
            boxShadow: "1.5px 1.5px 3px rgba(0,0,0,0.5)",
        }}>
            <CardContent sx={{display: 'flex', flexDirection: "column", gap: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
                        <Avatar variant="square" sx={{
                            bgcolor: 'secondary.main',
                            color:"secondary.contrastText",
                            border: `0.5px solid ${theme.palette.primary.dark}`,
                            width: 30,
                            height: 30
                        }}>
                            { post.userProfileUrl ? post.userProfileUrl : post.facultyId? post.facultyName?.charAt(0).toUpperCase() : post.username?.charAt(0).toUpperCase() }
                        </Avatar>
                        <Link
                            sx={{cursor: "pointer"}}
                            color="textPrimary"
                            onClick={() =>  window.location.href = `/profile/${post.facultyId? post.facultyId : post.userId}`}
                            variant="subtitle2" >
                            {post.facultyId ? <><b>{post.facultyName?.toUpperCase()}</b> - posted by</> : ""} {post.username}
                        </Link>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(post.createdAt).toLocaleString()}
                            </Typography>
                        </Box>
                    </Box>
                    {post.userId === user.id && (
                    <Box sx={{cursor: "pointer", ml:"auto"}} >
                        <IconButton>
                            <ClearOutlinedIcon  sx={{colour: "primary.main"}} onClick={deletePost}/>
                        </IconButton>
                    </Box>
                    )}
                </Box>
                {post.imageUrl && (
                    <CardMedia
                        component="img"
                        height="350"
                        image={post.imageUrl}
                        alt="User post"
                    />
                )}
            </CardContent>
            {!post.imageUrl && (
                <Divider/>
            )}
            {post.caption && (
                <CardContent sx={{
                    display: "flex", alignItems: "center", justifyContent: !post.imageUrl ? "center" : "unset",
                    maxHeight: "50px",
                    mt: 0, mb: 0, pt: post.imageUrl ? 0 : 3
                }}>
                    <Typography variant={post.imageUrl ? "subtitle1" : "h6"} color="black"
                                sx={{color: "black"}}
                    >
                        {post.caption}
                    </Typography>
                </CardContent>
            )}
            <CardActions disableSpacing sx={{
                display: "flex",
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
                        {post.likesIds?.length}
                    </Typography>
                </Box>
                { postCommentAllowed && (
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <IconButton
                        onClick={toggleComments}
                        sx={{'& svg': {fontSize: 30}}}>
                        <CommentIcon/>
                    </IconButton>
                    <Typography variant="body2" component="div">
                        {post.commentIds?.length}
                    </Typography>
                </Box>
                )}
            </CardActions>
            {postCommentAllowed  && ( <Divider/> )}
            <Box sx={{m: "10px"}}>
                {postCommentAllowed && (
                        <CommentInput
                            setReplyWhom={setReplyWhom}
                            username={post.username}
                            handleComment={addComment}
                            replyWhom={replyWhom}/>

                )}

            </Box>
            {comments && (
            <Collapse in={openComments} timeout="auto" unmountOnExit>
                <Comments comments={comments}
                          setReplyWhom={setReplyWhom}
                          setCommentOwnerId={setCommentId}
                />
            </Collapse>
                )}
        </Card>

    );
};

export default Post;
