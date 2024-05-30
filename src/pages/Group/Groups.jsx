import {
    AppBar,
    Box, CircularProgress, lighten,
    Typography, useTheme
} from "@mui/material";
import GroupCard from "./GroupCard.jsx";
import GroupsTopBar from "./GroupsTopBar.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../hooks/UserProvider.jsx";
import axios from "axios";


const Groups = () => {
    const [groups, setGroups] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const {user, university, jwtToken, API_GATEWAY} = useContext(UserContext);
    const theme = useTheme();


    useEffect(() => {
        setGroups(null);
        setSearchTerm('');
        if (tabValue === 0) {
            fetchMyGroups();
        } else {
            fetchAllGroups();
        }

    }, [tabValue]);


    useEffect(() => {
        if (groups) {
            setLoading(false);
            return;
        }
        setLoading(true);
    }, [groups]);


    useEffect(() => {
        if (searchTerm === '') {
            return
        }
        if (tabValue === 0) {
            searchMyGroups();
            return;
        }
        searchAllGroups();

    }, [searchTerm]);

    const fetchAllGroups = () => {
        axios.get(`${API_GATEWAY}/api/group-service/university/${university.id}/groups`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch groups", error);
                setLoading(false);
            });
    }


    const fetchMyGroups = () => {
        axios.get(`http://localhost:8222/api/group-service/users/${user.id}/groups`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(res => {
                setGroups(res.data)
                setLoading(false);
            }).catch(error => {
            setLoading(false);
            console.log(error);
        });
    }


    const searchAllGroups = () => {
        axios.get(`http://localhost:8222/api/group-service/groups/search?query=${searchTerm}&universityId=${university.id}`,
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

    const searchMyGroups = () => {
        axios.get(`http://localhost:8222/api/group-service/groups/search?query=${searchTerm}&userId=${user.id}`,
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
            setGroups(null);
            if (tabValue === 0) {
                fetchMyGroups();
                return
            }
            fetchAllGroups();
        }
    }



    return (
        <Box sx={{minHeight: "100vh", p: 0}}>
            <Box
                sx={{
                    p: 2,
                    position: "sticky",
                    top: 0,
                    backgroundColor: lighten(theme.palette.primary.main, 0.7),
                    zIndex: 2000
                }}
            >
                <GroupsTopBar
                    setTabValue={setTabValue}
                    setSearchTerm={setSearchTerm}
                    resetList={resetList}
                />
            </Box>
            {loading ? (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <CircularProgress/>
                </Box>
            ) : (
                groups?.length === 0 || !groups ? (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh"}}>
                        <Typography variant="h5" color="secondary">
                            No groups found
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{
                        mt: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 4,
                    }}>
                        {groups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={group}
                            />
                        ))}
                    </Box>
                )
            )}
        </Box>
    );
};

export default Groups;