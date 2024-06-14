import {useContext, useEffect, useState} from "react";
import {Box, Card, LinearProgress} from "@mui/material";
import PagesTable from "../../../components/Display/PagesTable.jsx";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";

const ModuleTable = ({modules, setModules , moduleSelection, loading, newDataSaved}) =>{


    const{jwtToken, API_GATEWAY} = useContext(UserContext);
    const [staffFetched, setStaffFetched] = useState(false);
    // const teachingTeam = modules?.map(module => module.teachingTeam).flat();
    const [staffIds, setStaffIds] = useState([]);
    const [users, setUsers] = useState([]);
    const userUrl = `${API_GATEWAY}/api/user-service/users/staff`;


    useEffect(() => {
        if(newDataSaved && modules){
            setStaffFetched(false);
        }
    },[newDataSaved])

    useEffect(() => {
        if(modules?.length > 0) {
            console.log("In first useEffect", modules);
            setStaffIds(modules?.map(module => module.teachingTeam.map(staff => staff.id)).flat());

        }
    },[modules])


    useEffect(() => {
        console.log("Staff ids", staffIds);
        if(staffIds.length > 0 && !staffFetched){
            console.log("staff fetching");
            fetchUsers();
        }
    },[staffIds])

    const fetchUsers = () => {
        axios.post(userUrl,
            staffIds,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }).then(response => {
                console.log("Fetched users", response.data);
            setModules(
                modules.map(module => {
                    console.log("Module", module);
                    return {
                        ...module,
                        teachingTeamTransformed: module.teachingTeam?.map(staff => {
                            const user = response.data.find(user => user.staff.staffNumber === staff.staffNumber);
                            return user ? `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}` : "";
                        }).join(", ")
                    }
                }))
            console.log("Fetched users", response.data);
            setStaffFetched(true);
        }).catch(error => {
            console.error("Failed to fetch modules", error);
            setStaffFetched(false);
        })
    }

    const moduleHeaders = {
        "module code": "code",
        "name": "name",
        "teaching team": "teachingTeamTransformed",
    }


    const handleRowClick = (id) => {
        window.location.href = `/modules/${id}` ;
    }



    return(
        <Card sx={{width: "100%", minHeight:"70vh"}}>
            {loading && users.length === 0 ?
                (
                    <Box sx={{m:"auto"}}>
                        <LinearProgress variant="indeterminate" color="secondary" />
                    </Box>
                ) : (
                    <PagesTable
                        items={modules}
                        onDeselectAll={moduleSelection.handleDeselectAll}
                        onDeselectOne={moduleSelection.handleDeselectOne}
                        onSelectAll={moduleSelection.handleSelectAll}
                        onSelectOne={moduleSelection.handleSelectOne}
                        selected={moduleSelection.selected}
                        columnHeaders={moduleHeaders}
                        handleRowClick={handleRowClick}
                        checkable={true}
                    />
                )}
        </Card>
    )
}

export default ModuleTable;