import {
    Avatar,
    Box,
    Card,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    SvgIcon,
    Typography,
    useTheme
} from "@mui/material";
import SimpleMenu from "../../../components/Input/SimpleMenu.jsx";
import {AddHome, AddHomeTwoTone, ExitToApp, HomeMaxTwoTone} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import DocumentPlusIcon from "@heroicons/react/24/solid/DocumentPlusIcon.js";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {useContext} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import {UseCheckFeature} from "../../../hooks/FeatureChecks/UseCheckFeature.jsx";



const MainCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {user, university, logout} = useContext(UserContext)
    const featureCheck = UseCheckFeature();


    const features = {
        "Content Feed": "/home",
        "Communities": "/communities",
        "Events": "/my-events",
        "Admin": "/admin",
    }


    const options = [
        {
            label: "Profile",
            icon: <Avatar
                sx={{width: 24, height: 24}}
                src={user.profileInfo?.profilePicture}/>,
            path: `/profile/${user.id}`
        },
        {label: "Log Out", icon: <ExitToApp/>, path: "/create-post"},
    ];


    const handleNavClick = (label) => {
        if (label === "Admin") {
            window.location.href = "/admin?page=user-management&tab=staff";
            return;
        }
        navigate(features[label]);
    }

    const handleMenuClick = (label) => {
        options.forEach(option => {
            if (option.label === label) {
                if(option.label === "Log Out"){
                    logout();
                    return
                }
                navigate(option.path);
            }
        });
    }


//implement search service

    return (
        <Card sx={{
            bgcolor: "white",
            maxHeight: "38vh",
            p: 2,
            pt: 3,
            pb: 1,
            borderRadius: "0 0 12px 12px",
            border:`0.5px ${theme.palette.secondary.main} solid`,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", m: "20px", mb: 1}}>
                <SimpleMenu
                    options={options}
                    title={user.username}
                    handleClick={handleMenuClick}
                />
            </Box>
            {/*<Box sx={{ }}>*/}
            {/*    <SearchBar placeHolder={"Search Eduverse"}/>*/}
            {/*</Box>*/}
            <Divider/>
            <Box>
                <List>
                    <ListItemButton
                        disabled={!featureCheck.checkUserAccess("CONTENT_FEED")}
                        onClick={() => handleNavClick("Content Feed")}>
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/dusk/64/google-news.png"
                                 alt="google-news"/>
                        </Box>
                        <ListItemText primary={
                            <Box sx={{display:"flex", flexDirection:"row" }}>
                            <Typography textAlign="left">
                                Content Feed
                            </Typography>
                                {featureCheck.checkUserAccess("CONTENT_FEED") ? (
                                <SvgIcon sx={{mr:1, ml:"auto"}}>
                                    <AddHome sx={{color:theme.palette.secondary.dark}}/>
                                </SvgIcon>
                                    ) : (
                                    <Box sx={{mr: 1, ml:"auto"}}>
                                    <img width="30" height="30"
                                     src="https://img.icons8.com/stickers/100/restriction-shield.png"
                                     alt="restriction-shield"/>
                                    </Box>
                                    )}
                            </Box>
                        }/>
                    </ListItemButton>

                    <ListItemButton
                        disabled={!featureCheck.checkUserAccess("GROUP")}
                        onClick={() => handleNavClick("Communities")}
                    >
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                                 alt="groups"/>
                        </Box>
                        <ListItemText primary={
                            <Box sx={{display:"flex", flexDirection:"row"}}>
                            <Typography>
                                Communities
                            </Typography>
                                {!featureCheck.checkUserAccess("GROUP") && (
                                    <Box sx={{mr: 1, ml:"auto"}}>
                                        <img width="30" height="30"
                                             src="https://img.icons8.com/stickers/100/restriction-shield.png"
                                             alt="restriction-shield"/>
                                    </Box>
                                )}
                            </Box>
                        }>
                        </ListItemText>

                    </ListItemButton>
                    <ListItemButton sx={{display:"flex", alignItems:"center"}}
                        disabled={!featureCheck.checkUserAccess("EVENTS")}

                    >
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png"
                                 alt="planner"/>
                        </Box>
                        <ListItemText
                            onClick={() => handleNavClick("Events")}
                            primary={
                                <Box sx={{display:"flex", alignItems:"center", flexDirection:"row" }}>
                                <Typography>
                                    Events
                                </Typography>
                                    {!featureCheck.checkUserAccess("EVENTS") && (
                                        <Box sx={{mr:1,  ml:"auto"}}>
                                            <img width="30" height="30"
                                                 src="https://img.icons8.com/stickers/100/restriction-shield.png"
                                                 alt="restriction-shield"/>
                                        </Box>
                                    )}
                                </Box>
                            }>
                        </ListItemText>
                    </ListItemButton>
                    {user.authority === "ADMIN" && (
                    <ListItemButton sx={{display:"flex", alignItems:"flex-end"}}>
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/microsoft-admin.png"
                                 alt="microsoft-admin"/>
                        </Box>
                        <ListItemText
                            onClick={() => handleNavClick("Admin")}
                            primary={
                                <Typography color="error">
                                    Admin
                                </Typography>
                            }>
                        </ListItemText>
                    </ListItemButton>
                        )}
                </List>
            </Box>
        </Card>

    )
}

export default MainCard;