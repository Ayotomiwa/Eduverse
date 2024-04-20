import Posts from "../Posts/Posts.jsx";
import {Box, lighten, useMediaQuery, useTheme, ThemeProvider, darken} from "@mui/material";
import RightSideBar from "./RightHomeBar/RightSideBar.jsx";
import LeftSideBar from "./LeftHomeBar/LeftSideBar.jsx";
import { createTheme } from '@mui/material/styles';
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";



const Home = (props) => {

    const {children} = props;
    const theme = useTheme();
    const location = useLocation();

    // const theme = createTheme({
    //     typography: {
    //         fontFamily: "'Plus Jakarta Sans', sans-serif",
    //     },
    //     icon: {
    //         color: outerTheme.palette.primary.light,
    //     },
    // });
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const currentPath = location.pathname;
    const [showRightSideBar, setShowRightSideBar] = useState(false);

    const noneRightSideBarRoutes = ["/communities", "/community", "/my-events"];


    const isNonSidebarRoute = useCallback(() => {
        return noneRightSideBarRoutes.includes(currentPath) || currentPath.startsWith("/community") || currentPath.startsWith("/communities") || currentPath.startsWith("/modules");
    }, [currentPath]);



    useEffect(() => {
        if(!isNonSidebarRoute()) {
            // console.log("currentPath", currentPath)
            // console.log("noneRightSideBarRoutes", showRightSideBar)
          setShowRightSideBar(true);
        }
        else{
            setShowRightSideBar(false);
        }
    }, [location, currentPath]);



    return (

        <Box sx={{
            overFlowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            // backgroundColor:darken ("#e6e6fa", 0.02),
            minHeight: "100vh",
            maxWidth: "100%",
            width:"100%",
            boxSizing: 'border-box',
            // backgroundColor: lighten("#c9d1d3", 0.2)
            backgroundColor: lighten(theme.palette.primary.main, 0.7)
        }}>
            <Box sx={{
                display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "flex-start",
            }}>
                {!isSmallScreen && (
                    <Box sx={{width:showRightSideBar? "22%" : "22%", p:2, pt:0 , position: "sticky", top:0, }}>
                   <LeftSideBar/>
                    </Box>
                )}
                <Box sx={{display: "flex", flexDirection: "column", width: isSmallScreen ? "100%" : showRightSideBar? "50%" : "100%",  boxSizing: 'border-box',
                }}>
                    {children}
                </Box>
                {!isSmallScreen && showRightSideBar && (
                    <Box sx={{width:"22%", p:2, pt:0, position: "sticky", top:0 }}>
                   <RightSideBar/>
                        </Box>
                )}
            </Box>
        </Box>
    );
}

export default Home