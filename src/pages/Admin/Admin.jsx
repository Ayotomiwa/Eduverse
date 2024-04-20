import UserManagement from "./User/UserManagement.jsx";
import {Box, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import SideNav from "./SideNav.jsx";
import {TopNav} from "./TopNav.jsx";
import {useLocation} from "react-router-dom";
import GroupManagement from "./Group/GroupManagment.jsx";
import SettingsPage from "./Settings/SettingsPage.jsx";


const Admin = () => {
    const theme = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    const [currentPage, setCurrentPage] = useState(page || "user-management");

    useEffect(() => {
        if (page) {
            setCurrentPage(page);
        }
    }, [page]);


    return (
        <Box>
            <Box sx={{
                position: "fixed", mt: "100px", display: "flex", alignItems: "stretch", minHeight: "100vh"}}>
                <SideNav currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                <Box sx={{position: "sticky", zIndex: 5000, top: 0, width: "100vw", boxSizing: "border-box"}}>
                    <TopNav/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", ml: "170px"}}>
                    {currentPage === "user-management" &&
                        <Box sx={{m: "20px"}}>
                            <Box sx={{}}><UserManagement/></Box>
                        </Box>
                    }
                    {currentPage === "group-management" &&
                        <Box sx={{m: "20px"}}>
                            <Box sx={{}}><GroupManagement/></Box>
                        </Box>
                    }
                    {currentPage === "app-configuration" &&
                        <Box sx={{m: "20px"}}>
                            <Box sx={{}}><SettingsPage/></Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;