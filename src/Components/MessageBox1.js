import React from 'react';

//Materail imports
import { makeStyles } from '@material-ui/core/styles';
import Linkify from 'react-linkify';

import { Typography, Divider, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import Avatar from '@material-ui/core/Avatar';

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
    inline: {
        whiteSpace: 'pre-line',
    },
    date: {
        display: "flex",
        justifyContent: "flex-end",
    },
    root3: {
        display: "flex",
        justifyContent: "flex-start",
        '&:hover': {
            background: "rgb(0, 189, 170,0.3)",
        },
        // minWidth: theme.spacing(30)
    },
    root6: {
        display: "flex",
        justifyContent: "center",

    },
    root5: {
        marginLeft: theme.spacing(0),
        maxWidth: '65%',
        // overflow: 'auto',
        //    textOverflow: "ellipsis"
    },
    message: {
        display: "flex",
        justifyContent: "flex-start",
    },
    root2: {
        // backgroundColor: theme.palette.background.paper,
        // borderRadius: theme.spacing(1),
        textDecorationColor: theme.palette.secondary.light,
        width: '95%',
        // minWidth: '20%',
        overflow: 'auto',
        marginLeft: theme.spacing(1)
        // textOverflow: "ellipsis"
    },

}));

function ChatMessage(props) {
    const classes = useStyles();
    const message = props.message;
    const [userType, setUserType] = React.useState('')
    const date = new Date(message.date);
    const { currentUser } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (props.adminId === message.user_id) {
            setUserType(' (Admin)')
        }
    }, [props.adminId, message])

    return (
        <React.Fragment>
            <Box display="flex">
                <Box flexGrow={1} paddingTop={1}>
                    <Divider></Divider>
                </Box>
                <Typography variant="body2">{props.currentDate.toDateString() === props.messageDate.toDateString() ? "Today" : props.messageDate.toDateString()}</Typography>
                <Box flexGrow={1} paddingTop={1}>
                    <Divider></Divider>
                </Box>

            </Box>

            
            <Box m={1} p={1} key={props.index + 1} className={classes.root3}>
                <Box className={classes.root5}>
                    <Avatar alt={message.userName} src={message.user_pic && process.env.REACT_APP_API_URL + `/api/image?id=${message.user_pic}`} />
                </Box>
                <Box className={classes.root2} whiteSpace="normal">
                    <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Box flexGrow={1} className={classes.message}>
                            <Box>
                                <Typography variant="body1">{message.user_name + "   "+userType}</Typography>
                            </Box>
                            <Box style={{ marginLeft: "7px" }}>
                                <Typography component="span"
                                    variant="body2"
                                    style={{ fontSize: "0.9em" }}
                                    color="textSecondary">
                                    {"   " + date.toLocaleTimeString([], { timeStyle: 'short' })}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton style={{ padding: '0px', margin: '0px' }}>
                                <ReplyIcon style={{ color: '#aaaaaa' }}></ReplyIcon>
                            </IconButton>
                            {currentUser.user_id === message.user_id && <IconButton onClick={props.handleMessageDeleteButton(message)} style={{ padding: '0px', margin: '0px' }}>
                                <DeleteIcon style={{ color: '#aaaaaa' }}></DeleteIcon>
                            </IconButton>}
                        </Box>
                    </Box>

                    <Box>
                        <Typography component="span" variant="body2" color="textSecondary" className={classes.inline}>
                            <Linkify
                                componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a target="blank" style={{ color: 'red', fontWeight: 'bold' }} href={decoratedHref} key={key}>
                                        {decoratedText}
                                    </a>
                                )}
                            >{message.message}</Linkify>
                            {/* <Linkify properties={{ target: '_blank', style: { color: 'red', fontWeight: 'bold' } }}>{message.message}</Linkify> */}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ChatMessage;

