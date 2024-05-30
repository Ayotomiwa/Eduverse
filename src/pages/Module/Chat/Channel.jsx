import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import axios from "axios";
import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, Divider,
    IconButton,
    Typography
} from "@mui/material";


const Channel = ({channel, moduleName}) => {
    const navigate = useNavigate();

    return (
        <Card sx={{
            width: "100%",
            display:"flex",
            flexDirection:"row",
            // border: "5px grey solid",
            boxShadow: "1.5px 1.5px 3px rgba(0,0,0,0.5)",
            // bgcolor:"primary.contrastText"
        }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/modules/channels/${channel.id}?moduleName=${moduleName}&topic=${channel.topic}`)
                }}
            >
                <CardHeader
                    sx={{ width:"20%"}}
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                            {channel.creator?.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={channel.creator}
                    subheader={new Date(channel.createdDate).toLocaleDateString()}
                />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100px",
                }}>
                    <Typography variant={"h5"}
                                sx={{color: "black"}}
                    >
                        {channel.topic}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default Channel;