import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import profileImage from "../../assets/14358.jpg"


export default function GroupCard({group}) {
    const navigate = useNavigate();



    return (
        <Card elevation={8} sx={{
            width: 270, mb: 4,
            backgroundColor: "white",
            elevation: 6,
            border: "0.1px solid grey",
            borderRadius: "12px"
        }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/communities/${group.id}`)
                    // window.location.pathname = `/communities/${group.id}`;
                }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={group.profileUrl}
                />
                <CardContent>
                    <Typography variant="h6"
                    >
                        {group.name}
                    </Typography>
                    <Typography variant="subtitle2" color="grey">
                        {group.description || "Default description if not provided"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}
