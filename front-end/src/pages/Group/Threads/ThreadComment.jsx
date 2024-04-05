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
    CardActionArea, lighten, Button
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useNavigate} from "react-router-dom";
import CommentInput from "../../../components/CommentInput.jsx";
import UserContext from "../../../hooks/UserProvider.jsx";

const ThreadComment = ({threadComment, setCommentAdded}) => {
    const{user, jwtToken} = useContext(UserContext);
    const navigate = useNavigate();
    const [openComments, setOpenComments] = useState(false);
    const [isLikedButton, setIsLikedButton] = useState(false);
    const [newReply, setNewReply] = useState(null);
    const [isLikedByUser, setIsLikeByUser] = useState(false);



    const handleLike = () =>{

    }



    useEffect(() => {
        if(newReply){
            // console.log("newReply", newReply);
            handleReply();
        }
    },[newReply]);

    const handleComment = (comment) => {
        console.log("comment", comment);
        setNewReply({
            comment: comment,
            username: user.username,
            userId: user.id,
        });
    }


    const handleReply = () => {
        axios.post(`http://localhost:8222/api/group-service/discussions/comments/${threadComment.id}/reply`, newReply,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                if(response.status === 200){
                    console.log("reply added", response.data);
                    setCommentAdded(true);
                }
            }).catch(error => {
            console.log(error);
            });
    }

    return (

        <Card sx={{boxSizing:"border-box", border: "1px black solid", m:3, mb:4}}>
            <CardContent sx={{display: "flex", flexDirection:"column", mb:0}}>
                <Box sx={{display:"flex", flexDirection:"row", gap:1}}>
                    <Typography variant="subtitle2">
                        "Post by {threadComment.username}" -
                    </Typography>
                    <Typography variant="subtitle2" color="black">
                        {new Date(threadComment.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
            {threadComment.parentComment && (
                <Card sx={{ m: 2, p:1, mt:0,
                    backgroundColor: "primary.light"}}>
                    <CardContent sx={{display: "flex", flexDirection:"column"}}>
                        <Box sx={{display:"flex", flexDirection:"row", gap:1}}>
                            <Typography variant="caption" color="white">
                               Original post by {threadComment.parentComment.username} -
                            </Typography>
                            <Typography variant="caption" color="white">
                                {new Date(threadComment.parentComment.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="white"
                        >
                            {threadComment.parentComment.comment}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap:1,
                        flexDirection: "row", mt: 0, mb: 0, pt: 0, pb: 0
                    }}>
                        <Box sx={{display: "flex", alignItems: "center", mt:0}}>
                            {isLikedButton ?
                                    (<Favorite sx={{color: "red"}} fontSize="small"/>
                                    ) : (
                                        <FavoriteBorderOutlined fontSize="small" sx={{color: "white"}}/>
                                    )}
                            <Typography variant="subtitle2" component="div">
                                {threadComment.parentComment.likesIds?.length}
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                            <GroupsTwoToneIcon fontSize="small" sx={{color: "white"}}/>
                            <Typography variant="caption" component="div">
                                {threadComment.parentComment.count}
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
            )}
            <CardContent sx={{
                display: "flex", alignItems: "center",
                mt: 0, mb: 0, pt: 3
            }}>
                <Typography variant="subtitle2" color="black"
                            sx={{color: "black"}}
                >
                    {threadComment.comment}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{
                display: "flex",
                flexDirection: "row", mt: 0, mb: 0, pt: 0, pb: 0,
                justifyContent: "space-between"
            }}>
                <Box sx={{display: "flex", flexDirection:"row"}}>
                    <Box sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
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
                            {threadComment.likes}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        <GroupsTwoToneIcon fontSize="large" sx={{color: "grey"}}/>
                        <Typography variant="body2" component="div">
                            {threadComment.commentIds?.length}
                        </Typography>
                    </Box>

                </Box>
                <Box>
                    <Button
                        onClick={() => setOpenComments(!openComments)}
                        variant="contained" color="secondary">
                        Reply
                    </Button>
                </Box>
            </CardActions>
            <Collapse in={openComments} timeout="auto" unmountOnExit>
                <Box sx={{p: 2, alignSelf: "flex-end", width: "100%", boxSizing: 'border-box'}}>
                    <CommentInput
                    handleComment={handleComment}
                    />
                </Box>
            </Collapse>
        </Card>
    );
};

export default ThreadComment;