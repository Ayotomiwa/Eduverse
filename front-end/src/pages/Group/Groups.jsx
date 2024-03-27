import {
    AppBar,
    Box, lighten,
    Typography
} from "@mui/material";
import GroupCard from "./GroupCard.jsx";
import GroupPageTopBar from "./GroupPageTopBar.jsx";


const Groups = () => {


    const contracts  = [
        { title: 'Asset Purchase Agreement', description: 'Outlines the terms of the sale and purchase of a company\'s assets.' },
        { title: 'Brand Licensing Agreement Template', description: 'Allows one party to use another\'s brand, logo, or name for a specified purpose.' },
        { title: 'Collaboration Agreement Template', description: 'A contract between parties to work together on a project or venture.' },
        { title: 'Data Use Agreement Template', description: 'Governs how data, particularly sensitive or proprietary, can be used and shared.' },
        { title: 'Lease', description: 'A contract conveying land, property, or services to another for a specified time against periodic payment.' },
        { title: 'Tenancy Agreement Template', description: 'A contract between a landlord and tenant outlining rental property terms and conditions.' },
        { title: 'Data Use Agreement Template', description: 'Governs how data, particularly sensitive or proprietary, can be used and shared.' },
        { title: 'Lease', description: 'A contract conveying land, property, or services to another for a specified time against periodic payment.' },
        { title: 'Tenancy Agreement Template', description: 'A contract between a landlord and tenant outlining rental property terms and conditions.' },
        { title: 'Data Use Agreement Template', description: 'Governs how data, particularly sensitive or proprietary, can be used and shared.' },
        { title: 'Lease', description: 'A contract conveying land, property, or services to another for a specified time against periodic payment.' },
        { title: 'Tenancy Agreement Template', description: 'A contract between a landlord and tenant outlining rental property terms and conditions.' },
    ];


    const softColors = [
        '#f8c6d1',
        '#a7c7e7',
        '#a8e6cf',
        '#d1c4e9',
        '#ffccaa',
        '#f6e8b1',
        '#87ceeb',
        '#88d8b0',
        '#f3e5f5',
        '#fffdd0'
    ];





    return (
        <Box sx={{minHeight:"100vh", p:0, border:"1px red solid"}}>
            <Box
                sx={{
                   p: 2,
                    position: "sticky",
                    top: 0,
                    backgroundColor: lighten("#c9d1d3", 0.2),
                    zIndex: 2000
                }}
            >
                <GroupPageTopBar />
            </Box>
            <Box sx={{
                mt: 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
            }}>
                {contracts.map((contract, index) => (
                    <GroupCard
                        key={index}
                        title={contract.title}
                        description={contract.description}
                        color={softColors[index % softColors.length]}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Groups;