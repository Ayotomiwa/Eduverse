import {
    Box,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Select,
    Switch,
    Typography
} from "@mui/material";
import FeatureSetting from "./FeatureSetting.jsx";



const Feature = ({featureType, featureSettings, setFeatureSettings}) => {




    return (
        <Box sx={{mb: 2}}>
            <CardContent>
                <Box sx={{display: "flex", flexDirection: "row", gap: 2, alignItems: "center"}}>
                    <Typography variant="h6" gutterBottom>{featureType.toUpperCase()}</Typography>
                    <Divider orientation="horizontal" sx={{width:"100%", boxSizing:"border-box"}}/>
                </Box>
                {/*<Typography variant="body2" sx={{mb: 2}}>{feature.description}</Typography>*/}
                {featureSettings && featureSettings.map((featureSetting, index) => (
                    <Box key={index}>
                        <Divider sx={{height: "100%", width: 2, bgcolor: "grey.500"}}/>
                        <FeatureSetting
                            key={index}
                            featureSetting={featureSetting}
                            featureSettings={featureSettings}
                            setFeatureSettings={setFeatureSettings}
                        />
                    </Box>
                    ))}
        </CardContent>
</Box>
)

};

export default Feature;