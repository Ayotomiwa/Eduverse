import {useEffect, useMemo, useState} from "react";
import {
    Avatar,
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Badge,
    Typography
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import {Favorite} from "@mui/icons-material";
import {styled} from "@mui/material/styles";



const Comments = ({comments, setReplyWhom, setCommentOwnerId}) => {

    const [replyButton, setReplyButton] = useState(false);




    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            color: "grey",
            right: 5,
            top: 13,
            // border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 1px',
        },
    }));

    const [commentReplyConfig, setCommentReplyConfig] = useState(() => {
        const initialConfig = {};
        comments.forEach(comment => {
            initialConfig[comment.id] = false;
        });
        return initialConfig;
    });

    const toggleReplies = (id, open = false) => {
        if(open){
            setCommentReplyConfig(prevConfig => ({
                ...prevConfig,
                [id]: true
            }));
            return;
        }
        setCommentReplyConfig(prevConfig => ({
            ...prevConfig,
            [id]: !prevConfig[id]
        }));
    }

    if(!comments){
        return null;
    }


    const handleReplies = (comment) => {
        toggleReplies(comment.id, true);
        setReplyButton(!replyButton);
        setCommentOwnerId(comment.id);
        setReplyWhom(comment.username);
    }


    return (
        <Box sx={{
            width: '100%',
            maxHeight: 300,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'white',
                borderRadius: '25px',
                outline: '1px solid slategrey'
            }
        }}>
            <List>
                {comments.map((comment, index) => (
                    <Box key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={comment.username} src={comment.profilePicture}
                                        sx={{width: 35, height: 35}}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                        <Typography variant="subtitle2" sx={{fontWeight: 500}}>
                                            {comment.username}
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            height: "20px",
                                            width: "60px",
                                            borderRadius: "25px",
                                            // border: "2px solid #f0f0f0",
                                        }}>
                                            <IconButton
                                                sx={{'& svg': {fontSize: 15}}}>
                                                <Favorite sx={{color: "red"}}/>
                                            </IconButton>
                                            <StyledBadge badgeContent={comment.replies?.length}>
                                                <IconButton
                                                    onClick={() => toggleReplies(comment.id)}
                                                    sx={{'& svg': {fontSize: 15}}}>
                                                    <CommentIcon/>
                                                </IconButton>
                                            </StyledBadge>
                                        </Box>
                                    </Box>
                                }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {comment.comment}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleReplies(comment);
                                            }}
                                            style={{color: "red", fontSize:"12px", fontStyle:"italic", marginLeft:"10px"}}
                                        >
                                            reply
                                        </a>
                                    </Typography>
                                }
                            />
                        </ListItem>

                        {comment.replies?.map((reply, replyIndex) => (
                            <Collapse key={replyIndex} in={commentReplyConfig[comment.id]} timeout="auto" unmountOnExit>
                                <ListItem key={reply.id} sx={{pl: 8}} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={reply.username} src={reply.profilePicture}
                                                sx={{width: 30, height: 30}}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" sx={{fontWeight: 500}}>
                                                {reply.username}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="caption"
                                                color="text.primary"
                                            >
                                                {reply.comment}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Collapse>
                        ))}
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default Comments;
