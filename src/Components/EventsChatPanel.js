import React from 'react';
// import ChatMessage from '../Components/ChatMessage';
import AuthContext from '../AuthContext';
import ChatTextField from './ChatTextField';
import { cleanup } from '@testing-library/react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography, List, Divider, IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';


// import socketIOClient from "socket.io-client";
// const socket = socketIOClient("https://staging.ellipseapp.com",{
//     path: '/ws',
//     // transports: ['websocket']
// });





const useStyles = makeStyles((theme) => ({
    root: {
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
    // stickyHeader: {
    //     position: "sticky",
    //     position: "-webkit-sticky",
    //     top: 0,
    // },

    topBar: {
        // display: 'fixed'
    },
    root4: {
        marginRight: theme.spacing(0)
    },
    root5: {
        marginLeft: theme.spacing(0),
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
    },
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    message: {
        display: "flex",
        justifyContent: "flex-start",
    },
    message2: {
        display: "none",
        // justifyContent: "flex-end",
    },
    message3: {
        display: "flex",
        justifyContent: "flex-end",
    },
    inline: {
        whiteSpace: 'pre-line',
    },

}));

export default function JustifyContent(props) {

    const { children, value, url, index, ...other } = props;
    const { currentUser } = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const event = props.event;
    const open = props.open;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [reference, setReferenece] = React.useState(null);
    // const [currentReference,setCurrenmtReference] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    // const [showOptions, setShowOptiona] = React.useState("");
    const classes = useStyles();
    var counterDate = null;

    const handleClose = () => {
        setDialogOpen(false);
    };
    const [webSocket, setWebSocket] = React.useState(null);


    const webConnect = () => {
        const ws = new WebSocket(process.env.REACT_APP_WESOCKET_URL);
        ws.onopen = () => {
            // console.log("connected")
            setWebSocket(ws);
            ws.send(JSON.stringify({
                action: "join_event_room",
                event_id: event._id,
                msg: {
                    'user_id': currentUser.user_id,
                }
            }));
            ws.onmessage = (message) => {
                const mes = JSON.parse(message.data);
                const cMes = mes.msg;
                // console.log(mes);
                if (mes.event_id === event._id) {
                    // console.log(cMes);
                    setChatMessages(chatMessages => [...chatMessages, cMes]);
                }
            }
            setLoading(false)
        }
        ws.onclose = () => {

            check();
            // console.log("closed");
        }
    }
    React.useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_API_URL + `/api/chat/load_messages?id=${event._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                // console.log(value);
                setChatMessages(value);
                webConnect();
                // setLoading(false)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])


    React.useEffect(() => {
        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
        // eslint-disable-next-line
        return () => {
            cleanup()
        }
    }, [chatMessages, reference])


    const check = () => {
        if (!webSocket || webSocket.readyState === WebSocket.readyState) {
            // console.log("checking");
            webConnect();
        }
    }




    const handleSendClick = (message) => {

        const d = new Date();
        // console.log(d.toISOString())
        webSocket.send(JSON.stringify({
            action: "send_message",
            event_id: event._id,
            msg: {
                'id': currentUser.user_id + Date.now(),
                'user_id': currentUser.user_id,
                'user_name': currentUser.name,
                'user_pic': currentUser.profile_pic,
                'message': message,
                'date': d.toISOString()
            }
        }));
        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
    }

    // const showHoverOptions = (id) => () => {
    //     setShowOptiona(id);
    // }

    // const hideHoverOptions = () => {
    //     setShowOptiona('');
    // }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                    <div className={classes.progress}>
                        <Fade
                            in={loading}
                            unmountOnExit>
                            <CircularProgress />
                        </Fade>
                    </div>

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
                                const date = new Date(value.date);
                                if (messageDate.toDateString() !== counterDate) {
                                    counterDate = messageDate.toDateString();
                                    return (
                                        <React.Fragment>
                                            <Divider></Divider>
                                            <Box m={1} p={1} key={index} position="sticky" className={classes.root6}>
                                                <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
                                            </Box>
                                            <Box m={1} p={1} key={index + 1} className={classes.root3}>
                                                <Box className={classes.root5}>
                                                    <Avatar variant="square" alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
                                                </Box>
                                                <Box className={classes.root2} whiteSpace="normal">
                                                    <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                        <Box flexGrow={1} className={classes.message}>
                                                            <Box>
                                                                <Typography variant="body1">{value.user_name + "   "}</Typography>
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
                                                    <IconButton style={{padding:'0px',margin:'0px'}}>
                                                        <ReplyIcon style={{ color: '#aaaaaa' }}></ReplyIcon>
                                                    </IconButton>
                                                    {currentUser.user_id === value.user_id && <IconButton style={{padding:'0px',margin:'0px'}}>
                                                        <DeleteIcon style={{ color: '#aaaaaa' }}></DeleteIcon>
                                                    </IconButton>}
                                                </Box>
                                                    </Box>

                                                    <Box>
                                                        <Typography variant="body2"
                                                            style={{ fontSize: "1.2em" }}
                                                            color="textSecondary">{value.message}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </React.Fragment>
                                    );
                                }
                                return (
                                    <Box m={1} p={1} key={index + 1} className={classes.root3}>
                                        <Box className={classes.root5}>
                                            <Avatar variant="square" alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
                                        </Box>
                                        <Box className={classes.root2} whiteSpace="normal">
                                            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <Box flexGrow={1} className={classes.message}>
                                                    <Box>
                                                        <Typography variant="body1">{value.user_name + "   "}</Typography>
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
                                                    <IconButton style={{padding:'0px',margin:'0px'}}>
                                                        <ReplyIcon style={{ color: '#aaaaaa' }}></ReplyIcon>
                                                    </IconButton>
                                                    {currentUser.user_id === value.user_id && <IconButton style={{padding:'0px',margin:'0px'}}>
                                                        <DeleteIcon style={{ color: '#aaaaaa' }}></DeleteIcon>
                                                    </IconButton>}
                                                </Box>
                                            </Box>
                                            <Box whiteSpace="normal">
                                                <Typography className={classes.inline} variant="body2"
                                                    style={{ fontSize: "1.2em" }}
                                                    color="textSecondary">{value.message}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );

                            })
                        }
                        <div style={{ float: "left", clear: "both", paddingBottom: '60px', }}
                            ref={(el) => { setReferenece(el) }}>
                        </div>
                        <div>
                            <ChatTextField loading={loading} open={open} handleSend={handleSendClick}  ></ChatTextField>
                        </div>
                    </Box>

                </div>
            )}
        </div>
    );
}


// if (messageDate.toDateString() !== counterDate) {
//     counterDate = messageDate.toDateString();
//     if (value.user_id === currentUser.user_id) {
//         return (<React.Fragment key={index}>

//             <Box m={1} p={1} key={index} position="sticky" className={classes.root6}>
//                 <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
//             </Box>

//             <Box m={1} p={1} key={index + 1} className={classes.root3}>

//                 <Box className={classes.root2} whiteSpace="normal" onClick={() => setDialogOpen(false)} >
//                     <ChatMessage adminId={event.user_id} message={value} ></ChatMessage>
//                 </Box>
//                 <Box className={classes.root5}>
//                     <Avatar alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//                 </Box>
//             </Box></React.Fragment>);

//     }
//     else {
//         return (<React.Fragment>


//             <Box m={1} p={1} key={index} className={classes.root6}>
//                 <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
//             </Box>


//             <Box m={1} key={index} className={classes.root}>
//                 <Box className={classes.root4}>
//                     <Avatar alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//                 </Box>
//                 <Box className={classes.root2} whiteSpace="normal" >
//                     <ChatMessage adminId={event.user_id} message={value}></ChatMessage>
//                 </Box>
//             </Box></React.Fragment>);
//     }


// }

// if (value.user_id === currentUser.user_id) {
//     return (<Box m={1} p={1} key={index} className={classes.root3}>

//         <Box className={classes.root2} onClick={() => setDialogOpen(false)} whiteSpace="normal">
//             <ChatMessage adminId={event.user_id} message={value}></ChatMessage>
//         </Box>
//         <Box className={classes.root5}>
//             <Avatar alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//         </Box>
//     </Box>);

// }
// else {
//     return (<Box m={1} key={index} className={classes.root}>
//         <Box className={classes.root4}>
//             <Avatar alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//         </Box>
//         <Box className={classes.root2} whiteSpace="normal">
//             <ChatMessage adminId={event.user_id} message={value}></ChatMessage>
//         </Box>
//     </Box>);
// }