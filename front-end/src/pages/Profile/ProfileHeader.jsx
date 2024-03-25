import {useState} from 'react';
import {Box, Avatar, Typography, Button, Stack, Paper, Divider} from '@mui/material';
import { Edit as EditIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import CreatePost from "../Posts/CreatePost.jsx";
import SimpleTab from "../../components/SimpleTab.jsx";

const ProfileHeader = ({setNewPost, setTabValue, setOpenEditModal}) => {


    const tabs = ["Timeline", "Friends", "Community"];


    const handleTabChange = (newValue) => {
      setTabValue(newValue);
    }



    const userProfile = {
        name: "Jane Doe",
        bio: "4th Engineering Student",
        avatar: "https://via.placeholder.com/150", // Placeholder image URL
        community: 834,
        friends: 50,
        posts: 123,
    };

    return (
        <Paper sx={{ display: 'flex', alignItems: 'center', padding: 2, mb: 1, pb:0, width: "100%", borderRadius: "12px",
            flexDirection: 'column' }}>
            <Box sx={{display: 'flex', flexDirection:"row", alignItems:"center"}}>
                <Avatar
                    alt={userProfile.name}
                    src={userProfile.avatar}
                    sx={{ width: 150, height: 150, mx: 2 }}
                />
                <Box sx={{ flex: 1, textAlign: ['center', 'left'] }}>
                    <Typography variant="h5">
                        {userProfile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userProfile.bio}
                    </Typography>
                    <Button onClick={() => setOpenEditModal(true)} startIcon={<EditIcon />}
                        variant="text" sx={{textTransform: 'none',
                        p:0,
                        color: 'primary',  textDecoration:
                            'underline'}}>
                            Edit Profile
                    </Button>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: ['center', 'start'], gap: 4, pb: 2 }}>
                        <Typography variant="body2">
                            <b>{userProfile.posts}</b> Posts
                        </Typography>
                        <Typography variant="body2">
                            <b>{userProfile.friends}</b> Friends
                        </Typography>
                        <Typography variant="body2">
                            <b>{userProfile.community}</b> Community
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems:"center", justifyContent:"center", width:"80%",
                m:2, mb:0,pb:0,
                mt:2}}>
            <SimpleTab
                tabs={tabs}
                handleTabChange={handleTabChange}
            />
            </Box>
            {/*<Box>*/}
            {/*    <CreatePost*/}
            {/*        selectedImage={selectedImage}*/}
            {/*        setSelectedImage={setSelectedImage}*/}
            {/*        setNewPost={setNewPost}*/}
            {/*    />*/}

            {/*</Box>*/}
        </Paper>
    );
};

export default ProfileHeader;
