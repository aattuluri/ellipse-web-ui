import React from 'react';
// import ChatMessage from '../Components/ChatMessage';
import AuthContext from '../AuthContext';
import ChatTextField from './ChatTextField';
import WebSocketContext from '../WebSocketContext';
import WebSocketDataContext from '../WebSocketDataContext';
import { cleanup } from '@testing-library/react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import { List } from '@material-ui/core';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Dialog from '@material-ui/core/Dialog';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import MessageBox1 from './MessageBox1';
import MessageBox2 from './MessageBox2';
import MessageDeleteDialog from './MessageDeleteDialog';





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
    const [loading, setLoading] = React.useState(false);

    const [reference, setReferenece] = React.useState(null);
    // const [currentReference,setCurrenmtReference] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    // const [showOptions, setShowOptiona] = React.useState("");
    const classes = useStyles();
    var counterDate = null;
    // const [webSocket, setWebSocket] = React.useState(null);
    const { webSocketContext } = React.useContext(WebSocketContext);

    const { eventChatMessages } = React.useContext(WebSocketDataContext);
    const { setEventChatMessages } = React.useContext(WebSocketDataContext);

    const { deletedEventChatMessages, setDeletedEventChatMessages } = React.useContext(WebSocketDataContext);

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [messageToBeDeleted, setMessageToBeDeleted] = React.useState({});

    React.useEffect(() => {
        if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
                action: "join_event_room",
                event_id: event._id,
                msg: {
                    'user_id': currentUser.user_id,
                }
            }));
        }
    }, [webSocketContext, currentUser, event])

    React.useEffect(() => {
        // console.log(eventChatMessages);
        eventChatMessages.forEach(mes => {
            const cMes = mes.msg;
            //         // console.log(mes);
            if (mes.event_id === event._id) {
                // console.log(cMes);
                setChatMessages(chatMessages => [...chatMessages, cMes]);
                setEventChatMessages(eventChatMessages.filter(m => { return m !== mes }));
            }
        });
        // eslint-disable-next-line
    }, [eventChatMessages, event])

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
                // webConnect();
                setLoading(false);
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


    const handleSendClick = (message) => {

        const d = new Date();
        // console.log(d.toISOString())
        if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
                action: "send_event_message",
                event_id: event._id,
                msg: {
                    'id': currentUser.user_id + Date.now(),
                    'user_id': currentUser.user_id,
                    'user_name': currentUser.name,
                    'user_pic': currentUser.profile_pic,
                    'message_type': 'normal_text_message',
                    'message': message,
                    'date': d.toISOString()
                }
            }));
        }

        if (reference != null) {
            reference.scrollIntoView({ behavior: "smooth" })
        }
    }

    React.useEffect(() => {
        deletedEventChatMessages.forEach(mes => {
            const cMes = mes.msg;
            if (mes.event_id === event._id) {
                setChatMessages(chatMessages.filter(m => { return JSON.stringify(m) !== JSON.stringify(cMes) }));
                setDeletedEventChatMessages(eventChatMessages.filter(m => { return m !== mes }));
            }
        })

        // eslint-disable-next-line
    }, [deletedEventChatMessages])

    const handleMessageDeleteButton = (mes) => () => {
        // console.log(mes);
        setMessageToBeDeleted(mes);
        setOpenDeleteDialog(true);
    }

    const handleDeleteConfirmation = (mes) => () => {
        webSocketContext.send(JSON.stringify({
            action: "delete_event_chat_message",
            event_id: event._id,
            msg: mes
        }));
        setChatMessages(chatMessages.filter(m => { return m !== mes }))

        setOpenDeleteDialog(false);
    }

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

                    <Box className={classes.topBar}>
                        {
                            chatMessages.map((value, index) => {
                                const currentDate = new Date();
                                const messageDate = new Date(value.date);
                                if (messageDate.toDateString() !== counterDate) {
                                    counterDate = messageDate.toDateString();
                                    return (
                                        <MessageBox1 adminId={event.user_id} handleMessageDeleteButton={handleMessageDeleteButton} message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox1>
                                    );
                                }
                                return (
                                    <MessageBox2 adminId={event.user_id} handleMessageDeleteButton={handleMessageDeleteButton} message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox2>
                                );
                            })
                        }
                        <div>
                            <ChatTextField loading={loading} open={open} handleSend={handleSendClick}  ></ChatTextField>
                        </div>
                    </Box>
                    <div style={{ float: "left", clear: "both", marginBottom: '60px', }}
                        ref={(el) => { setReferenece(el) }}>
                    </div>
                    <MessageDeleteDialog
                        open={openDeleteDialog}
                        message={messageToBeDeleted}
                        setOpen={setOpenDeleteDialog}
                        handleDeleteConfirmation={handleDeleteConfirmation}>
                    </MessageDeleteDialog>
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


// const webConnect = () => {
    //     const ws = new WebSocket(process.env.REACT_APP_WESOCKET_URL);
    //     ws.onopen = () => {
    //         // console.log("connected")
    //         setWebSocket(ws);
    //         ws.send(JSON.stringify({
    //             action: "join_event_room",
    //             event_id: event._id,
    //             msg: {
    //                 'user_id': currentUser.user_id,
    //             }
    //         }));
    //         ws.onmessage = (message) => {
    //             const mes = JSON.parse(message.data);
    //             const cMes = mes.msg;
    //             // console.log(mes);
    //             if (mes.event_id === event._id) {
    //                 // console.log(cMes);
    //                 setChatMessages(chatMessages => [...chatMessages, cMes]);
    //             }
    //         }
    //         setLoading(false)
    //     }
    //     ws.onclose = () => {

    //         check();
    //         // console.log("closed");
    //     }
    // }

       // const check = () => {
    //     if (!webSocket || webSocket.readyState === WebSocket.readyState) {
    //         // console.log("checking");
    //         webConnect();
    //     }
    // }