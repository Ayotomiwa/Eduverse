import {useContext, useEffect, useState} from 'react';
import {Box, Button, Divider, lighten, Paper, SvgIcon, Typography, useMediaQuery, useTheme} from '@mui/material';

import PostUploadModal from "./PostUploadModal.jsx";
import PollCreationModal from "./PollCreationModal.jsx";
import SimpleTab from "../../components/Input/SimpleTab.jsx";
import {PlusIcon} from "lucide-react";
import CreatePost from "./CreatePost.jsx";
import Posts from "./Posts.jsx";
import UserContext from "../../hooks/UserProvider.jsx";
import {UseCheckFeature} from "../../hooks/FeatureChecks/UseCheckFeature.jsx";


const Feed = () => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [newPost, setNewPost] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const {university} = useContext(UserContext)
    const featureCheck = UseCheckFeature();






    const handleLoadMore = () =>{

    }





    const tabs = ["Public", "Following"];

    const tabConfig ={
        0: "Public",
        1: "Following",
    }

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };



    return (
        <>
        <Box
            sx={{
                display: "flex",
                m:0,
                alignItems: "center",
                justifyContent: "center",
                position: "sticky",
                zIndex: 1000,
                top: university?.featureFlags?.CONTENT_POSTING ? -170 : -80
            }}>
        <Paper sx={{
            padding: 2, pt: 0, pb: 0, mb: 1, width: "100%", borderRadius: "0 0 12px 12px",
            bgcolor: "white",
            border:`0.5px ${theme.palette.secondary.main} solid`,
            boxShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}>
            <Box sx={{m: "25px"}}>
                <Typography textAlign="center" variant="h4"
                            sx={{color: "grey"}}>
                    Content Feed
                </Typography>
            </Box>
            <Box>
                <SimpleTab
                    tabs={tabs}
                    handleTabChange={handleTabChange}
                />
            </Box>
            <Divider/>
            {featureCheck.checkUserAccess("CONTENT_POSTING") && (
            <CreatePost
            setNewPost={setNewPost}
            newPost={newPost}
            />)}
        </Paper>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            <Posts
                newPost={newPost}
                selectedTab={tabConfig[tabValue]}
            />
        </Box>

    </>
    );
};

export default Feed;

