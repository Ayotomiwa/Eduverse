import {useContext, useEffect} from "react";
import UserContext from "./UserProvider";
import { Navigate } from "react-router-dom";

const BusinessContent = ({ children }) => {
    const {university} = useContext(UserContext);


            if(university && university.featureFlags.BUSINESS){
                return children;
            }
            else{
                // window.location.pathname = "/";
                return null;
            }

        // ...
};

export default BusinessContent;