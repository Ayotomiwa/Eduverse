import Posts from "../Posts/Posts.jsx";
import {Box, lighten, useMediaQuery, useTheme, ThemeProvider, darken} from "@mui/material";
import RightSideBar from "./RightHomeBar/RightSideBar.jsx";
import LeftSideBar from "./LeftHomeBar/LeftSideBar.jsx";
import { createTheme } from '@mui/material/styles';
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";



const Home = (props) => {
    const {children} = props;
    const outerTheme = useTheme();
    const location = useLocation();

    const theme = createTheme({
        typography: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        icon: {
            color: outerTheme.palette.primary.light,
        },
    });
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const currentPath = location.pathname;
    const [showRightSideBar, setShowRightSideBar] = useState(false);

    const noneRightSideBarRoutes = ["/communities", "/community"];


    const isNonSidebarRoute = useCallback(() => {
        return noneRightSideBarRoutes.includes(currentPath) || currentPath.startsWith("/community") || currentPath.startsWith("/communities");
    }, [currentPath]);



    useEffect(() => {
        if(!isNonSidebarRoute()) {
            console.log("currentPath", currentPath)
            console.log("noneRightSideBarRoutes", showRightSideBar)
          setShowRightSideBar(true);
        }
        else{
            setShowRightSideBar(false);
        }
    }, [location, currentPath]);



    return (
        <ThemeProvider theme={theme}>
        <Box sx={{
            overFlowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            // backgroundColor:darken ("#e6e6fa", 0.02),
            minHeight: "100vh",
            width:"100%",
            boxSizing: 'border-box',
            backgroundColor: lighten("#c9d1d3", 0.2)
        }}>
            <Box sx={{
                display: "flex", flexDirection: "row", gap:2, justifyContent: "space-evenly", alignItems: "flex-start",
            }}>
                {!isSmallScreen && (
                    <Box sx={{width:showRightSideBar? "23%" : "30%", p:1, position: "sticky", top:20, }}>
                   <LeftSideBar/>
                    </Box>
                )}
                <Box sx={{display: "flex", flexDirection: "column", width: isSmallScreen ? "100%" : showRightSideBar? "50%" : "100%",  boxSizing: 'border-box',
                }}>
                    {children}
                </Box>
                {!isSmallScreen && showRightSideBar && (
                    <Box sx={{width:"23%", p:1, position: "sticky", top:20 }}>
                   <RightSideBar/>
                        </Box>
                )}
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default Home