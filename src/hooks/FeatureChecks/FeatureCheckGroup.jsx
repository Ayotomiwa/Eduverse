import {useContext} from "react";
import UserContext from "../UserProvider.jsx";
import { Navigate } from "react-router-dom";
import {UseCheckFeature} from "./UseCheckFeature.jsx";
import {Box, Typography} from "@mui/material";

const FeatureCheckFeed = ({ children }) => {
    const featureCheck = UseCheckFeature();

    const paths = {
        GROUP: "/communities",
        CONTENT_FEED: "/feed",
        MODULE: "/module"
    }

    if(featureCheck.checkUserAccess("GROUP")){
        return children;
    }
    else{
        const feature = Object.keys(paths).find((feature) => feature === featureCheck.getValidMajorFeatureRoute(feature));
        console.log("OPEN FEATURE", feature);
        if (feature) {
            return <Navigate to={paths[feature]}/>
        }
    }

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <Typography>
                All FEATURES ARE CURRENTLY DISABLED. CONTACT YOUR ADMINISTRATOR FOR ACCESS.
            </Typography>
        </Box>
    )
};

export default FeatureCheckFeed;