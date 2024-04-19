import PagesTable from "../../../components/Display/PagesTable.jsx";
import {Box, LinearProgress, Card} from "@mui/material";
import { useState} from "react";

const GroupTable = ({value, groups, groupSelection, loading}) => {


    const pendingHeaders = {
        "name.": "name",
        "creator": "creatorUsername",
        "owned by": "type",
        "created date": "createdAt",
        "category": "category",
    }

    const approvedHeaders = {
        ...pendingHeaders,
        "approved date": "approvedDate",
    }

    const blockedHeaders = {
        ...pendingHeaders,
        "blocked date": "blockedDate",
    }

    const handleRowClick = (id) => {
        window.location.href = `/communities/${id}` ;
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
                items={groups}
                onDeselectAll={groupSelection.handleDeselectAll}
                onDeselectOne={groupSelection.handleDeselectOne}
                onSelectAll={groupSelection.handleSelectAll}
                onSelectOne={groupSelection.handleSelectOne}
                selected={groupSelection.selected}
                columnHeaders={value === "blocked" ? blockedHeaders : value === "pending"? pendingHeaders : approvedHeaders}
                handleRowClick={handleRowClick}
                checkable={true}
            />
                )}
        </Card>
    )
};
export default GroupTable;