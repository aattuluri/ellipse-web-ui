import React from 'react';
import Box from '@material-ui/core/Box';
import ChatMessage from '../Components/ChatMessage';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import AuthContext from '../AuthContext';
import ChatTextField from './ChatTextField';
import { Typography, List} from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import { cleanup } from '@testing-library/react';
// import InfoIcon from '@material-ui/icons/Info';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-start",
        // minWidth: "200px"
        // bgcolor:"background.paper"
        // backgroundColor: theme.palette.primary.dark,

    },
    root2: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        textDecorationColor: theme.palette.secondary.light,
        maxWidth: '65%',
        minWidth: '20%',
        overflow: 'auto',
        // textOverflow: "ellipsis"
    },
    root3: {
        display: "flex",
        justifyContent: "flex-end",
        minWidth: theme.spacing(30)
    },
    root6: {
        display: "flex",
        justifyContent: "center",

    },
    // stickyHeader: {
    //     position: "sticky",
    //     position: "-webkit-sticky",
    //     top: 0,
    // },

    topBar: {
        // display: 'fixed'
    },
    root4: {
        marginRight: theme.spacing(0.5)
    },
    root5: {
        marginLeft: theme.spacing(0.5),
        maxWidth: '65%',
        overflow: 'auto',
        //    textOverflow: "ellipsis"
    },
    // root7: {
    //     display: "flex",
    //     justifyContent: "center",
    //     // position: "sticky",
    //     position: "-webkit-sticky",
    //     top: 0,
    // },
    bottomBar: {
        position: 'absolute',
        // flexGrow: 1,
        // zIndex: '5',
        right: theme.spacing(4),
        bottom: theme.spacing(4),
        left: "200px",
        padding: theme.spacing(0, 3),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(5),
    }

}));

export default function JustifyContent(props) {
    const { children, value, url, index, ...other } = props;
    const user = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const event = props.event;
    const open = props.open;
    const [dialogOpen, setDialogOpen] = React.useState(false);


    const [reference, setReferenece] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const classes = useStyles();
    var counterDate = null;

    const handleClose = () => {
        setDialogOpen(false);
    };
    const [webSocket, setWebSocket] = React.useState(null);

    const webConnect = () => {
        const ws = new WebSocket("ws://139.59.16.53:4000/");
        ws.onopen = () => {
            console.log("connected")
            setWebSocket(ws);
            ws.onmessage = (message) => {
                const mes = JSON.parse(message.data);
                const cMes = mes.msg;
                if (mes.event_id === event._id) {
                    console.log(cMes);
                    setChatMessages(chatMessages => [...chatMessages, cMes]);
                }

            }
            if (reference != null) {
                reference.scrollIntoView({ behavior: "smooth" })
            }
        }
        ws.onclose = () => {
            check();
            console.log("closed");
        }
    }
    React.useEffect(() => {
        fetch(`http://139.59.16.53:4000/api/chat/load_messages?id=${event._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                setChatMessages(value);
                webConnect();
                if (reference != null) {
                    reference.scrollIntoView({ behavior: "smooth" })
                }
            })
        })
        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
        return () => {
            setChatMessages([]);
            cleanup()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event._id, token])



    React.useEffect(() => {
        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
        // eslint-disable-next-line
        return () => {
            cleanup()
        }
    }, [chatMessages,reference])





    const check = () => {
        if (!webSocket || webSocket.readyState === WebSocket.readyState) {
            console.log("checking");
            webConnect();
        }
    }




    const handleSendClick = (message) => {

        console.log("clicked")
        webSocket.send(JSON.stringify({
            action: "send_message",
            event_id: event._id,
            msg: {
                'id': user.user_id + Date.now(),
                'user_id': user.user_id,
                'user_name': user.name,
                'user_pic': user.profile_pic,
                'message': message,
                'date': Date.now()
            }
        }));
        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div >
                    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogOpen}>
                        <List>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ReplyIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Reply" />
                            </ListItem>
                            <ListItem autoFocus button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DeleteIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Delete" />
                            </ListItem>
                        </List>
                    </Dialog>

                    <Box className={classes.topBar}>
                        {
                            chatMessages.map((value, index) => {

                                const currentDate = new Date();
                                const messageDate = new Date(value.date);
                                if (messageDate.toDateString() !== counterDate) {
                                    counterDate = messageDate.toDateString();
                                    if (value.user_id === user.user_id) {
                                        return (<React.Fragment key={index}>

                                            <Box m={1} p={1} key={index} position="sticky" className={classes.root6}>
                                                <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
                                            </Box>

                                            <Box m={1} p={1} key={index+1} className={classes.root3}>

                                                <Box className={classes.root2} whiteSpace="normal" onClick={() => setDialogOpen(true)} >
                                                    <ChatMessage message={value} ></ChatMessage>
                                                </Box>
                                                <Box className={classes.root5}>
                                                    <Avatar alt={value.userName} src={`http:///139.59.16.53:4000/api/image?id=${value.user_pic}`} />
                                                </Box>
                                            </Box></React.Fragment>);

                                    }
                                    else {
                                        return (<React.Fragment>


                                            <Box m={1} p={1} key={index} className={classes.root6}>
                                                <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
                                            </Box>


                                            <Box m={1} key={index} className={classes.root}>
                                                <Box className={classes.root4}>
                                                    <Avatar alt={value.userName} src={`http:///139.59.16.53:4000/api/image?id=${value.user_pic}`} />
                                                </Box>
                                                <Box className={classes.root2} whiteSpace="normal" >
                                                    <ChatMessage message={value}></ChatMessage>
                                                </Box>
                                            </Box></React.Fragment>);
                                    }


                                }

                                if (value.user_id === user.user_id) {
                                    return (<Box m={1} p={1} key={index} className={classes.root3}>

                                        <Box className={classes.root2} onClick={() => setDialogOpen(true)} whiteSpace="normal">
                                            <ChatMessage message={value}></ChatMessage>
                                        </Box>
                                        <Box className={classes.root5}>
                                            <Avatar alt={value.userName} src={`http:///139.59.16.53:4000/api/image?id=${value.user_pic}`} />
                                        </Box>
                                    </Box>);

                                }
                                else {
                                    return (<Box m={1} key={index} className={classes.root}>
                                        <Box className={classes.root4}>
                                            <Avatar alt={value.userName} src={`http:///139.59.16.53:4000/api/image?id=${value.user_pic}`} />
                                        </Box>
                                        <Box className={classes.root2} whiteSpace="normal">
                                            <ChatMessage message={value}></ChatMessage>
                                        </Box>
                                    </Box>);
                                }

                            })
                        }
                        <div style={{ float: "left", clear: "both", paddingBottom: '60px', }}
                            ref={(el) => { setReferenece(el) }}>
                        </div>
                        <div>
                            <ChatTextField open={open} handleSend={handleSendClick}  ></ChatTextField>
                        </div>
                    </Box>

                </div>
            )}
        </div>
    );
}