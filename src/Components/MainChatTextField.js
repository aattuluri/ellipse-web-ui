import React from 'react';
// import clsx from 'clsx';

//Materail imports
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    bottomBar: {
        // position: 'absolute',
        // right: theme.spacing(4),
        // bottom: theme.spacing(4),
        // left: theme.spacing(4),
        padding: theme.spacing(0, 3),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(5),
        
    },

}));

export default function JustifyContent(props) {

    const classes = useStyles();
    const [sendButtonDisabled, setSendButtonDisabled] = React.useState(true);
    const [newmessage, setNewMessage] = React.useState(null);
    
    const handleNewMessage = (event) => {
        setNewMessage(event.target.value);
        setSendButtonDisabled(false);
        if (event.target.value === "") {
            setSendButtonDisabled(true);
        }
    }

    const handleSendClick = (e) => {

        props.handleSend(newmessage);
        setSendButtonDisabled(true);
        setNewMessage("");
    }

    const handleKeyPress = (e) => {
        // console.log(newmessage);
        if (newmessage.length > 1) {
            // console.log(newmessage.length);
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                props.handleSend(newmessage);
                setSendButtonDisabled(true);
                setNewMessage("");
            }
        }

    }




    return (
        <Box className={classes.bottomBar} display="flex"
            alignItems="center"
            justifyContent="center">

            <TextField
            disabled={props.loading}
                fullWidth
                placeholder="Type your message"
                multiline
                onChange={handleNewMessage}
                value={newmessage || ""}
                rowsMax="3"
                onKeyUp={handleKeyPress}>

            </TextField>
            <IconButton onClick={handleSendClick} disabled={sendButtonDisabled} className={classes.sendIcon}>
                <SendIcon></SendIcon>
            </IconButton>

        </Box>
    );
}