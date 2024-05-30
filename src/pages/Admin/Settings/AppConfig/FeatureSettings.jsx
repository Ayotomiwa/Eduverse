import {
    Alert,
    Box, Button,
    Card,
    CardContent, CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Select, Snackbar,
    Switch,
    Typography
} from "@mui/material";
import FeatureSetting from "./FeatureSetting.jsx";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../../../hooks/UserProvider.jsx";
import {LoadingButton} from "@mui/lab";


const FeatureSettings = () => {
    const{user, jwtToken, university, changeFeatureSettings, API_GATEWAY} = useContext(UserContext);
    const [fullFeatureSettings, setFullFeatureSettings] = useState([]);
    const [snackMessage, setSnackMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [featuresSaved, setFeaturesSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [processed, setProcessed] = useState(false);
    const featureTypes= ["CONTENT", "MODULE", "MESSAGING", "EVENT", "GROUP"]

    useEffect(() => {
        // console.log("fetching feature settings");
        setProcessed(false);
        fetchFeatureSettings();
    }, []);


    useEffect(() => {
        if (fullFeatureSettings.length > 0) {
            setProcessed(true);
        }
    }, [fullFeatureSettings]);


    useEffect( () => {
        if(saving){
            setProcessed(false);
            saveFeatureChanges();
        }
    }, [saving])


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSnackMessage("");
    }


    useEffect(() => {
        if(snackMessage !== ""){
            setOpen(true);
        }
    }, [snackMessage]);

    const saveFeatureChanges = () => {
        axios.post(`${API_GATEWAY}/api/user-service/features/university/${university.id}`, fullFeatureSettings,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }).then(response => {
                    changeFeatureSettings(response.data);
                    setFullFeatureSettings(response.data);
                    setSaving(false);
                    setFeaturesSaved(true);
                    setSnackMessage("Settings saved successfully");
                    console.log("data response", response.data);
             }).catch(error => {
                 setSnackMessage("Error saving settings: " + error);
            console.error(error);
            setSaving(false);

           })

    }


    const fetchFeatureSettings = () => {
        axios.get(`${API_GATEWAY}/api/user-service/features/university/${university.id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        }).then(response => {
            // console.log(response.data);
            setFullFeatureSettings(response.data);
            setProcessed(true);
        }).catch(error => {
            console.error(error);
            // setProcessed(true);
        });
    }




    return (
        <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"100%", flexGrow:1}}>
            <Box sx={{display:"flex", flexDirection:"column", height: "100%", flex:1}}>
                {!processed && (
                    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", flex:1}}>
                        <CircularProgress/>
                    </Box>
                )}
                {processed && ( featureTypes.map((featureType, index) => {
                    const filteredFeatureSettings = fullFeatureSettings.filter(featureSetting => featureSetting.feature.type === featureType);
                    return (
                        <CardContent key={index}>
                            <Box sx={{display: "flex", flexDirection: "row", gap: 2, alignItems: "center"}}>
                                <Typography variant="h6" gutterBottom>{featureType.toUpperCase()}</Typography>
                                <Divider orientation="horizontal" />
                            </Box>
                            {filteredFeatureSettings.map((featureSetting, index) => (
                                <Box key={index}>
                                    <Divider sx={{height: "100%", width: 2, bgcolor: "grey.500"}}/>
                                    <FeatureSetting
                                        featureSetting={featureSetting}
                                        fullFeatureSettings={fullFeatureSettings}
                                        setFullFeatureSettings={setFullFeatureSettings}
                                    />
                                </Box>
                            ))}
                        </CardContent>
                    )
                }))}
            </Box>
            <Box sx={{display:"flex" }}>
                <Button
                    onClick={() => setSaving(true)}
                    variant="contained" color="success" sx={{ mt: 4, ml:"auto" }}>
                    Save Profile
                </Button>
            </Box>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'right' }}
                      open={open} autoHideDuration={5000}
                      onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} color="secondary">
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
export default FeatureSettings;