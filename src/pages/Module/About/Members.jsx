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
    Button, IconButton, SvgIcon, ListItemSecondaryAction
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ImageIcon, PlusSquare} from "lucide-react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";
import {AddBox, AddCircleOutlineRounded} from "@mui/icons-material";
import AddMembersModal from "./AddMembersModal.jsx";


const Members = ({module, setNewMemberAdded}) => {

    const {user, jwtToken} = useContext(UserContext);
    const teachers = module?.teachingTeam;
    const students = module?.students;
    const [memberType, setMemberType] = useState(null)
    const isTeacher = teachers?.some(teacher => teacher?.id !== user.staff?.id);
    const [newMembers, setNewMembers] = useState([]);
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const studentUrl = `http://localhost:8222/api/user-service/modules/${module.id}/student/multiple?userId=${user.id}`;
    const teacherUrl = `http://localhost:8222/api/user-service/modules/${module.id}/staff/multiple?userId=${user.id}`;



    useEffect(() => {
        if(newMembers.length > 0 && memberType){
            addMembers();
        }
    }, [newMembers]);


    const handleSubmit = (selectedUsers) => {
        setNewMembers(selectedUsers.map(user => user.id));
    }

    const addMembers = () => {
        console.log("newMembers", newMembers);
        axios.post(memberType === "TEACHER"? teacherUrl : studentUrl, newMembers,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                setNewMemberAdded(true);
                console.log("response", response.data);
                setNewMembers([]);
                setMemberType(null);

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
                <Box sx={{border:`1px #ddd solid`, m: 2}}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pt: 1}}>
                        <Typography variant="h6">
                            Teaching Team
                        </Typography>
                        {(isTeacher || user.authority === "ADMIN" || user.userType === "STAFF") && (
                            <>
                                <IconButton
                                    onClick={() => {
                                        setMemberType("TEACHER");
                                        setAddMemberModalOpen(true)
                                    }}
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
                                    memberType={memberType}
                                    module={module}
                                />
                            </>
                        )}
                            </Box>
                            <List>
                        {teachers?.map(user => {
                            return (
                            <ListItem key={user.id}
                         secondaryAction={
                             isTeacher && (
                                 <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2}}>
                                     <Button variant="contained" color="error">
                                         Remove
                                     </Button>
                                 </Box>
                             )
                         }
                    >
                            <ListItemAvatar>
                                <Avatar
                                    alt={user.username}
                                    src={user.profilePicture}
                                >
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText
                            component="div"
                            primary={user.username}
                            secondary={
                            <Box>
                                <Typography color="text.secondary" component="div">
                                    Staff No - {user.staff.staffNumber}
                                </Typography>
                                <Typography color="text.secondary" component="div">
                                    {user.email}
                                </Typography>
                            </Box>
                        }
                        />
                    </ListItem>
                    )})}
                </List>
            </Box>
            <Box sx={{border:`1px #ddd solid`, m: 2}}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pt: 1}}>
                    <Typography variant="h6">
                        Students
                    </Typography>
                    {(isTeacher || user.authority === "ADMIN" || user.userType === "STAFF") && (
                        <IconButton
                            onClick={() => {
                                setMemberType("STUDENT");
                                setAddMemberModalOpen(true)
                            }}
                            sx={{color: "success.main"}}>
                            <SvgIcon
                                fontSize="large"
                            >
                                <AddBox/>
                            </SvgIcon>
                        </IconButton>
                    )}
                </Box>
                {students?.length > 0 ? (
                    <List>
                        {students.map(u => {
                            return (
                                <ListItem key={u.id}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={user.username}
                                            src={user.profilePicture}
                                        >
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        component="div"
                                        primary={u.username}
                                                  secondary={
                                                      <Box>
                                                          <Typography color="text.secondary" component="div">
                                                              Student No - {u?.student?.studentNumber}
                                                          </Typography>
                                                          <Typography color="text.secondary" component="div">
                                                              {u.email}
                                                          </Typography>
                                                      </Box>}/>
                                    {(isTeacher || user.authority === "ADMIN" || user.userType === "STAFF") && (
                                        <ListItemSecondaryAction>
                                            <Box sx={{display: "flex", flexDirection: "row", gap:1}}>
                                                <Button variant="contained" color="error">
                                                    Remove
                                                </Button>
                                            </Box>
                                        </ListItemSecondaryAction>
                                    )}
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