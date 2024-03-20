import Feed from "../Posts/Feed.jsx";
import {Box, lighten, useMediaQuery, useTheme} from "@mui/material";
import MainCard from "./MainCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import CommunityCard from "./CommunityCard.jsx";
import SearchCard from "./SearchCard.jsx";


const Home = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overFlowX: "hidden",
            width: "100%",
            // backgroundColor:darken ("#e6e6fa", 0.02)
            backgroundColor: lighten("#c9d1d3", 0.5)
        }}>
            <Box sx={{
                mt: 0, width: "100%", border: "2px black solid",
                display: "flex", flexDirection: "row"
            }}>
                {/*<Nav />*/}
                {!isSmallScreen && (
                    <Box sx={{display: "flex", flexDirection: "column",
                        position: "sticky", top:10, m:"20px", height:"100%",
                        width: "23%", gap:2}}>
                            <MainCard/>
                            <ModuleCard/>
                            <CommunityCard/>
                    </Box>
                )}
                <Box sx={{display: "flex", flexDirection: "column", width: !isSmallScreen ? "50%" : "100%"}}>
                    <Feed/>
                </Box>
                {!isSmallScreen && (
                    <Box sx={{m: "20px", width: "25%"}}>
                        <SearchCard />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Home