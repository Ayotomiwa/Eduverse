import {
    Avatar,
    Card,
    Collapse,
    List,
    ListItemAvatar,
    Box,
    ListItemButton,
    Typography,
    ListItemIcon,
    ListItemText,
    SvgIcon
} from "@mui/material";
import {InboxIcon} from "lucide-react";
import {ExpandLess, ExpandMore, LibraryBooks, StarBorder} from "@mui/icons-material";
import {useState} from "react";

const ModuleCard = () => {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    const modules = [
        {
            name: "Module 1",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "Module 2",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "Module 3",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "Module 4",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "Module 5",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        },
        {
            name: "Module 6",
            profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        }
    ]

    const handleMenuClick = (id) => {
        console.log("id", id);
    }


    return (
        <Card sx={{
            bgcolor: "white",
            borderRadius: "12px"
        }}>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
            >
                <ListItemButton onClick={handleClick}>
                    <Box sx={{mr:1}}>
                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/books.png" alt="books"/>
                    </Box>
                    <ListItemText  primary={
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
                    maxHeight: "20vh"}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {modules.map((module, index) => {
                            return(
                                <ListItemButton sx={{pl: 4}} key={index}>
                                    <ListItemAvatar>
                                        <Avatar variant="square"  sx={{ bgcolor: 'green', width: 24, height: 24  }}>
                                            {module.name?.charAt(0).toUpperCase()}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={module.name}/>
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