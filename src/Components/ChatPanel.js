import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import socketIOClient from "socket.io-client";
// import socket from '../SocketClient';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import { Route } from 'react-router';
import ChatContactsPanel from '../Pages/ChatContactsPanel';
import { Paper, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import socket from '../SocketClient';
import AuthContext from '../AuthContext';
import ChatMessage from './ChatMessage';

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
    if (chatId != props.chatId) {
        socket.emit("initial_data");
        setChatId(props.chatId);
        socket.emit("joinroom",props.chatId);
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
    useEffect(() => {
        socket.on("message", data => {
            console.log(data);
            setChatMessages(chatMessages => [...chatMessages, data]);
        })
    }, [])


    function handleSendClick() {
        socket.emit('newmessage',props.chatId, {
            'message': newmessage,
            'id': user.userid,
            'date': Date.now()
        })
        setSendButtonDisabled(true);
        setNewMessage("");
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
                            const labelId = `checkbox-list-label-${value.id}`;

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

{/* <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {"Lalith Reddy "}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    (Admin)
                                            </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={value.message}
                                            
                                    />
                                </ListItem> */}