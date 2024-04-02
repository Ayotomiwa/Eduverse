import {useContext} from "react";
import UserContext from "./UserProvider";
import { Navigate } from "react-router-dom";

const FeatureCheckFeed = ({ children }) => {
    const {university} = useContext(UserContext);

    if(university && university.featureFlags.GROUP){
        return children;
    }
    else{
        return <Navigate to="/modules"/>
    }
};

export default FeatureCheckFeed;