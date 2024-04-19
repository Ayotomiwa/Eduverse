import {useState} from 'react';
import {Box, Avatar, Typography, Button, Stack, Paper, Divider, Card} from '@mui/material';
import { Edit as EditIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import CreatePost from "../Posts/CreatePost.jsx";
import SimpleTab from "../../components/Input/SimpleTab.jsx";
import EditGroupProfileModal from "../../components/EditGroupProfileModal.jsx";

const ProfileHeader = ({
                           setTabValue,
    setOpenEditModal,
    setProfile,
    profile,
    postNo

}) => {


    const tabs = ["Timeline", "Friends", "Community"];
    const[editModalOpen, setEditModalOpen] = useState(false)


    const handleTabChange = (newValue) => {
      setTabValue(newValue);
    }


    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }



    return (
        <Box sx={{width:"100%", boxSizing:"border-box"}}>
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            pb: 1,
            flexDirection: 'column',
            borderRadius: "0 0 12px 12px",
            boxSizing:"border-box"
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: "100%",
                boxSizing:"border-box"
            }}>
                <Box sx={{ position: 'relative', height: "20vh", overflow: "hidden", boxSizing:"border-box"}}>
                    <img src={"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"} style={{ width: "100%", position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
                    <Box sx={{ position: 'absolute', top: 0, right: 10, p: 2 }}>
                        <Button variant="contained" color="secondary" size="large">
                            Follow
                        </Button>
                    </Box>
                    <Box sx={{position: 'absolute', top: "40%", right: "0%", p: 2}}>
                        <Typography variant="h5" color="white">
                            <b></b> {postNo} Posts
                        </Typography>
                        <Typography variant="h5" color="white">
                            <b></b>00 Members
                        </Typography>
                    </Box>
                </Box>
                <Avatar
                    src={profile.profilePicUrl}
                        sx={{
                    width: "20%",
                    height: "44%",
                    position: 'absolute',
                    top: "22%",
                    left: "38%",
                    border: '5px solid white',
                }}/>
                <Box sx={{ px: 2, pb: 0 }}>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                        <Box sx={{display:"flex", flexDirection:"row", p:1, border:"1px red solid"}}>
                            <Box sx={{width:"40%", wordWrap: "break-word",  boxSizing:"border-box"}}>
                                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                    {capitalizeFirstLetter(profile.firstName)} {capitalizeFirstLetter(profile.lastName)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {profile.bio}
                                </Typography>
                            </Box>
                            <Button

                                onClick={() => setOpenEditModal(true)}
                                startIcon={<EditIcon />} variant="text" sx={{
                                ml: 'auto',
                                textTransform: 'none',
                                p: 0,
                                color: 'primary',
                                textDecoration: 'underline',
                            }}>
                                Edit Profile
                            </Button>
                            <EditGroupProfileModal
                                // open={editModalOpen} closeModal={() => setEditModalOpen(false)}
                                // community={profile}
                                // setCommunity={setProfile}
                            />
                        </Box>
                        <Box sx={{mt: 1, px: 1 }}>
                            <Box sx={{ display: 'flex', alignItems:"center", justifyContent:"center",
                                m:2, mb:0,pb:0,
                                mt:2}}>
                                <SimpleTab
                                    tabs={tabs}
                                    handleTabChange={handleTabChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
        </Box>
    );
};

export default ProfileHeader;
