import {Avatar, Box, Button, Card, Divider, Paper, Typography} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import SimpleTab from "../../components/SimpleTab.jsx";
import EventsCard from "../Home/RightHomeBar/EventsCard.jsx";
import Posts from "../Posts/Posts.jsx";
import Threads from "./Threads/Threads.jsx";

const ProfileHeader = ({setNewPost, setTabValue, setOpenEditModal}) => {


    const tabs = ["Threads", "Members", "Events"];


    const handleTabChange = (newValue) => {
        // setTabValue(newValue);
    }


    const community = {
        name: "Jane Doe",
        bio: "4th Engineering Student",
        avatar: "https://via.placeholder.com/150",
        background: "https://via.placeholder.com/150",
        members: 50,
        posts: 123,
    };

    return (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Box sx={{width:"80%"}}>
                <Card sx={{
                    display: 'flex',
                    alignItems: 'center', mt: 0, p:2, mb:3, pb:1, borderRadius: "0 0 12px 12px",
                    border:"1px solid grey",
                    flexDirection: 'column',
                    position: "sticky",
                    zIndex: 1000,
                    top: -170,
                }}>
                    <Box sx={{display: 'flex', flexDirection: "row", alignItems: "center", width:"100%"}}>
                        <Avatar
                            alt={community.name}
                            src={community.avatar}
                            sx={{width: 150, height: 150, mx: 2}}
                        />
                        <Box sx={{flex: 1, textAlign: 'left'}}>
                            <Typography variant="h5">
                                {community.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {community.bio}
                            </Typography>
                            <Button onClick={() => setOpenEditModal(true)} startIcon={<EditIcon/>}
                                    variant="text" sx={{
                                textTransform: 'none',
                                p: 0,
                                color: 'primary', textDecoration:
                                    'underline'
                            }}>
                                Edit Profile
                            </Button>
                            <Divider sx={{my: 1, width:"70%"}}/>
                            <Box sx={{display: 'flex', justifyContent: 'start', gap: 4, pb: 2}}>
                                <Typography variant="body2">
                                    <b>{community.posts}</b> Posts
                                </Typography>
                                <Typography variant="body2">
                                    <b>{community.friends}</b> Members
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"flex-end", justifyContent:"center", width:"20%", height:"100px"}}>
                            <Button  fullWidth variant="contained" color="secondary">
                                Join
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex', alignItems: "center", justifyContent: "center", width: "80%",
                        m: 2, mb: 0, pb: 0,
                        mt: 2
                    }}>
                        <SimpleTab
                            tabs={tabs}
                            handleTabChange={handleTabChange}
                        />
                    </Box>

                </Card>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Threads/>
                </Box>
            </Box>
            <Box sx={{width:"30%", mt:"100px", position:"sticky", top:20, height:"80vh", mx:3}}>
                <EventsCard
                 open={true}
                 maxHeight={"80vh"}
                />
            </Box>
        </Box>
    );
};

export default ProfileHeader;