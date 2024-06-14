import {
    Avatar,
    Box,
    Card,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {Announcement, Comment, ExpandLess, ExpandMore, Reply} from "@mui/icons-material";
import {useState} from "react";
import {styled} from "@mui/material/styles";

const NotificationCard = ({open, handleOpen, maxHeight}) => {

    const handleClick = (event) => {
        handleOpen(event);
    };
    const [notifications, setNotifications] = useState([]);

    // const notifications = [
    //     {
    //         user: "Ayotomiwa Omope",
    //         message: "You have a new reply on your post",
    //         time: "2 minutes ago",
    //         type: "reply"
    //     },
    //     {
    //         user: "Dave Oyewole",
    //         message: "You have a new comment on your post",
    //         time: "5 minutes ago",
    //         type: "comment"
    //     },
    //     {
    //         user: "LSBU",
    //         messgage: "New announcement from LSBU",
    //         time: "10 minutes ago",
    //         type: "announcement"
    //     },
    //     {
    //         user: "Ayotomiwa Omope",
    //         message: "You have a new reply on your post",
    //         time: "2 minutes ago",
    //         type: "reply"
    //     },
    //     {
    //         user: "Ayotomiwa Omope",
    //         message: "You have a new reply on your post",
    //         time: "2 minutes ago",
    //         type: "reply"
    //     },
    //     {
    //         user: "Ayotomiwa Omope",
    //         message: "You have a new reply on your post",
    //         time: "2 minutes ago",
    //         type: "reply"
    //     },
    //     {
    //         user: "Ayotomiwa Omope",
    //         message: "You have a new reply on your post",
    //         time: "2 minutes ago",
    //         type: "reply"
    //     },
    //
    // ]


    const NotificationIcon = ({type}) => {
        switch (type) {
            case "reply":
                return <Reply sx={{color: "#1976d2"}}/>;
            case "comment":
                return <Comment sx={{color: "#19874b"}}/>;
            case "announcement":
                return <Announcement sx={{color: "#ffa726"}}/>;
            default:
                return null;
        }
    };

    const CustomListItemButton = styled(ListItemButton)(({theme}) => ({
        padding: theme.spacing(1),
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    return (
        <Card sx={{bgcolor: "white",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            overflow: "hidden"}}>
            <CustomListItemButton id="Notifications"  onClick={handleClick}>
                <Avatar sx={{mr: 1}}>
                    <img width="30" height="30" src="https://img.icons8.com/stickers/100/alarm.png" alt="alarm"/>
                </Avatar>
                <ListItemText primary="Notifications"
                              primaryTypographyProps={{color: "secondary.dark", fontWeight: "bold"}}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </CustomListItemButton>
            <Box sx={{
                overflowY: "auto",
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
                },
                maxHeight: {maxHeight},
            }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{width: '100%'}}>
                        {notifications.map((notification, index) => (
                            <ListItem key={index} divider sx={{display: "flex", alignItems: "center"}}>
                                <ListItemAvatar sx={{p: 1, mr: -3}}>
                                    <NotificationIcon type={notification.type}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.user}
                                    secondary={
                                        <>
                                            <Typography variant="body2" sx={{display: 'inline'}} color="text.primary">
                                                {notification.message} - {notification.time}
                                            </Typography>
                                        </>
                                    }
                                    secondaryTypographyProps={{component: "div"}}
                                />
                            </ListItem>
                        ))}
                        <ListItemButton size="small" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <ListItemText primary="View all notifications"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </Box>
        </Card>
    );
};

export default NotificationCard;