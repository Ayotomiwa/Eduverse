import React, {useContext, useEffect, useRef} from "react";
import UserContext from "../../../../hooks/UserProvider.jsx";
import {Box, Divider, TextField, Typography} from "@mui/material";
import ThemeSettings from "./ThemeSettings.jsx";
import UniversityProfile from "./UniversityProfile.jsx";
import useImageUpload from "../../../../hooks/useImageUpload.jsx";






const ProfileSettings = ( )=> {
    const {university, jwtToken, updateUniversityDetails} = useContext(UserContext);
    const postUrl = `http://localhost:8222/api/user-service/university/update`;
    const universityPlaceHolder = useRef({
        ...university,
        name: university?.name || '',
        logoUrl: university?.logoUrl || "",
        contact: university?.contactNo || "",
    });

    const {
        saveToDatabase, initUpload, newDataSaved, initUploadDone, setNewDataSaved
    } = useImageUpload(jwtToken, university, postUrl);



    useEffect(() => {
        if(initUploadDone){
            saveToDatabase();
        }
    }, [initUploadDone]);

    useEffect(() => {
        if(newDataSaved){
            updateUniversityDetails(universityPlaceHolder.current.contactNo, universityPlaceHolder.current.logoUrl);
            setNewDataSaved(false);
        }
    }, [newDataSaved]);

    const saveChanges= (community, picData, fileName) => {
        const keyName =   `${university.id}/${fileName}`
        initUpload(community, picData, keyName);
    }


    return(
        <Box sx={{display:"flex", flexDirection:"column", p:2, gap:3 }}>
            <ThemeSettings
                universityPlaceHolder={universityPlaceHolder}
            />
            <UniversityProfile
             universityPlaceholder={universityPlaceHolder}
             saveChanges={saveChanges}
            />
            <Divider sx={{mt:3}}/>
        </Box>
    )
};

export default ProfileSettings