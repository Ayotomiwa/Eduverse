import React, {useContext, useEffect, useRef} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Box, Card, CardHeader, CircularProgress, lighten, Typography, useTheme} from "@mui/material";
import UserContext from "../../../hooks/UserProvider.jsx";
import {format} from 'date-fns';


const MessageList = ({messages, channel}) => {
    const theme = useTheme();
    const {user} = useContext(UserContext);
    const messagesEndRef = useRef(null);



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

        useEffect(() => {
                scrollToBottom()
            }, [messages])



    const softColors = [
        '#f8c6d1',
        '#a7c7e7',
        '#a8e6cf',
        '#d1c4e9',
        '#ffccaa',
        '#f6e8b1',
        '#87ceeb',
        '#88d8b0',
        '#f3e5f5',
        '#fffdd0'
    ];




    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxHeight: "70vh",
            overflowY: "auto",
            height: "70vh",
            mt: 2,
            boxSizing: 'border-box',
            m: 1
        }}>
            <Box>
                {!channel ? (
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <CircularProgress color="secondary"/>
                    </Box>
                ) : (
                    <>
                        <Box sx={{
                            mx: 2,
                            bgcolor:"inherit",
                            display: "flex",
                            flexDirection: "column-reverse"}}>
                            <List sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: '100%',
                                py:2,
                                m:0,
                                bgcolor:"inherit",
                                // bgcolor: lighten(theme.palette.secondary.main, 0.8),
                                gap: 3
                            }}>

                                {messages.map((message, index) => (
                                    <Card key={index} sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: message.sender === user.username ? "#87ceeb"  :   softColors[index % softColors.length],
                                        minWidth: "250px",
                                        maxWidth: "600px",
                                        alignSelf: message.sender === user.username ? "flex-end" : "flex-start",
                                        borderRadius: "12px",
                                        p: 1,
                                    }}>
                                        <ListItem alignItems="flex-start" >
                                            <ListItemText
                                                sx={{overflowWrap: "break-word", pr:5}}
                                                secondary={
                                                <Typography variant="subtitle1">
                                                    {message.message}
                                                </Typography>
                                            }
                                            />
                                        </ListItem>
                                        <ListItem alignItems="flex-start" sx={{py:-5, my:-1, display: "flex"}}>
                                            <Typography textAlign="right" variant="caption" sx={{ flexGrow: 1 }}>
                                                {message.sender} @  {format(new Date(message.timestamp), 'dd/MM/yyyy HH:mm')}
                                            </Typography>
                                        </ListItem>
                                    </Card>
                                ))}
                                <div ref={messagesEndRef} />
                            </List>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}
export default MessageList;
