import {
    Card,
    CardContent,
    ListItem,
    ListItemText,
    List,
    Typography,
    Box,
    Avatar,
    ListItemAvatar,
    Button, IconButton, SvgIcon
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ImageIcon, PlusSquare} from "lucide-react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";
import {AddBox, AddCircleOutlineRounded} from "@mui/icons-material";
import AddMembersModal from "./AddMembersModal.jsx";


const Members = ({community}) => {

    const {user} = useContext(UserContext);
    const [members, setMembers] = useState([])
    const [moderators, setModerators] = useState([])
    const [isModerator, setIsModerator] = useState(false)
    const [newMembers, setNewMembers] = useState([]);
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);



    useEffect(() => {
        if (moderators.length > 0 && !isModerator) {
            setIsModerator(moderators.some(moderator => moderator.id !== user.id));
        }
    }, [moderators]);


    useEffect(() => {
        axios.get(`http://localhost:8222/api/group-service/groups/${community.id}/members?isAccepted=true`)
            .then((response) => {
                // console.log("members", response.data);
                setModerators(response.data.filter(member => member.role === "MODERATOR"));
                setMembers(response.data.filter(member => member.role === "MEMBER"));
            }).catch((error) => {
            console.error("Error fetching members:", error);
        });
    }, [community]);


    useEffect(() => {
        if(newMembers.length > 0){
            addMembers();
        }
    }, [newMembers]);

    const handleSubmit = (selectedUsers) => {
        setNewMembers(selectedUsers.map(user =>{
            return {
                userId: user.id,
                username: user.username,
                profilePicUrl: user.profilePicUrl,
                groupId: community.id,
            }
        }));
    }


    const addMembers = () => {
        console.log("newMembers", newMembers);
        axios.post(`http://localhost:8222/api/group-service/groups/${community.id}/members/multiple`, newMembers)
            .then(response => {
                console.log("response", response.data);
            })
            .catch(error => {
                console.error("Failed to add members", error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }



    return (
        <Card sx={{borderRadius: "12px"}}>
            <CardContent sx={{borderRadius: "12px", mt: 1}}>
                <Box sx={{border: "0.1px grey solid", m: 2}}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pt: 1}}>
                        <Typography variant="h6">
                            Moderators
                        </Typography>
                        {isModerator && (
                            <>
                                <IconButton
                                    onClick={() => setAddMemberModalOpen(true)}
                                    sx={{color: "success.main"}}>
                                    <SvgIcon
                                        fontSize="large"
                                    >
                                        <AddBox/>
                                    </SvgIcon>
                                </IconButton>
                                <AddMembersModal
                                    open={addMemberModalOpen}
                                    handleClose={() => setAddMemberModalOpen(false)}
                                    handleSubmit={handleSubmit}
                                    // member={member}
                                    // setMember={setMember}
                                    community={community}
                                />
                            </>
                        )}
                            </Box>
                            <List>
                        {moderators.map(moderator => {
                            return (
                            <ListItem key={moderator.id}
                         secondaryAction={
                             isModerator && (
                                 <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2}}>
                                     <Button variant="contained" color="error">
                                         Remove
                                     </Button>
                                     <Button variant="outlined" color="error">
                                         Demote
                                     </Button>
                                 </Box>
                             )
                         }
                    >
                        <ListItemAvatar>
                            <Avatar variant="square" sx={{
                                bgcolor: 'secondary.main',
                                width: 24,
                                height: 24
                            }}>{moderator.username?.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={moderator.username}
                            secondary={`Joined - ${new Date(moderator.joinedDate).toLocaleDateString('en-GB')}`}
                        />
                    </ListItem>
                    )})}
                </List>
            </Box>
            <Box sx={{border: "0.1px grey solid", m: 2}}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pt: 1}}>
                    <Typography variant="h6">
                        Members
                    </Typography>
                    {isModerator && (
                        <IconButton
                            onClick={() => setAddMemberModalOpen(true)}
                            sx={{color: "success.main"}}>
                            <SvgIcon
                                fontSize="large"
                            >
                                <AddBox/>
                            </SvgIcon>
                        </IconButton>
                    )}
                </Box>
                {members.length > 0 ? (
                    <List>
                        {members.map(members => {
                            return (
                                <ListItem key={members.id}
                                          secondaryAction={
                                              <Box sx={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  gap:1
                                              }}>
                                                  <Button variant="contained" color="error">
                                                      Remove
                                                  </Button>
                                                  <Button variant="outlined" color="secondary">
                                                      Make Moderator
                                                  </Button>
                                              </Box>
                                          }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={members.username}
                                                  secondary={new Date(members.joinedDate).toDateString()}/>
                                </ListItem>
                            )
                        })}
                    </List>
                ) : (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh"}}>
                        <Typography variant="h6">
                            No members found
                        </Typography>
                    </Box>
                )}
            </Box>
        </CardContent>
</Card>
)
}

export default Members;