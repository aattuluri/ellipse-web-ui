import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

// import socketIOClient from "socket.io-client";

import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
// import socket from '../SocketClient';
import AuthContext from '../AuthContext';
import ChatMessage from './ChatMessage';
// import ws from '../SocketClient';

const useStyles = makeStyles((theme) => ({

    root: {
        position: 'fixed',
        width: '75%',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,

    },
    topBar: {
        position: 'relative',
        width: '100%',
        height: '60px',
        backgroundColor: theme.palette.secondary.main
    },
    middle: {
        position: 'fixed',
        maxHeight: '79vh',
        marginBottom: '80px',
        paddingBottom: '80px',
        WebkitOverflowScrolling: 'touch'
        
    },
    bottomBar: {
        position: 'fixed',
        width: '75%',
        height: '60px',
        bottom: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main
    },
    root2: {
        position: 'relative',
        overflow: 'auto',
        height: '100%',
        marginBottom: '120px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginBottom: '180px'
        },
    },
    field: {
        marginLeft: theme.spacing(4)
    },
    sendIcon: {
        marginRight: theme.spacing(4)
    }
}));

function ChatPanel(props) {
    const token = localStorage.getItem('token');
    const user = React.useContext(AuthContext);
    const classes = useStyles();
    const [chatId, setChatId] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [newmessage, setNewMessage] = React.useState(null);
    const [sendButtonDisabled,setSendButtonDisabled] = React.useState(true);
    // const [webSocketOpen,setWebSocketOpen] = React.useState(false);
    const ws = new WebSocket("ws://139.59.16.53:4000/");
    React.useEffect(() => {
        console.log("sjsk")
        ws.onopen = async  () =>{
            console.log("connected")
            // await ws.send(JSON.stringify({"hello":"hhh"}))
            ws.send(JSON.stringify({join:props.chatId}));
            // setWebSocketOpen(true);
            ws.onmessage= (message) =>{
                console.log(message);
                const mes = JSON.parse(message.data);
                const cMes = mes.msg;
                console.log(cMes);
                console.log(mes.room);
                console.log(props.chatId);
                if(mes.room === props.chatId){
                    setChatMessages(chatMessages => [...chatMessages,cMes]);
                }
                
            }
        }
        
    },[props.chatId,ws])
    
    if (chatId !== props.chatId) {
       
        setChatMessages([]);
        setChatId(props.chatId);
       
        
        // socket.send("initial_data",("hi"))
        // socket.emit("initial_data");
        
        // socket.emit("joinroom",props.chatId);
        fetch(`http://139.59.16.53:4000/api/chat/getMessages?id=${props.chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                // setEvent(value.event);
                setChatMessages(value);
                // console.log(value);
            })
        })
    }
// }
    useEffect(() => {
        // socket.on("message", data => {
        //     console.log(data);
        //     setChatMessages(chatMessages => [...chatMessages, data]);
        // })
    }, [])


    function handleSendClick() {
        ws.send(JSON.stringify({room:props.chatId,msg:{
            'id': user.userid,
            'userName': user.name,
            'userPic': user.imageUrl,
            'message': newmessage,
            'date': Date.now()
        }}));
        // socket.emit('newmessage',props.chatId, {
            // 'message': newmessage,
            // 'id': user.userid,
            // 'date': Date.now()
        // })
        // setSendButtonDisabled(true);
        // setNewMessage("");
    }
    function handleNewMessage(event, value) {
        console.log(event.target.value);
        setSendButtonDisabled(false);
        setNewMessage(event.target.value);
    }
    return (
        <div className={classes.root}>
            <Box display="flex" flexDirection="column" height="100%" bgcolor="background.main">
                <Box className={classes.topBar}>
                        {/* Hello */}
                </Box>
                {/* <Box p={1} m={1} className={classes.middle}> */}
                    <List className={classes.root2}>
                        {chatMessages.map((value) => {
                            

                            return (
                                <ChatMessage adminId={props.adminId} message = {value}></ChatMessage>  
                            );
                        })}
                    </List>
                {/* </Box> */}
                <Box className={classes.bottomBar} display="flex"
                    alignItems="center"
                    justifyContent="center">
                    {/* <div className={classes.field}> */}
                        <TextField
                            className={classes.field}
                            fullWidth
                            placeholder="Type your message"
                            //    variant='filled'
                            autoComplete='off'
                            required
                            id="shortdesc"
                            name="shortdesc"
                            multiline
                            rows="1"
                            value={newmessage}
                            onChange={handleNewMessage}

                        />
                    {/* </div> */}
                    <IconButton onClick={handleSendClick} disabled={sendButtonDisabled} className={classes.sendIcon}>
                        <SendIcon></SendIcon>
                    </IconButton>
                </Box>
            </Box>
        </div>
    );
}

export default ChatPanel;

