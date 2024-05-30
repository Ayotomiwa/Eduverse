import {SearchBar} from "../../../components/Input/SearchBar.jsx";
import {
    Card, CardMedia, Box, Typography, Collapse, ListItemText, Chip,
    Divider,
    ListItem, List, ListItemButton, ListItemAvatar, Avatar, useTheme
} from "@mui/material";
import logo from "../../../assets/lsbu_logo.svg"
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";
import {useNavigate} from "react-router-dom";


const SearchCard = ({search, setSearch}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const{university, jwtToken, API_GATEWAY} = useContext(UserContext);
  const[searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const[groups, setGroups] = useState([]);



    useEffect(() => {
        if(searchTerm === ''){
            setSearch(false);
            return
        }
       searchPlatform();
    }, [searchTerm]);



    const handleGroupClick = (id) => {
        window.location.pathname= `/communities/${id}`
    }

    const handleUserClick = (id) => {
        window.location.pathname= `/profile/${id}`
    }


    const handleModuleClick = (id) => {
        window.location.pathname= `/modules/${id}`
    }

    const searchPlatform = () => {
        console.log("searching platform");
        axios.get(`${API_GATEWAY}/api/search-service/search?query=${searchTerm}&universityId=${university.id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((res) => {
                console.log(res.data);
                setGroups(res.data.filter(item => item.type === "GROUP").map(item => item.search));
                setModules(res.data.filter(item => item.type === "MODULE").map(item => item.search));
                setUsers(res.data.filter(item => item.type === "USER").map(item => item.search));
                setSearch(true);
            }).catch((error) => {
            console.error(error);
        });
    }




      const resetList = (value) => {
          if(searchTerm === '' || !value ){
                setSearch(false);
                setSearchTerm("");
                setGroups([]);
                setModules([]);
                setUsers([]);
          }
      }



    return (
        <Card sx={{
            bgcolor: "white",
            minHeight: "30vh",
            p: 2,
            pt: 4,
            pb: 1,
            borderRadius: "0 0 12px 12px",
            border:`0.5px ${theme.palette.secondary.main} solid`,
            boxShadow: "1px 1px 2px rgba(0,0,0,0.5)",

        }}>
            <Box sx={{m: 2, borderRadius: "12px", backgroundColor:"primary.main", p:2, height:"15vh"}}>
                <CardMedia
                    component="img"
                    width="100%"
                    height="100%"
                    image={university.logoUrl}
                    alt="University Logo"
                />
            </Box>
            <Box sx={{m:"3px", display:"flex", justifyContent:"center"}}>
               <Typography variant="caption" color="black" textAlign="center"
                           fontStyle="italic" sx={{p:0, m:0}}>
                     Powered by Eduverse
                </Typography>
            </Box>
            <Box sx={{pb:1}}>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    resetList={resetList}
                    placeHolder={"Search Eduverse"}/>
            </Box>
            <Collapse in={search}>
                <Box sx={{display:"flex", flexDirection:"column", minHeight:"40vh", maxHeight:"45vh", overflowY:"auto"}}>
                    {users.length === 0 && groups.length === 0 && modules.length === 0 && (
                        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
                        <Typography variant="h6" textAlign="center" color="grey">
                            No results found
                        </Typography>
                        </Box>
                    )}
                {users.length > 0 && (
                <List sx={{width:"100%"}}>
                    {/*<Divider component="li" />*/}
                    <Divider>
                        <Chip label="USERS" size="small" />
                    </Divider>
                    {users.map((user) => (
                        <>
                        <ListItemButton
                            onClick={() => handleUserClick(user.id)}
                            key={user.id}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={user.username}
                                    src={user.profilePicture}
                                >
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={user.email}/>
                        </ListItemButton>
                        <Divider/>
                        </>
                    ))}
                    </List>
                )}

                {groups.length > 0 && (
                <List sx={{width:"100%"}}>
                    <Divider>
                        <Chip label="GROUPS" size="small" />
                    </Divider>
                    {groups.map((group) => (
                        <>
                        <ListItemButton
                            onClick={() => handleGroupClick(group.id)}
                            key={group.id}>
                            <ListItemText primary={group.name} secondary={group.description}/>
                        </ListItemButton>
                        <Divider/>
                        </>
                    ))}
                </List>
                )}
                {modules.length > 0 && (
                <List>
                    <Divider>
                        <Chip label="MODULES" size="small" />
                    </Divider>
                    {modules.map((module) => (
                        <>
                        <ListItemButton
                            onClick={() => handleModuleClick(module.id)}
                            key={module.id}>
                            <ListItemText primary={module.name} secondary={module.description}/>
                        </ListItemButton>
                        <Divider />
                        </>
                    ))}
                </List>
                )}
                </Box>
            </Collapse>
        </Card>
    )
}

export default SearchCard;