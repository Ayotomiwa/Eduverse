import {
    Button,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Box,
    ListItemSecondaryAction,
    ListItemText,
    ListItem,
    ListItemAvatar,
    Avatar,
    List,
    Modal,
    Dialog,
    DialogContent,
    Typography, CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {SearchBar} from "../../../components/Input/SearchBar.jsx";
import PagesTable from "../../../components/Display/PagesTable.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AddBox} from "@mui/icons-material";
import {ImageIcon} from "lucide-react";
import UserContext from "../../../hooks/UserProvider.jsx";

const AddMembersModal = ({
                             open, handleClose,
                             handleSubmit,

    moderators, members
                         }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const{university} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const {jwtToken, API_GATEWAY} = useContext(UserContext);


    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            fetchUsers();
        }
    }, [searchTerm]);


    const handleAdd = () => {
        handleSubmit(selectedUsers);
        setSelectedUsers([]);
        handleClose();
    }

    const fetchUsers = () => {
        axios.get(`${API_GATEWAY}/api/user-service/users/search?query=${searchTerm}&universityId=${university.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setUsers(response.data);
                setSearchTerm('');
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch users", error);
            });
    }


    const handleSelectUser = (user) => () => {
        if (selectedUsers.every(u => u.id !== user.id)) {
            setSelectedUsers([...selectedUsers, user]);
            setUsers(users.filter(u => u.id !== user.id));
        }
    }

    const handleSelectRemove = (user) => () => {
        setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    }

    const resetList = () => {
        setUsers([]);
    }


    const isModerator = (user) => {
        console.log("Moderators", moderators);
        return moderators?.some(moderator => moderator.userId === user.id);
    }

    const isMember = (user) => {
        console.log("Members", members);
        return members?.some(member => member.userId === user.id);
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
            <Box sx={{display: 'flex', justifyContent:"space-between", p: 1, pb: 0}}>
                <DialogTitle sx={{color: 'secondary.main'}}>Add Members</DialogTitle>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <DialogContent>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box"
                }}>
                    <Box sx={{width: "50%"}}>
                        <SearchBar
                            placeHolder="Search for users"
                            setSearchTerm={setSearchTerm}
                            resetList={resetList}
                        />
                    </Box>
                    <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                        <Box>
                            <Typography variant="subtitle2" sx={{px: 1}}>
                                Search Results
                            </Typography>
                        </Box>
                        {loading ? (
                            <Box sx={{display: "flex", height: "30vh", alignItems: "center", justifyContent: "center"}}>
                                <CircularProgress color="secondary"/>
                            </Box>
                        ) : (
                            <List sx={{
                                border: "0.1px grey solid",
                                height: "30vh",
                                maxHeight: "40vh",
                                boxSizing: "border-box",
                                width: "100%",
                                flex: 1
                            }}>
                                {users.length === 0 && (
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "30vh"
                                    }}>
                                        <Typography variant="body2" color="textSecondary">
                                            No users found
                                        </Typography>
                                    </Box>
                                )}
                                {users.map(user => {
                                    return (
                                        <ListItem key={user.id}
                                                  secondaryAction={
                                                      <Box sx={{
                                                          display: "flex",
                                                          flexDirection: "row",
                                                          justifyContent: "center"
                                                      }}>
                                                          {isModerator(user) || isMember(user) ? (
                                                              <Typography variant="body2" color="error">
                                                                  Member
                                                              </Typography>
                                                          ) : (
                                                              <Button
                                                              onClick={handleSelectUser(user)}
                                                          variant="contained" color="primary" fullWidth>
                                                          ADD
                                                      </Button>
                                                          )}
                                                      </Box>
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
                                                primary={user.username}
                                                secondary={user.email}
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        )}
                    </Box>
                    <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                        <Box>
                            <Typography variant="subtitle2" sx={{m: 1}}>
                                Selected Members to be added
                            </Typography>
                        </Box>
                        <List sx={{
                            border: "0.1px grey solid",
                            minHeight: "20vh",
                            maxHeight: "30vh",
                            boxSizing: "border-box",
                            width: "100%"
                        }}>
                            {selectedUsers.map(user => {
                                return (
                                    <ListItem key={user.id}
                                              secondaryAction={
                                                  <Box sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent: "center"
                                                  }}>
                                                      {(isModerator(user) || isMember(user)) && (
                                                          <Button
                                                              onClick={handleSelectRemove(user)}
                                                              variant="contained" color="error" fullWidth>
                                                              Remove
                                                          </Button>
                                                      )}
                                                  </Box>
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
                                            primary={user.username}
                                            secondary={user.email}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <Button onClick={handleAdd}
                                color="secondary"
                                variant="contained"
                                fullWidth>Add Members(s)</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default AddMembersModal;