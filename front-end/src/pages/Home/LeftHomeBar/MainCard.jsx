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
import SimpleMenu from "../../../components/SimpleMenu.jsx";
import {ExitToApp} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import DocumentPlusIcon from "@heroicons/react/24/solid/DocumentPlusIcon.js";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';



const MainCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const title = "Ayotomiwa Omope";

    const features = {
        "Content Feed": "/home",
        "Communities": "/communities",
        "Events": "/events",
        "Admin": "/admin",
    }


    const options = [
        {
            label: "Profile",
            icon: <Avatar
                sx={{width: 24, height: 24}}
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"/>,
            path: "/profile"
        },
        {label: "Log Out", icon: <ExitToApp/>, path: "/create-post"},
    ];


    const handleNavClick = (label) => {
        if (label === "Admin") {
            window.location.pathname = "/admin";
            return;
        }
        navigate(features[label]);
    }


    const handleMenuClick = (label) => {
        options.forEach(option => {
            if (option.label === label) {
                navigate(option.path);
            }
        });
    }


//implement search service

    return (
        <Card sx={{
            bgcolor: "white",
            maxHeight: "700px",
            p: 2,
            pt: 0,
            pb: 0,
            borderRadius: "12px"
        }}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", m: "20px", mb: 1}}>
                <SimpleMenu
                    options={options}
                    title={title}
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
                        onClick={() => handleNavClick("Content Feed")}>
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/dusk/64/google-news.png"
                                 alt="google-news"/>
                        </Box>
                        <ListItemText primary={
                            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between" }}>
                            <Typography textAlign="left">
                                Content Feed
                            </Typography>
                                <SvgIcon >
                                    <LibraryAddIcon sx={{color:theme.icon.color}}/>
                                </SvgIcon>
                            </Box>
                        }/>
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => handleNavClick("Communities")}
                    >
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                                 alt="groups"/>
                        </Box>
                        <ListItemText primary={
                            <Typography>
                                Communities
                            </Typography>
                        }>
                        </ListItemText>

                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png"
                                 alt="planner"/>
                        </Box>
                        <ListItemText
                            onClick={() => handleNavClick("Events")}
                            primary={
                                <Typography color="secondary">
                                    Events
                                </Typography>
                            }>
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/microsoft-admin.png"
                                 alt="microsoft-admin"/>
                        </Box>
                        <ListItemText
                            onClick={() => handleNavClick("Admin")}
                            primary={
                                <Typography color="secondary">
                                    Admin
                                </Typography>
                            }>
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Box>
        </Card>

    )
}

export default MainCard;