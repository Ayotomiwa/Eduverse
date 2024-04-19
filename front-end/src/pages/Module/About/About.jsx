import {Typography, Box, Card, CardContent} from "@mui/material";
import Members from "./Members.jsx";

const About = ({module, setNewMemberAdded}) => {



    return (
        <Box>
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: "left", width:"100%"}}>
            <Typography variant="h5">
                About
            </Typography>
            <Card sx={{borderRadius: "12px", mt:1, p:2}}>
                <CardContent sx={{border:`1px #ddd solid`}}>
                    <Typography variant="body2" >
                        {module.about}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
            {module && (
            <Box sx={{my:2}}>
                <Typography variant="h5">
                   Staff & Students
                </Typography>
                <Box sx={{mt:1}}>
                    <Members
                        module={module}
                        setNewMemberAdded={setNewMemberAdded}
                    />
                </Box>
            </Box>
                )}
        </Box>

    );

}

export default About;