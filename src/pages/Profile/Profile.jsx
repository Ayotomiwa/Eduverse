import {Box, useMediaQuery, useTheme} from "@mui/material";
import ProfileHeader from "./ProfileHeader.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import Posts from "../Posts/Posts.jsx";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserContext from "../../hooks/UserProvider.jsx";
import axios from "axios";

const Profile = () => {
    const {id} = useParams();
    const {user, jwtToken} = useContext(UserContext);
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [postNo, setPostNo] = useState(0);
    const [relationship, setRelationship] = useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openEditModal, setOpenEditModal] = useState(false);
    const [processingFollow, setProcessingFollow] = useState(false);
    const [newPost, setNewPost] = useState(null);
    const [profile, setProfile ] = useState(null);

    const tabConfig={
        0: "Posts",
        2: "Friends",
        3: "Community",
    }

    useEffect(() => {
        fetchProfile();
        if(user.id !== id){
            fetchRelationship();
        }
    },[]);


    const fetchProfile = () => {
        axios.get(`http://localhost:8222/api/user-service/users/${id}/profile`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                console.log("PROFILE ", response.data);
                setProfile(response.data);
            }).catch(error => {
                console.error("Failed to fetch profile", error);
            }
        );
    }


    const fetchRelationship = () => {
        axios.get(`http://localhost:8222/api/user-service/relationship?followerId=${user.id}&followingId=${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }).then(response => {
            setRelationship(response.data);
            setProcessingFollow(false);
        }).catch(error => {
            console.error("Failed to fetch relationship", error);
        });
    }


    const handleFollow = (follow) => {
        setProcessingFollow(true);
        axios.get(`http://localhost:8222/api/user-service/relationship/follow?followerId=${user.id}&followId=${id}&follow=${follow}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }).then(response => {
            setRelationship(follow);
                setProfile(prevProfile => {
                    if(follow){
                        return {
                            ...prevProfile,
                            followersCount: prevProfile.followersCount + 1
                        }
                    }
                    return {
                        ...prevProfile,
                        followersCount: prevProfile.followersCount - 1
                    }
                })
            setProcessingFollow(false)
        }).catch(error => {
            console.error("Failed to update relationship", error);
        });
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
            top: -300,
        }}>
            {/*<Feed setNewPost={setNewPost} posts={posts}/>*/}
            <ProfileHeader
                profile={profile}
                setProfile={setProfile}
                setTabValue={setTabValue}
                setOpenEditModal={setOpenEditModal}
                postNo={postNo}
                relationship={relationship}
                setRelationship={setRelationship}
                handleFollow={handleFollow}
                processingFollow={processingFollow}
            />
        </Box>
            {profile && (
                <Box>
                    <EditProfileModal
                    open={openEditModal}
                    closeModal={() => setOpenEditModal(false)}
                    userProfile={profile}
                    />
                </Box>
            )}
            {tabConfig[tabValue] !== "Community" && (
                <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                 <Posts
                     newPost={newPost}
                     profilePostsUrl={`http://localhost:8222/api/post-service/users/${id}/posts`}
                     setPostNo={setPostNo}
                 />
                </Box>
            )}

        </>
    );
}

export default Profile;