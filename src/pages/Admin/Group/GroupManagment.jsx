import {useContext, useEffect, useState} from "react";
import {useSelection} from "../../../hooks/UseSelection.jsx";
import {Box, Card, darken, IconButton, Stack, SvgIcon, Tab, Typography} from "@mui/material";
import {SearchBar} from "../../../components/Input/SearchBar.jsx";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon.js";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon.js";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {useLocation, useNavigate} from "react-router-dom";
import {UserPlusIcon} from "lucide-react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";
import useImageUpload from "../../../hooks/useImageUpload.jsx";
import UserTables from "../User/UserTables.jsx";
import GroupTable from "./GroupTable.jsx";
import EditGroupProfileModal from "../../../components/EditGroupProfileModal.jsx";
import {UserGroupIcon} from "@heroicons/react/20/solid/index.js";
import AddBoxIcon from '@mui/icons-material/AddBox';


const GroupManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [openModal, setOpenModal] = useState(false);
    const {jwtToken, user, university, API_GATEWAY} = useContext(UserContext);
    const tab = queryParams.get("tab");
    const [value, setValue] = useState(tab || "approved");
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [groupIds, setGroupIds] = useState([]);
    const [title, setTitle] = useState("Add User");
    const [userSaved, setUserSaved] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const groupUrl = `${API_GATEWAY}/api/group-service/university/${university.id}/groups`;


    const {
        saveToDatabase, initUpload, newDataSaved, initUploadDone,setNewDataSaved
    } = useImageUpload(jwtToken, university, groupUrl);

    const groupSelection = useSelection(groupIds);

    useEffect(() => {
        if(tab){
            setValue(tab);
        }
    },[tab])


    useEffect(() => {
        if (value || newDataSaved) {
            setGroups([]);
            setSearchTerm('');
            setSelectedGroup(null);
            fetchAllGroups();
        }
    }, [value, newDataSaved]);


    useEffect(() => {
        if (groups.length > 0) {
            setGroupIds(groups.map(user => user.id));
        }
    }, [groups]);


    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            console.log("searching groups");
            searchAllGroups();
        }
    }, [searchTerm]);

    useEffect(() => {
        console.log("Selected group", selectedGroup);
        if (selectedGroup) {
            setOpenModal(true)
            setTitle("Edit User");
        }
    }, [selectedGroup]);


    useEffect(() => {
        if(initUploadDone){
            saveToDatabase();
        }
    }, [initUploadDone]);


    const fetchAllGroups = () => {
        axios.get(groupUrl,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                processGroupsData(response.data);
                setNewDataSaved(false);
            })
            .catch(error => {
                console.error("Failed to fetch groups", error);
                setLoading(false);
                setNewDataSaved(false);
            });
    }


    const processGroupsData = (data) => {
        if(value === "approved"){
            setGroups(data.filter(group => group.approved === true));
            return;
        }
        if(value === "pending"){
            console.log("Pending groups");
            setGroups(data.filter(group => group.approved === false));
            return;
        }
        if(value === "blocked"){
            setGroups(data.filter(group => group.blocked === true));
        }
    }

    const searchAllGroups = () => {
        console.log("Searching groups");
        axios.get(`${API_GATEWAY}/api/group-service/groups/search?query=${searchTerm}&universityId=${university.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to search groups", error);
                setLoading(false);
            });
    }

    const resetList = (value) => {
        if (searchTerm === '' || !value) {
            setGroups([]);
            fetchAllGroups();
        }
    }



    const closeModal = () => {
        groupSelection.handleDeselectAll()
        setSelectedGroup(null);
        setOpenModal(false);
    }



    // const handleDelete = () => {
    //     setGroups(prevUsers => prevUsers.filter(user => !groupSelection.selected.includes(user.id)));
    // }


    const handleDelete = () => {
        axios.post(`${API_GATEWAY}/api/group-service/groups/delete?user-id=${user.id}`,
            groupSelection.selected,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                console.log("Module deleted", response.data);
                setGroups(prevUsers => prevUsers.filter(user => !groupSelection.selected.includes(user.id)));
            })
    }

    const handleEditClicked = () => {
        if (groupSelection.selected.length === 0) {
            return
        }
        const group = groups.find(user => user.id === groupSelection.selected[0]);
        setSelectedGroup(group);
    }

    const handeNewClicked = () => {
        setSelectedGroup(null);
        groupSelection.handleDeselectAll()
        setTitle("New User");
        setOpenModal(true);
    }

    const saveChanges = (group, picData, picFileName) => {
        console.log("Saving changes", group);
        group = {...group,
            type: "FACULTY",
            approved: true,
            approvedDate: new Date()
        }
        const keyName =   `${university.id}/${picFileName}`
        setSelectedGroup(null);
        initUpload(group, picData, keyName);
    }


    const handleTabChange = (event, newValue) => {
        const newPath = tabConfig.find(tab => tab.title === newValue).path;
        if (newPath) {
            navigate(newPath);
        }
    };


    const tabLabels = {
        approved: "Approved",
        pending: "Pending",
        blocked: "Blocked",
    }


    const tabConfig = [
        {
            title: 'approved',
            path: '/admin?page=group-management&tab=approved',
        },
        {
            title: 'pending',
            path: '/admin?page=group-management&tab=pending',
        },
        {
            title: 'blocked',
            path: '/admin?page=group-management&tab=blocked',
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
                        >Group Management
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
                                           placeHolder={`Search ${value} groups by Name`}/>
                            </Box>
                            <Box sx={{mr: 4, display: "flex", gap: 2}}>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    onClick={handeNewClicked}
                                    sx={{bgcolor: "lightgrey"}}>
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        {/*<UserGroupIcon/>*/}
                                        <AddBoxIcon/>
                                    </SvgIcon>
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    onClick={handleEditClicked}
                                    sx={{bgcolor: "lightgrey"}}>
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <PencilSquareIcon/>
                                    </SvgIcon>
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    sx={{bgcolor: "lightgrey"}}
                                    onClick={handleDelete}
                                >
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <TrashIcon />
                                    </SvgIcon>
                                </IconButton>
                            </Box>
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
                <GroupTable
                    value={value}
                    groups={groups}
                    groupSelection={groupSelection}
                    loading={loading}
                />
            </Box>
            <EditGroupProfileModal
                open={openModal} closeModal={closeModal}
                community={selectedGroup}
                saveChanges={saveChanges}

            />
        </Box>
    );
}

export default GroupManagement;