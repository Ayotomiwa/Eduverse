import {Button, CardActionArea, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import profileImage from "../../assets/14358.jpg"
import {AspectRatio, CardCover, CardContent, CardActions, Typography, Card, ThemeProvider} from "@mui/joy";
import Link from '@mui/joy/Link';




export default function GroupCard({group}) {
    const theme = useTheme();
    const navigate = useNavigate();




    return (
        <ThemeProvider theme={theme}>
        <Card
            variant="soft"
            elevation={24}
            orientation="horizontal"
            sx={{
            width: 270, mb: 4,
                height: 250,
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
        >
                <CardCover>
                    <img
                        // src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        src={group?.profilePicUrl}
                        loading="lazy"
                        alt=""
                    />
                </CardCover>
                <CardContent sx={{mt:"auto"}}>
                    <Typography
                        level="h5"
                        noWrap={false}
                        variant="h4"
                        sx={{color:"white",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}>
                        <Link
                            onClick={() => navigate(`/communities/${group.id}`)}
                            overlay
                            underline="none"
                            // href={`/communities/${group.id}`}
                        />
                        {group?.name}
                    </Typography>
                    <Typography color="neutral"
                                variant="soft"
                    >
                        {group?.description || "Default description if not provided"}
                    </Typography>
                </CardContent>
            {/*</CardActionArea>*/}
        </Card>
        </ThemeProvider>
    );
}
