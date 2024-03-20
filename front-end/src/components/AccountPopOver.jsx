import {useContext} from 'react';

import PropTypes from 'prop-types';
import {Box, Divider, MenuItem, MenuList, Popover, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';


export const AccountPopOver = (props) => {
    const {anchorEl, onClose, open} = props;
    // const {logout, user} = useContext(UserContext);
    const navigate = useNavigate();


    const handleSignOut = async () => {
        // await logout();
        // localStorage.removeItem("pathBeforeLogin"); // Clear the path from local storage
        // // navigate('/');
        // window.location.replace("/");

    };

    const handleSignIn = () => {
        // window.location.pathname = '/login'
    }

    return (
        <Popover
            sx={{
                maxWidth: '70%',
                maxHeight: '70%'
            }}
            marginThreshold={30}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            onClose={onClose}
            open={open}
            slotProps={{
                paper:{
                sx: {
                    width:  150,
                    position: 'relative',
                }
            }}}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Account
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                    textAlign="center"
                >
                    {/*{user ? user.email : ''}*/}
                </Typography>
            </Box>
            <Divider/>
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                {(
                    <MenuItem onClick={handleSignOut}>
                        Sign out
                    </MenuItem>

                )}
            </MenuList>
        </Popover>
    )

};

AccountPopOver.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
};
