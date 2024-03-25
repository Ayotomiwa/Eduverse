import {Box, useMediaQuery, useTheme} from "@mui/material";
import ProfileHeader from "./ProfileHeader.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import Posts from "../Posts/Posts.jsx";
import {useState} from "react";

const Profile = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openEditModal, setOpenEditModal] = useState(false);
    const [newPost, setNewPost] = useState(null);

    const tabConfig={
        0: "Posts",
        2: "Friends",
        3: "Community",
    }

    return (
        <>
        <Box sx={{
            display: "flex",
            m:0,
            alignItems: "center",
            justifyContent: "center",
            position: "sticky",
            zIndex: 1000,
            top: -170,
        }}>
            {/*<Feed setNewPost={setNewPost} posts={posts}/>*/}
            <ProfileHeader setNewPost={setNewPost}  setTabValue={setTabValue}
            setOpenEditModal={setOpenEditModal}
            />
        </Box>
                <Box>
                    <EditProfileModal
                    open={openEditModal}
                    closeModal={() => setOpenEditModal(false)}
                    />
                </Box>
            {tabConfig[tabValue] !== "Community" && (
                <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                 <Posts newPost={newPost}/>
                </Box>
            )}

        </>
    );
}

export default Profile;