import {useContext} from "react";
import UserContext from "../UserProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import {UseCheckFeature} from "./UseCheckFeature.jsx";

// eslint-disable-next-line react/prop-types
const FeatureCheckFeed = ({children}) => {

    const featureCheck = UseCheckFeature();
    const paths = { GROUP: "/communities", CONTENT_FEED: "/feed", MODULE: "/module" }

    if (featureCheck.checkUserAccess("CONTENT_FEED")){
        return children;
    } else {
        const feature = Object.keys(paths)
            .find((feature) => featureCheck.getValidMajorFeatureRoute(feature));
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
