import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Typography,
    CardHeader,
    CardActionArea
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useNavigate} from "react-router-dom";
import UserContext from "../../../hooks/UserProvider.jsx";

const Thread= ({discussion}) => {
    const navigate = useNavigate();
    const{user, jwtToken, API_GATEWAY} = useContext(UserContext);
    const [isLikedButton, setIsLikedButton] = useState(false)
    const [isLikedByUser, setIsLikeByUser] = useState(false);
    const likeUrl = `${API_GATEWAY}/api/group-service/group/discussions/${discussion.id}?isLiked=${isLikedButton}&userId=${user.id}`;



    useEffect(() => {
        if(discussion.likesIds?.includes(user.id)){
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


    const postLikes = () => {
        axios.post(likeUrl, null, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }})
            .then((response) => {
                console.log("response", response.data);
            }).catch((error) => {
            console.error("Error adding like:", error);
        });
    }

    const handleLike = () => {
        setIsLikedButton(!isLikedButton)
    }


    return (

        <Card sx={{
            width: "100%",
            border: "1 grey solid",
            boxShadow: "1.5px 1.5px 3px rgba(0,0,0,0.5)",

        }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/communities/thread/${discussion.id}`)
                    // window.location.href = `/contract/edit?contractId=${contractId}&color=${encodeURIComponent(color)}&default=${true}`;
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                            {discussion.username?.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={discussion.username}
                    subheader={new Date(discussion.createdAt).toLocaleDateString()}
                />
                {/*{discussion.imageUrl && (*/}
                {/*    <CardMedia*/}
                {/*        component="img"*/}
                {/*        height="150"*/}
                {/*        image={discussion.imageUrl}*/}
                {/*        alt="User post"*/}
                {/*    />*/}
                {/*)}*/}
            {/*{discussion.topic && (*/}
                <CardContent sx={{
                    display: "flex", alignItems: "center", justifyContent: !discussion.imageUrl ? "center" : "unset",
                    height: "100px",
                    mt: 0, mb: 0, pt: discussion.imageUrl ? 0 : 3
                }}>
                    <Typography variant={"h6"} color="black"
                                sx={{color: "black"}}
                    >
                        {discussion.topic}
                    </Typography>
                </CardContent>
            {/*)}*/}
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
                        {discussion.likesIds?.length}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap:0.5}}>
                        <GroupsTwoToneIcon fontSize="large" sx={{color:"grey"}} />
                    <Typography variant="body2" component="div">
                        {discussion.count?.length}
                    </Typography>
                </Box>

            </CardActions>

            <Divider/>
        </Card>

    );
};

export default Thread;
