import PagesTable from "../../../components/Display/PagesTable.jsx";
import {Box, LinearProgress, Card} from "@mui/material";
import { useState} from "react";


const UserTables = ({value, users, userSelection}) => {
    const [loading, setLoading] = useState(false);


    const staffColumnHeaders = {
        "staffNo.": "staff.staffNumber",
        "name": "name",
        "email": "email",
        "Department": "staff.department",
        "Staff Type": "staff.staffType",
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

    const facultyColumnHeaders = {
        "name": "faculty.name",
        "email": "email",
        "department": "faculty.department",
        "User Type": "userType",
    }

    const columnHeaders =  {
            staff: staffColumnHeaders,
            student: studentColumnHeaders,
            faculty: facultyColumnHeaders
    }


    const handleRowClick = (id) => {
        window.location.href = `/profile/${id}` ;
    }



    return(
        <Card sx={{width: "100%", minHeight:"70vh"}}>
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
                columnHeaders={columnHeaders[value]}
                handleRowClick={handleRowClick}
                checkable={true}
            />
                )}
        </Card>
    )
};
export default UserTables;