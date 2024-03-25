import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import GlobeAltIcon from '@heroicons/react/24/solid/GlobeAltIcon';

import {
    AppBar,
    Avatar,
    Badge, Box,
    Button, Card, darken,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

import {useLocation, useNavigate} from "react-router-dom";
import {usePopover} from "../../hooks/UsePopover.jsx";
import {AccountPopOver} from "../../components/AccountPopOver.jsx";


export const TopNav = () => {

    const accountPopover = usePopover();



    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const currentPath = useLocation().pathname;



    return (
            <Card
                // component="nav"
                sx={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    height:"60px",
                    position: 'relative',
                    borderRadius: 0,
                }}
            >
                <Box
                 sx={{
                     display:"flex",
                     alignItems:"center",
                     ml:"15px"
                     }}
                >
                        <Button
                            startIcon={
                                <SvgIcon>
                                    <ArrowLeftIcon />
                                </SvgIcon>}

                            onClick={() => {window.location.pathname = "/feed"}}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                textAlign="center"
                                sx={{color:"purple", mr:"5px"}}
                            >
                                Back to EduVerse
                            </Typography>
                            <SvgIcon >
                                <GlobeAltIcon color="black" />
                            </SvgIcon>
                        </Button>
                </Box>

                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{
                        px: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // height:"70px",
                        }}
                    >

                        <Typography
                            variant="h6"
                            // sx={{textAlign: "center", color:darken("#a7c7e7", 0.5)}}
                            sx={{textAlign: "center", color:"black"}}
                        >
                            Admin Dashboard
                        </Typography>
                    </Box>
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
            </Card>
    );
};

TopNav.propTypes = {
    onNavOpen: PropTypes.func
};
