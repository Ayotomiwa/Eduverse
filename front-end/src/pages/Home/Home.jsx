import Posts from "../Posts/Posts.jsx";
import {Box, lighten, useMediaQuery, useTheme, ThemeProvider} from "@mui/material";
import RightSideBar from "./RightHomeBar/RightSideBar.jsx";
import LeftSideBar from "./LeftHomeBar/LeftSideBar.jsx";
import { createTheme } from '@mui/material/styles';



const Home = (props) => {
    const {children} = props;
    const outerTheme = useTheme();
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


    return (
        <ThemeProvider theme={theme}>
        <Box sx={{
            overFlowX: "hidden",
            width: "100%",
            // backgroundColor:darken ("#e6e6fa", 0.02)
            backgroundColor: lighten("#c9d1d3", 0.5)
        }}>
            <Box sx={{
               width: "100%",
                display: "flex", flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "flex-start",
            }}>
                {!isSmallScreen && (
                   <LeftSideBar/>
                )}
                <Box sx={{display: "flex", flexDirection: "column", width: !isSmallScreen ? "50%" : "100%"}}>
                    {children}
                </Box>
                {!isSmallScreen && (
                   <RightSideBar/>
                )}
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default Home