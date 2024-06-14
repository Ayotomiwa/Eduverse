import {Box, Button, lighten, SvgIcon, Typography} from "@mui/material";
import SimpleTab from "../../components/Input/SimpleTab.jsx";
import {useContext, useEffect, useState} from "react";
import {SearchBar} from "../../components/Input/SearchBar.jsx";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon.js";
import {useNavigate} from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon.js";
import useImageUpload from "../../hooks/useImageUpload.jsx";
import EditGroupProfileModal from "../../components/EditGroupProfileModal.jsx";
import UserContext from "../../hooks/UserProvider.jsx";

const GroupsTopBar = ({setTabValue, setSearchTerm, resetList, handleNewClicked}) => {


    const tabs = ["My Groups", "All Groups"];

    const {user, university, jwtToken, API_GATEWAY} = useContext(UserContext);





    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };



    return (
        <Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems:"baseline",  width:"100%"}}>
                <Box>
                    <Typography textAlign="center" variant="h4"
                                sx={{color: "grey"}}>
                       Communities
                    </Typography>
                </Box>
                <Box sx={{width:"350px"}}>
                    <SearchBar
                        placeHolder="Search for Groups"
                        setSearchTerm={setSearchTerm}
                        resetList={resetList}
                    />
                </Box>
                <Box>
                    <SimpleTab
                        tabs={tabs}
                        handleTabChange={handleTabChange}
                    />
                </Box>
            </Box>
    <Box
        sx={{
            display:"flex",
            alignItems:"center",
        }}
    >
        <Button
            variant = "contained"
            startIcon={
                <SvgIcon>
                    <PlusIcon />
                </SvgIcon>}

            onClick={() => {
                handleNewClicked();
                // window.location.reload();
                // window.location.replace("http://localhost:5173/feed")
            }}>
            <Typography
                variant="subtitle1"
                fontWeight="bold"
                textAlign="center"
                sx={{color:"primary.contrastText", mr:"5px"}}
            >
                Create
            </Typography>
        </Button>
    </Box>

        </Box>
    )
}
export default GroupsTopBar;