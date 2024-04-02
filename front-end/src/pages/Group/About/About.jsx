import {Typography, Box, Card, CardContent} from "@mui/material";
import Members from "./Members.jsx";

const About = ({community}) => {












    return (
        <Box>
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: "left", width:"100%"}}>
            <Typography variant="h5">
                About
            </Typography>
            <Card sx={{borderRadius: "12px", mt:1}}>
                <CardContent>
                    <Typography variant="body2">
                        {community.description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
            <Box sx={{my:2}}>
                <Typography variant="h5">
                    Members
                </Typography>
                <Box sx={{mt:1}}>
                    <Members
                        community={community}
                    />
                </Box>
            </Box>
        </Box>

    );


}

export default About;