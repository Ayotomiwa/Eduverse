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
    CardActionArea, lighten, Button
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useNavigate} from "react-router-dom";

const ThreadComment = ({threadComment}) => {
    const navigate = useNavigate();
    const [isLikedButton, setIsLikedButton] = useState(false)
    const [isLikedByUser, setIsLikeByUser] = useState(false);
    const userId = 1;

            const handleLike = () =>{

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
                        <Box sx={{display:"flex", flexDirection:"row", gap:2}}>
                            <Typography variant="caption" color="white">
                                {threadComment.username} -
                            </Typography>
                            <Typography variant="caption" color="white">
                                {new Date(threadComment.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="white"
                        >
                            {threadComment.message}
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
                                {threadComment.likes}
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                            <GroupsTwoToneIcon fontSize="small" sx={{color: "white"}}/>
                            <Typography variant="caption" component="div">
                                {threadComment.commentIds?.length}
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
                    {threadComment.message}
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
                    <Button variant="contained" color="secondary">
                        Reply
                    </Button>
                </Box>

            </CardActions>
        </Card>
    );
};

export default ThreadComment;