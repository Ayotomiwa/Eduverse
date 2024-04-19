import {useContext, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommentInput from "../../../components/Input/CommentInput.jsx";
import MessageList from "./MessgeList.jsx";
import {useParams} from "react-router-dom";
import UserContext from "../../../hooks/UserProvider.jsx";
import axios from "axios";
import {Card, Divider, lighten, useTheme} from "@mui/material";
import './global';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';





const ChatPage = () => {
    const {id} = useParams();
    const theme = useTheme();
    const query = new URLSearchParams(location.search);
    const moduleName = query.get('moduleName');
    const {user, jwtToken} = useContext(UserContext);
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [ws, setWs] = useState(null);
    const [replyWhom, setReplyWhom] = useState(null);
    const stompClientRef = useRef(null);

    useEffect(() => {
        fetchChannel();
    }, [])

    useEffect(() => {
        fetchMessages();
    }, [])

    useEffect(() => {
        if (!fetched && stompClientRef.current) {
            return
        }
        establishConnection();
    }, [fetched])


    const fetchChannel = () => {
        axios.get(`http://localhost:8222/api/chat-service/channels/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => {
            setChannel(response.data);
        }).catch(error => {
            console.error("Failed to fetch channel", error);
        });
    }


    const fetchMessages = () => {
        axios.get(`http://localhost:8222/api/chat-service/messages/${id}`,{
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => {
            setMessages(response.data);
            setFetched(true);
        }).catch(error => {
            console.error("Failed to fetch messages", error);
            setFetched(true);

        });
    }



    const establishConnection = () => {
        if (!stompClientRef.current) {
            let socket = new SockJS('http://localhost:8222/api/chat-service/ws');
            stompClientRef.current = Stomp.over(socket);
            connect();
        }
    };

    const onConnected = () => {
        console.log('Connected');
        stompClientRef.current.subscribe(`/topic/channel${id}`, (chat) => {
            const newMessage = JSON.parse(chat.body);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    };

    const onError = (error) => {
        console.error('Connection error: ', error);
    };

    const connect = () => {
        let headers = { 'Authorization': `Bearer ${jwtToken}` };
        stompClientRef.current.connect(headers, onConnected, onError);
    };

    const handleSendMessage = (content) => {
        const message = {
            type: 'CHAT',
            sender: user.username,
            senderId: user.id,
            message: content,
            channelId: id
        };
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.send(`/app/chat/${id}`, {}, JSON.stringify(message));
        } else {
            console.log("Not connected, cannot send message");
        }
    };


    useEffect(() => {
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect();
                console.log("Disconnected");
            }
        };
    }, []);



    return (
        <Box sx={{
            p: 3,
            borderRadius: '4px',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Typography variant="h5"  component="h2" sx={{mb: 2, color:"grey"}}>
                {channel?.topic}  from {moduleName}
            </Typography>
            <Card sx={{
                bgcolor: lighten(theme.palette.secondary.main, 0.97),
                boxShadow: "1.5px 1.5px 3px rgba(0,0,0,0.5)",
                borderRadius: "12px"}}>
                <MessageList
                    messages={messages}
                    channel={channel}
                />
                <Divider sx={{my: 2}}/>
                <Box sx={{p:2}}>
                    <CommentInput
                        username="You"
                        handleComment={handleSendMessage}
                        replyWhom={replyWhom}
                        setReplyWhom={setReplyWhom}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default ChatPage;
