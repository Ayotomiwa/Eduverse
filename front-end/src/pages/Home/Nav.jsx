import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import HomeModernIcon from '@heroicons/react/24/solid/HomeModernIcon';
import DocumentPlusIcon from '@heroicons/react/24/solid/DocumentPlusIcon';
import {
    AppBar,
    Avatar,
    Badge, Box,
    Button, darken,
    IconButton, lighten, Paper,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';


import {useLocation, useNavigate} from "react-router-dom";
import {AccountPopOver} from "../../components/AccountPopOver.jsx";
import {usePopover} from "../../hooks/UsePopover.jsx";
import CreatePost from "../Posts/CreatePost.jsx";



export const Nav = (props) => {
    const {onNavOpen, openNav, showSideBar} = props;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const sideBarWidth = openNav ? SIDE_NAV_WIDTH : 0;
    const accountPopover = usePopover();



    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const currentPath = useLocation().pathname;


    const handleNavClick = (path) => {
        window.location.pathname = path;
    }


    const navBgColor = (currentPath === "/contracts") ? "rgb(0, 0, 0, 0.2)" : "transparent";

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "centet",
            flexDirection: "column",
            margin: 0,
            padding:0,

            // position: 'sticky',
            // top:0,
            maxWidth: "100vw",
        }}
        >
            <Paper
                component="div"
                sx={{
                    overflowX: "hidden",
                    bgcolor:"#F0F0F0",
                    width: "100%",
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{
                        px: 2
                    }}
                >
                    <Tooltip title="Notifications">
                        <IconButton>
                            <Badge
                                badgeContent={4}
                                // color="success"
                                variant="dot"
                            >

                                <SvgIcon fontSize="large">
                                    {/*<BellIcon color="rgb(185,67,102)"/>*/}
                                    {/*<BellIcon color="#e75480"/>*/}
                                    <BellIcon />
                                </SvgIcon>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Avatar
                        onClick={accountPopover.handleOpen}
                        ref={accountPopover.anchorRef}
                        size="large"
                        sx={{
                            cursor: 'pointer',
                            // height: 40,
                            // width: 40
                        }}
                        src={"/assets/avatars/avatar-carson-darrin.png"}
                    />
                </Stack>
                <AccountPopOver
                    anchorEl={accountPopover.anchorRef.current}
                    open={accountPopover.open}
                    onClose={accountPopover.handleClose}
                />
            </Paper>

    </Box>
    );
};

Nav.propTypes = {
    onNavOpen: PropTypes.func
};
