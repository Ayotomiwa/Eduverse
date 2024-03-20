import PropTypes from 'prop-types';
import {Box, ButtonBase, darken, Typography} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const SideNavItem = (props) => {
    const { active = false, disabled, path, icon, title } = props;

    const linkProps = path
        ? {
            component: RouterLink,
            to: path,
        }
        : {};

    return (
        <Box>
            <ButtonBase
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 1,
                    padding: '5px',
                    mt: '10px',
                    width: '100%',
                    // backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.8)',
                        color: '#fff',
                        '.icon': {
                            color: '#fff',
                        },
                        'title':{
                            color: '#fff'
                        }
                    },
                    ...(active && {
                        backgroundColor: 'rgba(33, 150, 243, 0.5)',
                    }),
                }}
                {...linkProps}
            >
                {icon && (
                    <Box
                        component="span"
                        className="icon"
                        sx={{
                            color: active ? '#fff' :  darken("#a7c7e7", 0.5),
                            alignItems: 'center',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 1,
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    className="icon"
                    sx={{
                        color: darken("#a7c7e7", 0.5),
                        flexGrow: 1,
                        lineHeight: '10px',
                        textAlign: 'center',
                        wordWrap: 'break-word',
                    }}
                >
                    <Typography variant="subtitle2">{title}</Typography>
                </Box>
            </ButtonBase>
        </Box>
    );
};

SideNavItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    path: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string.isRequired,
};
