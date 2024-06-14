import React, {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../../../hooks/UserProvider.jsx";
import {Box, Divider, TextField, Typography} from "@mui/material";
import ThemeSettings from "./ThemeSettings.jsx";
import UniversityProfile from "./UniversityProfile.jsx";
import useImageUpload from "../../../../hooks/useImageUpload.jsx";



const ProfileSettings = ()=> {
    const {university, jwtToken, updateUniversityDetails, API_GATEWAY} = useContext(UserContext);
    const postUrl = `${API_GATEWAY}/api/user-service/university/update`;
    const [saving, setSaving] = useState(false);
    const universityPlaceHolder = useRef({
        ...university,
        id: university?.id,
        name: university?.name || '',
        logoUrl: university?.logoUrl || "",
        savedLogoUrl: university?.logoUrl || "",
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
            updateUniversityDetails(universityPlaceHolder.current.phoneNumber, universityPlaceHolder.current.savedLogoUrl);
            setNewDataSaved(false);
            setSaving(false);
        }
    }, [newDataSaved]);

    const saveChanges= (universityToBeSaved, picData, fileName) => {
        const keyName =   `${university.id}/${fileName}`
        initUpload(universityToBeSaved, picData, keyName);
        setSaving(true);
    }


    return(
        <Box sx={{display:"flex", flexDirection:"column", p:2, gap:3 }}>
            <ThemeSettings
                universityPlaceHolder={universityPlaceHolder}
            />
            <UniversityProfile
             universityPlaceholder={universityPlaceHolder}
             saveChanges={saveChanges}
             saving={saving}
            />
            <Divider sx={{mt:3}}/>
        </Box>
    )
};

export default ProfileSettings