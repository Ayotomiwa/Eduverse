import MainCard from "./MainCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import CommunityCard from "./CommunityCard.jsx";
import {Box} from "@mui/material";
import {useContext} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";

const LeftSideBar = () => {

    const {user, university} = useContext(UserContext)



    return(
        <Box sx={{display: "flex", flexDirection: "column", height:"100%", gap:2}}>
            <MainCard/>
            {university.featureFlags.MODULE && (
                    <ModuleCard  maxHeight={university.featureFlags.GROUP? "19vh" : "60vh"} />
            )}
            {university.featureFlags.GROUP && (
                    <CommunityCard maxHeight={university.featureFlags.MODULE? "19vh" : "60vh"} />
            )}
        </Box>
    )
}

export default LeftSideBar;