import PropTypes from 'prop-types';
import {Box, darken, Divider, Stack, Typography, useMediaQuery, useTheme} from '@mui/material';
import {SideNavItem} from './SideNavItem.jsx';
import  items from './Config.jsx';



const SideNav = ({currentPage, setCurrentPage}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const {user} = useContext(UserContext);


    const path = window.location.pathname;

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt:0
            }}
        >
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        backgroundColor: darken("#a7c7e7", 0.5),*/}
            {/*        justifyContent: 'center',*/}
            {/*        height:"70px",*/}

            {/*    }}*/}
            {/*>*/}

            {/*    <Typography*/}
            {/*        variant="h6"*/}
            {/*        // sx={{textAlign: "center", color:"#FFD800"}}*/}
            {/*        sx={{textAlign: "center", color:"white"}}*/}
            {/*    >*/}
            {/*        Admin Dashboard*/}
            {/*    </Typography>*/}

            {/*</Box>*/}
            {/*<Divider sx={{borderColor: 'neutral.700'}}/>*/}
            <Box
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3
                }}
            >
                <Stack
                    spacing={3}
                    sx={{
                        p: 0,
                        mt: "30px"
                    }}
                >
                    {items.map((item) => {
                        const active = item.path ? (path === item.path) : false;
                        //   const active = true;

                        return (
                            <SideNavItem
                                active={active}
                                disabled={!active}
                                external={item.external}
                                icon={item.icon}
                                key={item.title}
                                path={item.path}
                                title={item.title}
                            />
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );


    return (
    <Box sx={{
        // border: "3px black solid",
        backgroundColor: 'transparent',
        // border: "1px solid black",
        // color: "white",
        width: "100%" }}>
        {content}
    </Box>
    );
};

export default SideNav;

SideNav.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
