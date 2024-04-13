import {Box, Divider, FormControlLabel, MenuItem, Select, Switch, Typography} from "@mui/material";





const FeatureSetting = ({featureSetting, setFeatureSettings, featureSettings})=> {

    const roleOptions = [
        {label: 'Admin', value: 'ADMIN'},
        {label: 'Elevated', value: 'ELEVATED'},
        {label: 'Standard', value: 'STANDARD'},
    ];

    const typeOptions = [
        {label: 'Student', value: 'STUDENT'},
        {label: 'Alumni', value: 'ALUMNI'},
        {label: 'Staff', value: 'STAFF'},
        {label: "All", value: "ALL"},
    ];
    const handleFeatureSwitchChange = (event, featureSettingToUpdate) => {
        setFeatureSettings(featureSettings.map(featureSetting => {
            if (featureSetting === featureSettingToUpdate) {
                return { ...featureSetting, enabled: event.target.checked };
            } else {
                return featureSetting;
            }
        }));
        console.log(featureSettings);
        console.log("featureSetting", featureSetting);
    };



    const handleSelectChange = (event) => {
        const {name, value} = event.target;
        setFeatureSettings(featureSettings.map(featureSetting => {
            if (featureSetting === featureSetting) {
                return { ...featureSetting, [name]: value };
            } else {
                return featureSetting;
            }
        }));
    }



    return (
        <Box sx={{mt: 2, display: "flex", flexDirection: "row", my: 2}}>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Box
                sx={{display: "flex", flexDirection: "row", gap: 2, alignItems: "flex-start"}}>
                <Typography variant="subtitle1" gutterBottom>
                    {featureSetting.feature.name
                        .replace(/_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')}
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={featureSetting.enabled}
                            onChange={(event) => handleFeatureSwitchChange(event, featureSetting)}
                        />
                    }
                    sx={{display: "flex", alignItems: "center"}}
                    label={featureSetting.enabled ? "Enabled" : "Disabled"}
                />
            </Box>
            <Typography variant="body2" sx={{mb: 2}}>{featureSetting.feature.description}</Typography>

        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            boxSize: "border-box",
            alignItems:"center",
            ml: "auto",
            pr:2,
            gap: 3,
            width:"100%",
        }}>
            <Box>
                <Typography>Access by Role</Typography>
                <Select
                    fullWidth
                    value={featureSetting?.authorizedUsers || ""}
                    onChange={handleSelectChange}
                    name="authorizedUsers"
                    disabled={!featureSetting.enabled}
                >
                    {roleOptions.map((option) => (
                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography>Access by Type</Typography>
                <Select
                    fullWidth
                    value={featureSetting?.authorizedMembers || ""}
                    onChange={handleSelectChange}
                    name="authorizedMembers"
                    disabled={!featureSetting?.enabled}
                >
                    {typeOptions.map((option) => (
                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    </Box>
);
}

export default FeatureSetting;