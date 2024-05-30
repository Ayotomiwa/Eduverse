import UserContext from "../UserProvider.jsx";
import {useContext} from "react";


export const UseCheckFeature = () => {
    const { university } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const universityFeatures = university.universityFeatures;
    const majorFeatures =["CONTENT_FEED", "MODULE", "GROUP"]

    const accessLevel = { ADMIN: 3, ELEVATED: 2, STANDARD: 1 }
    const checkUserAccess = (featureName) => {
        const feature = universityFeatures.find((uf) => uf.feature.name === featureName);
        if (!feature?.enabled) {
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