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
    Typography
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from "./Comments.jsx";
import {useEffect, useState} from "react";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import CommentInput from "../../components/CommentInput.jsx";
import axios from "axios";


const Post = ({post}) => {

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


    // const addComment = (comment) =>{
    //     setOpenComments(true);
    //     if(replyWhom && commentId){
    //         console.log("replyWhom", replyWhom);
    //         setComments(prevComments => {
    //             return prevComments.map(newComment => {
    //                 if (newComment.id === commentId) {
    //                     if (newComment.replies) {
    //                         newComment.replies.push({
    //                             username: "Mike Tyson",
    //                             desc: comment,
    //                         });
    //                     } else {
    //                         newComment.replies = [{
    //                             username: "Mike Tyson",
    //                             desc: comment,
    //                         }];
    //                     }
    //
    //                 }
    //                 return newComment;
    //             });
    //         });
    //         return;
    //     }
    //     const newComment = {
    //         username: "Mike Tyson",
    //         userid: 1,
    //         comment: comment,
    //         postId: post.id,
    //         userProfilePicUrl: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    //     }
    //     if(!comments){
    //         console.log("no comments");
    //         setComments([newComment]);
    //         // toggleComments()
    //         return;
    //     }
    //     console.log("comments", comments);
    //     setComments([ newComment, ...comments]);
    // }


    return (

        <Card sx={{width: "100%", border: "1 grey solid"}}>
            <CardContent sx={{display: 'flex', flexDirection: "column", gap: 2}}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1}}>
                    <Avatar variant="square" sx={{
                        bgcolor: 'secondary.main',
                        width: 24,
                        height: 24
                    }}>{post.username?.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant="subtitle2" component="div">
                        {post.username}
                    </Typography>
                </Box>
                {post.imageUrl && (
                    <CardMedia
                        component="img"
                        height="400"
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
                        {post.likes}
                    </Typography>
                </Box>
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

            </CardActions>
            <Divider/>
            <Box sx={{m: "10px"}}>
                <CommentInput
                    setReplyWhom={setReplyWhom}
                    username={post.username}
                    handleComment={addComment}
                    replyWhom={replyWhom}/>


                {/*<Avatar variant="cirle"  sx={{ bgcolor: 'secondary.main', width: 35, height: 35  }}>{post.username.charAt(0).toUpperCase()}</Avatar>*/}
                {/*<OutlinedInput sx={{width: "100%", borderRadius:"10px"}} placeholder="Add a comment" size="small"*/}
                {/*               endAdornment={*/}
                {/*    <InputAdornment position="end">*/}
                {/*        <IconButton edge="end" onClick={addComment} >*/}
                {/*            <MapsUgc />*/}
                {/*        </IconButton>*/}
                {/*    </InputAdornment>*/}
                {/*}*/}
                {/*    />*/}
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
