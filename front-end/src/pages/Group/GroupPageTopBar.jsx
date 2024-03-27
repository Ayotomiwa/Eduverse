import {Box, Button, lighten, SvgIcon, Typography} from "@mui/material";
import SimpleTab from "../../components/SimpleTab.jsx";
import {useState} from "react";
import {SearchBar} from "../../components/SearchBar.jsx";

const GroupPageTopBar = () => {

    const [tabValue, setTabValue] = useState(0);
    const tabs = ["My Groups", "All Groups"];

    const tabConfig ={
        0: "Mine",
        1: "All",
    }

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };



    return (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems:"baseline",  width:"100%"}}>
                <Box>
                    <Typography textAlign="center" variant="h4"
                                sx={{color: "grey"}}>
                       Communities
                    </Typography>
                </Box>
                <Box sx={{width:"350px"}}>
                    <SearchBar />
                </Box>
                <Box>
                    <SimpleTab
                        tabs={tabs}
                        handleTabChange={handleTabChange}
                    />
                </Box>
            </Box>
    )
}
export default GroupPageTopBar;