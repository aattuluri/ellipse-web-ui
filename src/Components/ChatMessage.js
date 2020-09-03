import React, { useEffect } from 'react';

//Materail imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { ListItemAvatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Linkify from 'react-linkify';


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
    inline: {
        whiteSpace: 'pre-line',
    },
    date: {
        display: "flex",
        justifyContent: "flex-end",
    }

}));

function ChatMessage(props) {
    const classes = useStyles();
    const message = props.message;
    const [userType, setUserType] = React.useState('')
    const date = new Date(message.date);
    useEffect(() => {
        if (props.adminId === message.id) {
            setUserType('Admin')
        }
    }, [props.adminId, message.id])

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar style={{ display: 'none' }} ><InfoIcon></InfoIcon></ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography component="h6" variant="body2">
                            {message.user_name}
                        </Typography>

                        <Typography component="span" variant="body2" color="textSecondary">
                            {userType}
                        </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography component="span" variant="body1" color="textPrimary" className={classes.inline}>
                            <Linkify
                                componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a target="blank" style={{color:'red',fontWeight: 'bold'}} href={decoratedHref} key={key}>
                                        {decoratedText}
                                    </a>
                                )}
                            >{message.message}</Linkify>
                            {/* <Linkify properties={{ target: '_blank', style: { color: 'red', fontWeight: 'bold' } }}>{message.message}</Linkify> */}
                        </Typography>
                        <Box>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                                className={classes.date}
                            >
                                {"   " + date.toLocaleTimeString([], { timeStyle: 'short' })}
                            </Typography>
                        </Box>
                    </React.Fragment>}
            />
        </ListItem>
    );
}

export default ChatMessage;

