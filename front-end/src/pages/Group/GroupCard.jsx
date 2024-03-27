import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import profileImage from "../../assets/14358.jpg"


export default function GroupCard({title, description, image, color}) {
    const navigate = useNavigate();



    return (
        <Card elevation={8} sx={{
            maxWidth: 270, mb: 4,
            backgroundColor: "white",
            elevation: 6,
            border: "0.1px solid grey",
            borderRadius: "12px"
        }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/community/`)
                    // window.location.href = `/contract/edit?contractId=${contractId}&color=${encodeURIComponent(color)}&default=${true}`;
                }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={profileImage}
                />
                <CardContent>
                    <Typography variant="h6"
                    >
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="grey">
                        {description || "Default description if not provided"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}
