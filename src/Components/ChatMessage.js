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

const useStyles = makeStyles((theme) => ({

    root: {
        position: 'fixed',
        width: '75%',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,

    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    
}));

function ChatMessage(props) {
    const token = localStorage.getItem('token');
    const user = React.useContext(AuthContext);
    const classes = useStyles();
    // const [AdminId, setAdminId] = React.useState(null);
    const message = props.message;
    const [name,setName] = React.useState('');
    const [image,setImage] = React.useState(null);
    const [userType,setUserType] = React.useState('Participant')
   console.log(props.adminId)
    useEffect(() => {
        if(props.adminId === message.id){
            setUserType('Admin')
        }
        fetch(`http://139.59.16.53:4000/api/users/getuser?id=${message.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                console.log(value);
                setName(value.name);
                setImage(value.image);
                // setEvent(value.event);
                // setChatMessages(value);
                // console.log(value);
            })
        })
    }, [])

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={name} src={image} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        {name}
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary">
                            {"("+userType+")"}
                        </Typography>
                    </React.Fragment>
                }
                secondary={"  "+message.message}

            />
        </ListItem>
    );
}

export default ChatMessage;

