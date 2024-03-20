import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    IconButton,
    CardActions,
    Box,
    Drawer,
    Collapse, Divider, OutlinedInput, Input, InputAdornment
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from "./Comments.jsx";
import {useEffect, useState} from "react";
import {Favorite, MapsUgc, NoteAdd} from "@mui/icons-material";
import {PlusIcon} from "lucide-react";
import CommentInput from "../../components/CommentInput.jsx";


const Post = ({post}) => {

    const [openComments, setOpenComments] = useState(false);
    const [commentOwnerId, setCommentOwnerId] = useState(null);
    const[replyButton, setReplyButton] = useState(false);
    const [replyWhom, setReplyWhom] = useState("");
    const [comments, setComments] = useState(post.comments);




    //
    // useEffect(() => {
    //     if(comments) {
    //         toggleComments();
    //     }
    // },[comments]);
    //
    //
    //


    const toggleComments = () => {
        setOpenComments(!openComments);
    };


    const addComment = (comment) =>{
        setOpenComments(true);
        if(replyWhom){
            console.log("replyWhom", replyWhom);
            setComments(prevComments => {
                const newComments = prevComments.map(newComment => {
                    if(newComment.id === commentOwnerId){
                        if(newComment.replies){
                            newComment.replies.push({
                                username: "Mike Tyson",
                                desc: comment,
                            });
                        }
                        else{
                            newComment.replies = [{
                                username: "Mike Tyson",
                                desc: comment,
                            }];
                        }

                    }
                    return newComment;
                });
                return newComments;
            });
            return;
        }
        const newComment = {
            username: "Mike Tyson",
            desc: comment,
            name: "John Doe",
        }
        if(!comments){
            console.log("no comments");
            setComments([newComment]);
            // toggleComments()
            return;
        }
        console.log("comments", comments);
    setComments([ newComment, ...comments]);

    }



    return (

        <Card sx={{ width:"100%", border:"1 grey solid"}}>
            <CardContent sx={{ display: 'flex', flexDirection:"column", gap: 2}}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1}}>
                    <Avatar variant="square"  sx={{ bgcolor: 'secondary.main', width: 24, height: 24  }}>{post.username?.charAt(0).toUpperCase()}</Avatar>
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
                <Divider />
            )}
            {post.caption && (
            <CardContent sx={{ display:"flex", alignItems:"center",
                maxHeight:"50px",
                mt:0, mb:0, pt:0, pb:0}}>
                <Typography variant={post.imageUrl? "body2": "h6"} color="text.secondary"
                sx={{color: post.imageUrl? "grey": "black" }}
                >
                    {post.caption}
                </Typography>
            </CardContent>
                )}
            <CardActions disableSpacing sx={{display: "flex",
                flexDirection:"row", mt:0, mb:0, pt:0, pb:0}} >
                <Box sx={{display:"flex", alignItems:"center" }}>
                    <IconButton sx={{ '& svg': { fontSize: "20px" } }}>
                        {/*<FavoriteBorderIcon />*/}
                        <Favorite  sx={{color:"red"}}/>
                        {/*<FavoriteBorderOutlinedIcon varia />*/}
                    </IconButton>
                    <Typography variant="body2" component="div">
                        {post.likes}
                    </Typography>
                </Box>
                <Box sx={{display:"flex", alignItems:"center" }}>
                <IconButton
                    onClick={toggleComments}
                    sx={{ '& svg': { fontSize: 20 } }}>
                    <CommentIcon />
                </IconButton>
                <Typography variant="body2" component="div">
                    {post.comments?.length}
                </Typography>
                </Box>

            </CardActions>
            <Divider />
            <Box sx={{m:"10px"}}>
                <CommentInput
                              setReplyWhom={setReplyWhom}
                              username={post.username}
                              handleComment={addComment}
                              replyButton={replyButton}
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
            <Collapse in={openComments} timeout="auto" unmountOnExit>
                        <Comments comments={comments}
                                  replyButton={replyButton}
                                  setReplyWhom={setReplyWhom}
                                  setCommentOwnerId={setCommentOwnerId}
                                      setReplyButton={setReplyButton}
                        />
            </Collapse>
        </Card>

    );
};

export default Post;
