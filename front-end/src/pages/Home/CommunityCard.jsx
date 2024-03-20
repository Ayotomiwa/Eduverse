import {
    Avatar,
    Box,
    Card,
    Collapse,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText, Typography
} from "@mui/material";
import {InboxIcon} from "lucide-react";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {useState} from "react";

const ModuleCard = () => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    const communities = [
        {
            name: "Community 1",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "comumnity 2",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "community 3",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        }
    ]

    const handleMenuClick = (id) => {
        console.log("id", id);
    }


    return (
        <Card sx={{
            bgcolor: "white",
            pt: 0,
            borderRadius: "12px"
        }}>
            <List
                sx={{width: '100%', bgcolor: 'background.paper'}}
                component="nav"
            >
                <ListItemButton onClick={handleClick}>
                    <Box sx={{mr: 1}}>
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                             alt="groups"/>
                    </Box>
                    <ListItemText color="secondary" primary={
                        <Typography color="secondary">
                            Modules
                        </Typography>
                    }>
                    </ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Box sx={{overflowY: "auto",
                    '&::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'white',
                        borderRadius: '25px',
                        outline: '1px solid slategrey'
                    },
                    maxHeight: "25vh"}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {communities.map((community, index) => {
                                return(
                                    <ListItemButton sx={{pl: 4}} key={index}>
                                        <ListItemAvatar>
                                            <Avatar variant="square"  sx={{ bgcolor: 'green', width: 24, height: 24  }}>
                                                {community.profilePic}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={community.name}/>
                                    </ListItemButton>
                                )
                            })}
                        </List>
                    </Collapse>
                </Box>
            </List>
        </Card>
    )

}
export default ModuleCard;