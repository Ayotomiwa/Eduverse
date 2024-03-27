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
import ThreadComment from "./ThreadComment.jsx";
import {Pagination} from "@mui/lab";

const ThreadCardPage= () => {

    const [isLikedButton, setIsLikedButton] = useState(false)

    const post ={
        id: 1,
        username: "John Doe",
        createdAt: "2021-10-10",
        imageUrl: "https://source.unsplash.com/random",
        caption: "This is a post caption",
        likes: 10,
        commentIds: [1, 2]
    }

    const threadComments =[
        { id: 1,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3],
            parentComment: {
                id: 3,
                username: "John Doe",
                createdAt: "2021-10-10",
                message: "This is a threadComment caption",
                likeIds: [1, 2, 3],
            }
        },
        { id: 2,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3],
            parentComment: {
                id: 3,
                username: "John Doe",
                createdAt: "2021-10-10",
                message: "This is a threadComment caption",
                likeIds: [1, 2, 3],
            }
        },
        { id: 3,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3],
            parentComment: {
                id: 3,
                username: "John Doe",
                createdAt: "2021-10-10",
                message: "This is a threadComment caption",
                likeIds: [1, 2, 3],
            }
        },
        {
            id: 4,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3],
            parentComment: {
                id: 3,
                username: "John Doe",
                createdAt: "2021-10-10",
                message: "This is a threadComment caption",
                likeIds: [1, 2, 3],
            }
        },
        {
            id: 5,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3]
        },
        {
            id: 6,
            username: "John Doe",
            createdAt: "2021-10-10",
            message: "This is a threadComment caption",
            likeIds: [1, 2, 3]
        }
    ]













    return (
        <Card sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px grey solid", minHeight:"95vh", mt:2, boxSizing: 'border-box', m:2}}>
            <Box>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", p:0.5}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                                {post.username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={post.username}
                        subheader={new Date(post.createdAt).toLocaleDateString()}
                    />
                    <CardActions disableSpacing sx={{
                        display: "flex",
                        gap:2,
                        justifyContent:"center",
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
                </Box>
                {post.imageUrl && (
                    <CardMedia
                        component="img"
                        height="60"
                        image={post.imageUrl}
                        alt="User post"
                    />
                )}
                {post.caption && (
                    <CardContent sx={{
                        display: "flex", alignItems: "center", justifyContent: !post.imageUrl ? "center" : "unset",
                        mt: 0, mb: 0, pt: post.imageUrl ? 0 : 3
                    }}>
                        <Typography variant={"subtitle2"} color="black"
                                    sx={{color: "black"}}
                        >
                            {post.caption}
                        </Typography>
                    </CardContent>
                )}
                <Divider/>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", mt:2 }}>
                    <Pagination count={10} variant="outlined" color="secondary" />
                </Box>
            </Box>
            <Box sx={{mx:2}}>
                {threadComments.map((threadComment, index) => (
                    <ThreadComment key={index} threadComment={threadComment} />
                ))}
            </Box>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", mt:3 }}>
                <Pagination count={10} variant="outlined" color="secondary" />
            </Box>
            <Box sx={{p:2, alignSelf:"flex-end", width:"100%", boxSizing: 'border-box' }}>
                <CommentInput  />
            </Box>
        </Card>
    );
}

export default ThreadCardPage;