import {
    AppBar,
    Box, CircularProgress, lighten,
    Typography
} from "@mui/material";
import GroupCard from "./GroupCard.jsx";
import GroupPageTopBar from "./GroupPageTopBar.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../hooks/UserProvider.jsx";
import axios from "axios";


const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const {user, university} = useContext(UserContext);


    useEffect(() => {
        setGroups([]);
        setLoading(true);
        setSearchTerm('');
        if(tabValue === 0){
            fetchMyGroups();
        }
        else{
            fetchAllGroups();
        }

    },[tabValue]);



    useEffect(() => {
        if(searchTerm !== ''){
            if(tabValue === 0){
                searchMyGroups();
            }
            else{
                searchAllGroups();
            }
        }
    }, [searchTerm]);

    const fetchAllGroups = ()=> {
        axios.get(`http://localhost:8222/api/group-service/university/${university.university.id}/groups`)
            .then(response => {
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch groups", error);
                setLoading(false);
            });
    }


    const fetchMyGroups = () =>{
        axios.get(`http://localhost:8222/api/group-service/user/${user.id}/groups`)
            .then(res => {
                setGroups(res.data)
                setLoading(false);
            }).catch(error => {
                setLoading(false);
            console.log(error);
        });
    }


    const searchAllGroups = () => {
        axios.get(`http://localhost:8222/api/group-service/university/${university.university.id}/groups/search?name=${searchTerm}`)
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
        axios.get(`http://localhost:8222/api/group-service/user/${user.id}/groups/search?name=${searchTerm}`)
            .then(response => {
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to search groups", error);
                setLoading(false);
            });
    }

    const resetList = () => {
        setGroups([]);
    }

    const softColors = [
        '#f8c6d1',
        '#a7c7e7',
        '#a8e6cf',
        '#d1c4e9',
        '#ffccaa',
        '#f6e8b1',
        '#87ceeb',
        '#88d8b0',
        '#f3e5f5',
        '#fffdd0'
    ];





    return (
        <Box sx={{minHeight:"100vh", p:0}}>
            <Box
                sx={{
                   p: 2,
                    position: "sticky",
                    top: 0,
                    backgroundColor: lighten("#c9d1d3", 0.2),
                    zIndex: 2000
                }}
            >
                <GroupPageTopBar
                 setTabValue={setTabValue}
                 setSearchTerm={setSearchTerm}
                 resetList={resetList}
                />
            </Box>
            {loading? (
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                <CircularProgress />
            </Box>
                ) : (
                groups.length === 0 ? (
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