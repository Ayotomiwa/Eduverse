import UserManagement from "./User/UserManagement.jsx";
import {Box, Card} from "@mui/material";
import {useEffect, useState} from "react";
import SideNav from "./SideNav.jsx";
import {TopNav} from "./TopNav.jsx";
import {useLocation} from "react-router-dom";


const Admin = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    const [currentPage, setCurrentPage] = useState(page || "user-management");

    useEffect(() => {
        if(page){
            setCurrentPage(page);
        }
    },[page]);



    return (
        <>
            <Box sx={{position:"fixed",
                mt:"100px",
                display:"flex",
                alignItems:"stretch",
                minHeight:"100vh"}}>
                <SideNav
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </Box>
        <Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
        <Box sx={{ width:"100%"}}>
            <TopNav />
        </Box>
            <Box  sx={{display:"flex", flexDirection:"column", ml:"170px"}}>
                {currentPage === "user-management" &&
                <Box sx={{m:"20px"}}>
                    <Box sx={{}}>
                        <UserManagement />
                    </Box>
                </Box>
                }
            </Box>
            </Box>
        </>
    );
};

export default Admin;