import MainCard from "./MainCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import CommunityCard from "./CommunityCard.jsx";
import {Box} from "@mui/material";
import {useContext} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import {UseCheckFeature} from "../../../hooks/UseCheckFeature.jsx";

const LeftSideBar = () => {

    const {user, university} = useContext(UserContext)
    const featureCheck = UseCheckFeature();


    // console.log("UNIVERSITY", university);

    return(
        <Box sx={{display: "flex", flexDirection: "column", height:"100%", gap:2}}>
            <MainCard/>
            {featureCheck.checkUserAccess("MODULE") && (
                    <ModuleCard  maxHeight={featureCheck.checkUserAccess("GROUP")? "19vh" : "60vh"} />
            )}
            {featureCheck.checkUserAccess("GROUP")  && (
                    <CommunityCard maxHeight={featureCheck.checkUserAccess("MODULE")? "19vh" : "60vh"} />
            )}
        </Box>
    )
}

export default LeftSideBar;