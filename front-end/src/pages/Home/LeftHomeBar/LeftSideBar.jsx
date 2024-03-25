import MainCard from "./MainCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import CommunityCard from "./CommunityCard.jsx";
import {Box} from "@mui/material";

const LeftSideBar = () => {


    return(
        <Box sx={{display: "flex", flexDirection: "column",
            position: "sticky", top:20, m:"20px", height:"100%", mt:2,
            width: "23%", gap:2}}>
            <MainCard/>
            <ModuleCard/>
            <CommunityCard/>
        </Box>
    )
}

export default LeftSideBar;