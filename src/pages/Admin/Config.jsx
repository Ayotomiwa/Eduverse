import NewspaperIcon from '@heroicons/react/24/solid/NewspaperIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {SvgIcon} from '@mui/material';
import {AcademicCapIcon, CogIcon, EnvelopeIcon, PaintBrushIcon, UserGroupIcon} from "@heroicons/react/20/solid";

const Config = [

        {
            title: 'User Management',
            path: '/admin?page=user-management&tab=staff',
            public: true,
            icon: (
                <SvgIcon fontSize="large">
                    <UsersIcon/>
                    {/*<EnvelopeIcon/>*/}
                </SvgIcon>
            )
        },
    {
        title: 'Module Management',
        path: '/admin?page=module-management',
        public: true,
        icon: (
            <SvgIcon fontSize="large">
                <AcademicCapIcon/>
                {/*<EnvelopeIcon/>*/}
            </SvgIcon>
        )
    },
    {
        title: 'Group Management',
        path: '/admin?page=group-management',
        public: true,
        icon: (
            <SvgIcon fontSize="large">
                <UserGroupIcon/>
                {/*<EnvelopeIcon/>*/}
            </SvgIcon>
        )
    },
        {
            title: 'App Configuration',
            path: '/admin?page=app-configuration',
            public: true,
            icon: (
                <SvgIcon fontSize="large">
                    <CogIcon/>
                </SvgIcon>
            )
        }
    ];

export default Config;
