import {useContext, useEffect, useState} from "react";
import {useSelection} from "../../../hooks/UseSelection.jsx";
import {Box, Card, darken, IconButton, Stack, SvgIcon, Tab, Typography, useTheme} from "@mui/material";
import {SearchBar} from "../../../components/Input/SearchBar.jsx";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon.js";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import UserDetails from "./UserDetails.jsx";
import ImportUsers from "./ImportUsers.jsx";
import UserTables from "./UserTables.jsx";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon.js";
import {useLocation, useNavigate} from "react-router-dom";
import {UserPlusIcon} from "lucide-react";
import EditUserModal from "./EditUserModal.jsx";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";


const UserManagement = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [openModal, setOpenModal] = useState(false);
    const{jwtToken, user, university} = useContext(UserContext);
    const tab = queryParams.get("tab");
    const [value, setValue] = useState(tab || "staff");
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("New Staff");
    const [newUser, setNewUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [userIds, setUserIds] = useState([]);
    const [userSaved, setUserSaved] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = `http://localhost:8222/api/user-service/university/${university.id}/admin/${user.id}`;
    const newUsersUrl = `${baseUrl}/users`;
    const updateUsersUrl = `${baseUrl}/update-user`;


    useEffect(() => {
        if (tab) {
            setValue(tab);
            setUsers([]);
            setSearchTerm('');
            setSelectedUser(null);
        }
    }, [tab]);


    useEffect(() => {
        if(users.length > 0){
            setUserIds(users.map(user => user.id));
        }
    }, [users]);


    useEffect(() => {

        if(!userSaved && users.length > 0){
            return
        }
        if(value === "student"){
            fetchStudentUsers();
        }
        if(value === "staff"){
            fetchStaffUsers()
        }
        if(value === "faculty"){
            fetchFacultyUsers()
        }

    }, [value, userSaved]);


    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            console.log("searching users");
            searchUsers();
        }
    }, [searchTerm]);


    const searchUsers = () => {
        console.log("searching users in UserManagement");
        axios.get(`http://localhost:8222/api/user-service/users/search?query=${searchTerm}&universityId=${university.id}&userType=${value.toUpperCase()}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then(response => {
                processUserData(response.data);
                setSearchTerm('');
                setLoading(false);
            })
            .catch(error => {
                setSearchTerm('');
                setLoading(false);
                console.error("Failed to fetch users", error);
            });
    }


    useEffect(() => {
        if(!openModal) {
            return;
        }
            if (selectedUser) {
                setTitle("Edit " + value?.charAt(0).toUpperCase() + value?.slice(1));
                setOpenModal(true);
                setIsEditing(true);
                return;
            }
            setIsEditing(false);
    }, [selectedUser, openModal]);


    useEffect(() => {
        if (newUser) {
            console.log("DATA: ", newUser);
            postNewUser();
        }
    }, [newUser]);




    const fetchStudentUsers = () => {
        axios.get(`http://localhost:8222/api/user-service/university/${university.id}/admin/${user.id}/users?user-type=STUDENT`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then((response) => {
                processUserData(response.data.content);
                // console.log(response.data.content);
                setLoading(false);
                setUserSaved(false)
            }).catch((error) => {
            console.error("Error fetching users:", error);
            setUserSaved(false)
            setLoading(false);
        });
    }

    const fetchStaffUsers = () => {
        axios.get(`http://localhost:8222/api/user-service/university/${university.id}/admin/${user.id}/users?user-type=STAFF`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then((response) => {
                processUserData(response.data.content);
                // console.log(response.data.content);
                setLoading(false);
                setUserSaved(false)
            }).catch((error) => {
            console.error("Error fetching users:", error);
            setUserSaved(false)
            setLoading(false);
        });
    }


    const fetchFacultyUsers = () => {
        axios.get(`http://localhost:8222/api/user-service/university/${university.id}/admin/${user.id}/users?user-type=FACULTY`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }}).
        then((response) => {
                processUserData(response.data.content);
                setUsers(response.data.content);
                setLoading(false);
                setUserSaved(false)
            }).catch((error) => {
            console.error("Error fetching users:", error);
        });
    }


    const processUserData = (data) => {
        console.log(tab + " Users: ", data);
        const users = data.map((user) => ({
            ...user,
            name: user.firstName + " " + user.lastName
        }));
        setUsers(users);
    }


    const postNewUser = () => {
        axios.post( isEditing? updateUsersUrl : newUsersUrl,
            newUser,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }).then(response => {
            console.log("New User added", response.data);
            setNewUser(null);
            setIsEditing(false);
            setUserSaved(true);
        }).catch(error => {
                console.error("Error adding new user", error);
            }
        );
    }

    const resetList = (searching) => {
        if(searchTerm === '' && !searching ){
            console.log("resetting list");
            setUsers([]);
            if(value === "student"){
                fetchStudentUsers();
            }
            if(value === "staff"){
                fetchStaffUsers()
            }
        }
    }


    const closeModal = () => {
        userSelection.handleDeselectAll()
        setSelectedUser(null);
        setOpenModal(false);
    }

        // const userIds = useMemo(() => users.map(user => user.id), [users]);
        const userSelection = useSelection(userIds);


        const handleDelete = () => {
            setUsers(prevUsers => prevUsers.filter(user => !userSelection.selected.includes(user.id)));
        }


        const handleEditClicked = () => {
            if (userSelection.selected.length === 0) {
                console.log("No user selected");
                return;
            }
            setOpenModal(true);
            setSelectedUser(users.find(user => user.id === userSelection.selected[0]))
            console.log("Selected User: ", selectedUser);
        }

        const handeNewClicked = () => {
            setSelectedUser(null);
            userSelection.handleDeselectAll()
            setTitle("New " + tab.charAt(0).toUpperCase() + tab.slice(1));
            setOpenModal(true);
        }



        const handleTabChange = (event, newValue) => {
            const newPath = tabConfig.find(tab => tab.title === newValue).path;
            if (newPath) {
                navigate(newPath);
            }
        };

    const tabLabels = {
        staff: "Staff",
        student: "Student",
        faculty: "Faculty",
        import: "Import"
    }



    const tabConfig = [
        {
            title: 'staff',
            path: '/admin?page=user-management&tab=staff',
        },
        {
            title: 'student',
            path: '/admin?page=user-management&tab=student',
        },
        {
            title: 'faculty',
            path: '/admin?page=user-management&tab=faculty',
        },

        {
            title: 'import',
            path: '/admin?page=user-management&tab=import',
        },

    ]




    return (
            <Box sx={{display: "grid", placeItems: "center", width: "100%"}}>
                <Box sx={{display: "flex", width: "100%", mb: "20px"}}>
                    <Card elevation={18} sx={{width: "100%", flex: 1, borderRadius: 2, bgcolor: "white",}}>
                        <Box sx={{m: "20px", mb: "0px"}}>
                            <Typography variant="h6" sx={{
                                alignItems: "center",
                                fontWeight: "bold",
                                color: darken("#a7c7e7", 0.5)
                            }}
                            >User Management
                            </Typography>
                        </Box>
                        <Box>
                            <Stack direction="row"
                                   justifyContent="space-between"
                                   alignItems="start"
                                   sx={{padding: "15px"}}
                            >
                                <Box sx={{width: "600px"}}>
                                    <SearchBar setSearchTerm={setSearchTerm} resetList={resetList}
                                               placeHolder="Search UserTables by Name/Email "/>
                                </Box>


                                {value !== "importusers" && (
                                    <Box sx={{mr: 4, display: "flex", gap: 2}}>
                                        <IconButton
                                            color="primary"
                                            variant="contained"
                                            onClick={handeNewClicked}
                                           sx={{bgcolor:"lightgrey"}}
                                        >
                                            <SvgIcon sx={{fontSize: "30px"}}>
                                                <UserPlusIcon />
                                            </SvgIcon>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={handleEditClicked}
                                            sx={{bgcolor:"lightgrey"}}>
                                            <SvgIcon sx={{fontSize: "30px"}}>
                                                <PencilSquareIcon />
                                            </SvgIcon>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            sx={{bgcolor:"lightgrey"}}
                                            onClick={handleDelete}
                                        >
                                            <SvgIcon sx={{fontSize: "30px"}}>
                                                <TrashIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </Box>
                                )}
                            </Stack>
                        </Box>

                        <Box sx={{width: '100%',}}>
                            <TabContext value={value}>
                                <Box sx={{fontWeight: "bold"}}>
                                    <TabList
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        indicatorColor="secondary"
                                        onChange={handleTabChange}>

                                        {tabConfig.map((tab, index) => (
                                            <Tab key={index} label={tabLabels[tab.title]} value={tab.title}/>
                                        ))};

                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                    </Card>
                </Box>

                <Box sx={{"width": "100%", minHeight: "50vh"}}>
                    {value !== "import" ? (
                        <UserTables
                            value={value}
                            setValue={setValue}
                            users={users}
                            setUsers={setUsers}
                            userSelection={userSelection}
                            setUserIds={setUserIds}
                        />
                    ) :  (
                                <ImportUsers
                                    users={users}
                                    userSelection={userSelection}
                                    setUsers={setUsers}
                                    setUserIds={setUserIds}
                                    setNewUser={setNewUser}
                                />

                    )}
                </Box>
                <EditUserModal
                    title={title}
                    open={openModal}
                    closeModal={closeModal}
                    selectedUser={selectedUser}
                    setNewUser={setNewUser}
                    tab={tab}
                />
            </Box>
        );
    }

    export default UserManagement;