import PagesTable from "../../../components/PagesTable.jsx";
import {Box, LinearProgress} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";

const UserTables = ({value, setValue, users, setUserIds, setUsers, userSelection}) => {
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if(users.length > 0){
            setUserIds(users.map(user => user.id));
        }
    }, [users]);


    useEffect(() => {
            setUsers([]);
            if(value === "studentusers"){
                fetchStudentUsers();
            }
            if(value === "staffusers"){
                fetchStaffUsers()
            }

    }, [value]);




    const fetchStudentUsers = () => {
        axios.get("http://localhost:8080/api/user-service/university/1/admin/50/users?user-type=STUDENT&companyID=3420062")
            .then((response) => {
                processUserData(response.data.content);
                // console.log(response.data.content);
                setLoading(false);
            }).catch((error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });
    }

    const fetchStaffUsers = () => {
        axios.get(`http://localhost:8080/api/user-service/university/1/admin/50/users?user-type=STAFF&companyID=3420062`)
            .then((response) => {
                processUserData(response.data.content);
                // console.log(response.data.content);
                setLoading(false);
            }).catch((error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });
    }


    const processUserData = (data) => {
        const users = data.map((user) => ({
            ...user,
            name: user.firstName + " " + user.lastName
        }));
        setUsers(users);
    }


    const staffColumnHeaders = {
        "staffNo.": "staff.staffNumber",
        "name": "name",
        "email": "email",
        "school": "school",
        "User Type": "userType",
    }

    const studentColumnHeaders = {
        "studentNo.": "student.studentNumber",
        "name": "name",
        "email": "email",
        "authority": "authority",
        "User Type": "userType",
        "school": "student.school",
        "course":"student.course"
    }


    return(
        <Box sx={{width: "100%"}}>
            {loading ?
                (
                    <Box sx={{m:"auto"}}>
                        <LinearProgress variant="indeterminate" color="secondary" />
                    </Box>
                ) : (
            <PagesTable
                items={users}
                onDeselectAll={userSelection.handleDeselectAll}
                onDeselectOne={userSelection.handleDeselectOne}
                onSelectAll={userSelection.handleSelectAll}
                onSelectOne={userSelection.handleSelectOne}
                selected={userSelection.selected}
                columnHeaders={value === "staffusers" ? staffColumnHeaders : studentColumnHeaders}
                checkable={true}
            />
                )}
        </Box>
    )
};
export default UserTables;