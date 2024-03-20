import {Box, Card, Collapse, ListItemButton, ListItemIcon, ListItemText, List} from "@mui/material";
import SimpleMenu from "../../components/SimpleMenu.jsx";
import {SearchBar} from "../../components/SearchBar.jsx";
import {InboxIcon} from "lucide-react";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {useState} from "react";

const FeatureCards = () => {
    const [open, setOpen] = useState(true);


    const FeatureCard = ({title, optionsWithIcons, handleMenuClick}) => {

    }

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <Card sx={{
            bgcolor:"white",
            maxHeight:"700px",
            pt:0,
            borderRadius:"12px"
        }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Card>
    )
}
export default FeatureCards;