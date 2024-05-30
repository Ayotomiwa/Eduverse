import MainCard from "./MainCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import CommunityCard from "./CommunityCard.jsx";
import {Box} from "@mui/material";
import {UseCheckFeature} from "../../../hooks/FeatureChecks/UseCheckFeature.jsx";

const LeftSideBar = () => {

    const featureCheck = UseCheckFeature();

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