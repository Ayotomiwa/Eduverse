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
import {SearchBar} from "../../../components/SearchBar.jsx";
import PagesTable from "../../../components/PagesTable.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {AddBox} from "@mui/icons-material";
import {ImageIcon} from "lucide-react";

const AddMembersModal = ({
                             open, handleClose,
                             handleSubmit,
                             community
                         }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);


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
        axios.get(`http://localhost:8222/api/user-service/users/search?query=${searchTerm}`)
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

    const handleChange = (prop) => (e) => {
        setMember({...member, [prop]: e.target.value});
    }

    const resetList = () => {
        setUsers([]);
    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pb: 0}}>
                <DialogTitle
                    sx={{color: 'secondary.main'}}
                >Add Members</DialogTitle>
                <IconButton
                    onClick={handleClose}
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
            <DialogContent>
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <Box>
                        <SearchBar
                            placeHolder="Search for users"
                            setSearchTerm={setSearchTerm}
                            resetList={resetList}
                        />
                    </Box>
                    <Box sx={{m: 2}}>
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
                                width: "40vw"
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
                                                          justifyContent: "space-between"
                                                      }}>
                                                          {community.moderatorsIds?.includes(user.id) || community.membersIds?.includes(user.id) ? (
                                                              <Button
                                                                  onClick={handleSelectUser(user)}
                                                                  variant="contained" color="primary">
                                                                  ADD
                                                              </Button>
                                                          ) : (
                                                              <Typography variant="body2" color="error">
                                                                  Member
                                                              </Typography>
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
                    <Box sx={{m: 2, mt: 0}}>
                        <Box>
                            <Typography variant="subtitle2" sx={{px: 1}}>
                                Selected Members to be added
                            </Typography>
                        </Box>
                        <List sx={{
                            border: "0.1px grey solid",
                            minHeight: "20vh",
                            maxHeight: "30vh",
                            boxSizing: "border-box",
                            width: "40vw"
                        }}>
                            {selectedUsers.map(user => {
                                return (
                                    <ListItem key={user.id}
                                              secondaryAction={
                                                  <Box sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent: "space-between"
                                                  }}>
                                                      {community.moderatorsIds?.includes(user.id) || community.membersIds?.includes(user.id) && (
                                                          <Button
                                                              onClick={handleSelectRemove(user)}
                                                              variant="contained" color="error">
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
                    <Box>
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