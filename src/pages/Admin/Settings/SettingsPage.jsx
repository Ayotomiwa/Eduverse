import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Switch,

    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    RadioGroup,
    Radio,
    Divider,
    Card,
    Select,
    MenuItem,
    CardContent,
    Grid, darken, Paper,
} from '@mui/material';
import FeatureSettings from "./AppConfig/FeatureSettings.jsx";
import UserContext from "../../../hooks/UserProvider.jsx";
import axios from "axios";
import ThemeSettings from "./AppProfile/ThemeSettings.jsx";
import ProfileSettings from "./AppProfile/ProfileSettings.jsx";



const SettingsPage = () => {
    const{user, jwtToken, university} = useContext(UserContext);



    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Paper elevation={18} sx={{mb: 3, p:3, width: "100%", flex: 1, borderRadius: 2, bgcolor: "white", boxSizing:"border-box"}}>
                <Typography variant="h5" sx={{
                    fontWeight: "bold",
                    color: darken("#a7c7e7", 0.5),

                }}>
                    App Configuration
                </Typography>
                <Typography variant="subtitle1" sx={{
                    mt: 1,
                    color: darken("#a7c7e7", 0.3),
                }}>
                    Customize your application settings including content visibility, module access, messaging preferences, and more.
                </Typography>
            </Paper>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", maxHeight:"200vh"}}>
                <Paper sx={{display: "flex", flexDirection:"column", width:"40%"}}>
                    <Typography variant="h6" sx={{m:2}}>
                        App Profile & Styling
                    </Typography>
                    <Box sx={{p:2}}>
                        <ProfileSettings/>
                    </Box>
                </Paper>
                <Paper sx={{display: "flex", flexDirection:"column", width:"60%"}}>
                    <Typography variant="h6" sx={{m:2}}>
                        Feature Settings
                    </Typography>
                    <Box sx={{p:2, display: "flex", height:"100%"}}>
                        <FeatureSettings/>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default SettingsPage;


