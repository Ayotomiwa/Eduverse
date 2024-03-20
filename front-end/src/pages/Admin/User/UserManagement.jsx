import {useEffect, useState} from "react";
import {useSelection} from "../../../hooks/UseSelection.jsx";
import {Box, Card, darken, IconButton, Stack, SvgIcon, Tab, Typography} from "@mui/material";
import {SearchBar} from "../../../components/SearchBar.jsx";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon.js";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import UserDetails from "./UserDetails.jsx";
import ImportUsers from "./ImportUsers.jsx";
import UserTables from "./UserTables.jsx";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon.js";
import {useLocation, useNavigate} from "react-router-dom";



const UserManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const tab = queryParams.get("tab");
    const [value, setValue] = useState( tab ||"staffusers");
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [userIds, setUserIds] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if(tab){
            setValue(tab);
        }
    }, [tab]);



    const tabLabels={
        staffusers: "Staff Users",
        studentusers: "Student Users",
        adduser: "Add User",
        importusers: "Import Users"
    }


    const tabConfig =[
        {
            title: 'staffusers',
            path: '/admin?page=user-management&tab=staffusers',
        },
        {
            title: 'studentusers',
            path: '/admin?page=user-management&tab=studentusers',
        },
        {
            title: 'adduser',
            path: '/admin?page=user-management&tab=adduser',
        },
        {
            title: 'importusers',
            path: '/admin?page=user-management&tab=importusers',
        },

    ]



    // const userIds = useMemo(() => users.map(user => user.id), [users]);
    const userSelection = useSelection(userIds);



    const handleDelete = () => {
        setUsers(prevUsers => prevUsers.filter(user => !userSelection.selected.includes(user.id)));
    }



    const resetUserList = () => {

    };






// ...


    const handleTabChange = (event, newValue) => {
        const newPath = tabConfig.find(tab => tab.title=== newValue).path;
        if (newPath) {
            navigate(newPath);
        }
    };


    return (
        <Box sx={{display: "grid", placeItems: "center", width: "100%"}}>
            <Box sx={{display: "flex", width: "100%", mb: "20px"}}>
                <Card elevation={18} sx={{width: "100%", flex: 1, borderRadius: 2, bgcolor:"white",  }}>
                    <Box sx={{m: "20px", mb: "0px"}}>
                        <Typography variant="h6" sx={{
                            alignItems: "center",
                            fontWeight:"bold",
                            color: darken("#a7c7e7", 0.5)
                        }}
                        >User Management
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="start"
                               spacing={7}
                               sx={{padding: "15px"}}
                        >
                            <SearchBar setSearchTerm={setSearchTerm} resetList={resetUserList}
                                       placeHolder="Search UserTables by Name/Email "/>

                            <Box>
                                <IconButton>
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <PencilSquareIcon color={darken("#9c27b0", 0.3)}/>
                                    </SvgIcon>
                                </IconButton>
                                <IconButton
                                onClick={handleDelete}
                                >
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <TrashIcon color={darken("#9c27b0", 0.3)}/>
                                    </SvgIcon>
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{width: '100%', }}>
                        <TabContext value={value}>
                            <Box sx={{fontWeight:"bold"}}>
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

            <Box sx={{"width": "100%", minHeight:"50vh"}}>
            {value === "staffusers" || value === "studentusers" ? (
                    <UserTables
                        value={value}
                        setValue={setValue}
                        users={users}
                        setUsers={setUsers}
                        userSelection={userSelection}
                        setUserIds={setUserIds}
                    />
                ) : (value === "adduser"?
                        (
                    <Box>
                        <UserDetails/>
                    </Box>
                        ): (
                          <ImportUsers
                              users={users}
                              userSelection={userSelection}
                              setUsers={setUsers}
                              setUserIds={setUserIds}
                          />
                        )
                )
            }
            </Box>
        </Box>
    );
}

export default UserManagement;