import UserContext from "./UserProvider.jsx";
import {useContext} from "react";


export const UseCheckFeature = () => {
    const { university } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const universityFeatures = university.universityFeatures;


    const majorFeatures =["CONTENT_FEED", "MODULE", "GROUP"]

    const accessLevel = {
        ADMIN: 3,
        ELEVATED: 2,
        STANDARD: 1
    }

    const checkUserAccess = (featureName) => {
        // console.log("FEATURE NAME", featureName)
        // console.log("UNIVERSITY FEATURES", universityFeatures)
        const feature = universityFeatures.find((uf) => uf.feature.name === featureName);
        // console.log("FEATURE", feature)
        if (!feature?.enabled) {
            // console.log(featureName, " IS NOT ENABLED")
            return false;
        }
        if (user.authority !== "ADMIN") {
            if (accessLevel[feature.authorizedUsers] > accessLevel[user.authority]) {
                return false;
            }
            if (feature.authorizedMembers !== "ALL" && user.userType !== feature.authorizedMembers) {
                return false;
            }
        }
        // console.log(featureName, " ALLOWED")
        return true;
    }

    const getValidMajorFeatureRoute = () =>{
        const allowedFeature= majorFeatures.find((feature) => checkUserAccess(feature));
        console.log("ALLOWED FEATURE", allowedFeature)
       return allowedFeature;
    }



    return {
        checkUserAccess,
        getValidMajorFeatureRoute
    };

};