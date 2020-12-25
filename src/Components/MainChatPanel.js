import React from 'react';
// import ChatMessage from '../Components/ChatMessage';
import AuthContext from '../AuthContext';
import WebSocketContext from '../WebSocketContext';
import WebSocketDataContext from '../WebSocketDataContext';
import ChatTextField from './MainChatTextField';
import { cleanup } from '@testing-library/react';
import EventsContext from '../EventsContext';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import { IconButton, Typography } from '@material-ui/core';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Dialog from '@material-ui/core/Dialog';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import InfoIcon from '@material-ui/icons/Info';
import EventsDialog from '../Components/EventsDialog';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import { Divider, IconButton } from '@material-ui/core';
// import { TextField } from '@material-ui/core';


import MessageBox1 from './MessageBox1';
import MessageBox2 from './MessageBox2';
import MessageBox3 from './MessageBox3';
import MessageBox4 from './MessageBox4';
import MessageBox5 from './MessageBox5';
import MessageDeleteDialog from './MessageDeleteDialog';
import MessageReplyDialog from './MessageReplyDialog';


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
        height: '100%'
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
    textField: {
        textAlign: 'center',
        position: 'fixed',
        width: '75%',
        bottom: 0,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    header: {
        position: 'sticky',
        top: 64,
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(2),
        zIndex: 8,
        [theme.breakpoints.down('sm')]: {
            top: 104
        },
    }

}));

export default function JustifyContent(props) {
    const { children, value, url, index, ...other } = props;
    const { currentUser } = React.useContext(AuthContext);
    const { allEvents } = React.useContext(EventsContext);
    const [open, setOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    const user = props.user
    const token = localStorage.getItem('token');
    const event = props.event;
    const team = props.event;
    const [loading, setLoading] = React.useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openReplyDialog, setOpenReplyDialog] = React.useState(false);
    const [messageToBeDeleted, setMessageToBeDeleted] = React.useState({});
    const [messageToBeReplied, setMessagesToBeReplied] = React.useState({});

    const [reference, setReferenece] = React.useState(null);
    // const [currentReference,setCurrenmtReference] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const classes = useStyles();
    var counterDate = null;

    const { webSocketContext } = React.useContext(WebSocketContext);

    const { eventChatMessages } = React.useContext(WebSocketDataContext);
    const { setEventChatMessages } = React.useContext(WebSocketDataContext);

    const { teamChatMessages } = React.useContext(WebSocketDataContext);
    const { setTeamChatMessages } = React.useContext(WebSocketDataContext);

    const { deletedTeamChatMessages, setDeletedTeamChatMessages } = React.useContext(WebSocketDataContext);
    const { deletedEventChatMessages, setDeletedEventChatMessages } = React.useContext(WebSocketDataContext);


    React.useEffect(() => {

    }, [])

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        if (webSocketContext) {
            if (props.chatType === "event") {
                webSocketContext.send(JSON.stringify({
                    action: "join_event_room",
                    event_id: event._id,
                    msg: {
                        'user_id': currentUser.user_id,
                    }
                }));
            }
            else {
                webSocketContext.send(JSON.stringify({
                    action: "join_team_room",
                    team_id: event._id,
                    msg: {
                        'user_id': currentUser.user_id,
                    }
                }));
            }
        }
    }, [webSocketContext, currentUser, event, props])

    React.useEffect(() => {
        // console.log(eventChatMessages);
        if (props.chatType === "event") {
            eventChatMessages.forEach(mes => {
                const cMes = mes.msg;
                if (mes.event_id === event._id) {
                    setChatMessages(chatMessages => [...chatMessages, cMes]);
                    setEventChatMessages(eventChatMessages.filter(m => { return m !== mes }));
                }
            });
        }
        else {
            teamChatMessages.forEach(mes => {
                const cMes = mes.msg;
                if (mes.team_id === event._id) {
                    setChatMessages(chatMessages => [...chatMessages, cMes]);
                    setTeamChatMessages(teamChatMessages.filter(m => { return m !== mes }));
                }
            });
        }
        // eslint-disable-next-line
    }, [eventChatMessages, event, teamChatMessages])

    React.useEffect(() => {
        // console.log(eventChatMessages);
        if (props.chatType === "event") {
            deletedEventChatMessages.forEach(mes => {
                const cMes = mes.msg;
                if (mes.event_id === event._id) {
                    setChatMessages(chatMessages.filter(m => { return JSON.stringify(m) !== JSON.stringify(cMes) }));
                    setDeletedEventChatMessages(eventChatMessages.filter(m => { return m !== mes }));
                }
            })
        }
        else {
            deletedTeamChatMessages.forEach(mes => {
                const cMes = mes.msg;
                if (mes.team_id === event._id) {
                    setChatMessages(chatMessages.filter(m => { return JSON.stringify(m) !== JSON.stringify(cMes) }));
                    setDeletedTeamChatMessages(teamChatMessages.filter(m => { return m !== mes }));
                }
            })
        }
        // eslint-disable-next-line
    }, [deletedEventChatMessages, deletedTeamChatMessages])


    // if (webSocketContext) {
    //     webSocketContext.onmessage = (message) => {
    //         const mes = JSON.parse(message.data);
    //         const cMes = mes.msg;
    //         if (props.chatType === "event") {
    //             if (mes.event_id === event._id) {
    //                 setChatMessages(chatMessages => [...chatMessages, cMes]);
    //             }
    //         }
    //         else {
    //             if (mes.team_id === event._id) {
    //                 setChatMessages(chatMessages => [...chatMessages, cMes]);
    //             }
    //         }

    //     }
    // }


    React.useEffect(() => {
        // console.log(props.chatType);
        setLoading(true)
        if (props.chatType === "event") {
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
                    setLoading(false);
                    // webConnect();
                })
            })
        } else {
            fetch(process.env.REACT_APP_API_URL + `/api/chat/load_team_chat_messages?id=${event._id}`, {
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
                    setLoading(false);
                    // webConnect();
                })
            })
        }

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
        if (props.chatType === "event") {
            webSocketContext.send(JSON.stringify({
                action: "send_event_message",
                event_id: event._id,
                msg: {
                    'id': user.user_id + Date.now(),
                    'user_id': user.user_id,
                    'user_name': user.name,
                    'user_pic': user.profile_pic,
                    'message_type': 'normal_text_message',
                    'message': message,
                    'date': d.toISOString()
                }
            }));
        }
        else {
            webSocketContext.send(JSON.stringify({
                action: "send_team_message",
                team_id: event._id,
                msg: {
                    'id': user.user_id + Date.now(),
                    'user_id': user.user_id,
                    'user_name': user.name,
                    'user_pic': user.profile_pic,
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

    const handleMessageDeleteButton = (mes) => () => {
        // console.log(mes);
        setMessageToBeDeleted(mes);
        setOpenDeleteDialog(true);
    }

    const handleDeleteConfirmation = (mes) => () => {
        if (props.chatType === "event") {
            webSocketContext.send(JSON.stringify({
                action: "delete_event_chat_message",
                event_id: event._id,
                msg: mes
            }));
            setChatMessages(chatMessages.filter(m => { return m !== mes }))
        }
        else {
            webSocketContext.send(JSON.stringify({
                action: "delete_team_chat_message",
                team_id: event._id,
                msg: mes
            }));
            setChatMessages(chatMessages.filter(m => { return m !== mes }))
        }
        setOpenDeleteDialog(false);
    }

    const handleReplyButton = (mes) => () => {
        setMessagesToBeReplied(mes);
        setOpenReplyDialog(true);
    }

    const handleReplyConfirmation = (mes) => {
        const d = new Date();
        webSocketContext.send(JSON.stringify({
            action: "send_event_message",
            event_id: event._id,
            msg: {
                'id': user.user_id + Date.now(),
                'user_id': user.user_id,
                'user_name': user.name,
                'user_pic': user.profile_pic,
                'message_type': 'reply_text_message',
                'message': mes,
                'replied_to': messageToBeReplied.id,
                'date': d.toISOString()
            }
        }));
        setMessageToBeDeleted("");
        setOpenReplyDialog(false);
    }

    const handleInfoButton = (id) => () => {
        setSelectedEvent(allEvents.filter((e => { return e._id === id }))[0]);
        setOpen(true);
    }

    const handleBackButton = () => {
        props.openDialog(false)
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                    <div className={classes.header}>
                        <Box display="flex">
                            <Box >
                                { props.mobile && <IconButton style={{ marginTop: '0px', padding: '0px' }} onClick={handleBackButton}>
                                    <ArrowBackIosIcon></ArrowBackIosIcon>
                                </IconButton>}
                            </Box>
                            <Box flexGrow={1}>
                                <Typography>{props.chatType === "event" ? event.name : team.team_name}</Typography>
                            </Box>
                            <Box>
                                <IconButton style={{ marginTop: '0px', padding: '0px' }} onClick={handleInfoButton(props.chatType === "event" ? event._id : team.event_id)}>
                                    <InfoIcon></InfoIcon>
                                </IconButton>
                            </Box>
                        </Box>
                    </div>
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
                                    if (value.message_type === 'team_status_update_message') {
                                        return (
                                            <MessageBox3
                                                handleViewClick={handleInfoButton(props.chatType === "event" ? event._id : team.event_id)}
                                                message={value}
                                                currentDate={currentDate}
                                                handleReplyButton={handleReplyButton}
                                                handleMessageDeleteButton={handleMessageDeleteButton}
                                                messageDate={messageDate}
                                                index={index}></MessageBox3>
                                        );
                                    }
                                    else if (value.message_type === 'reply_text_message') {
                                        const repliedMessage = chatMessages.filter(m => { return m.id === value.replied_to })
                                        return (
                                            <MessageBox5
                                                divider={true}
                                                repliedMessage={repliedMessage}
                                                message={value}
                                                currentDate={currentDate}
                                                handleReplyButton={handleReplyButton}
                                                handleMessageDeleteButton={handleMessageDeleteButton}
                                                messageDate={messageDate}
                                                index={index}></MessageBox5>
                                        );
                                    }
                                    return (
                                        <MessageBox1
                                            adminId={props.chatType === "event" ? event.user_id : ""}
                                            message={value}
                                            handleReplyButton={handleReplyButton}
                                            handleMessageDeleteButton={handleMessageDeleteButton}
                                            currentDate={currentDate}
                                            messageDate={messageDate}
                                            index={index}></MessageBox1>
                                    );

                                }
                                if (value.message_type === 'team_status_update_message') {
                                    return (
                                        <MessageBox4
                                            handleViewClick={handleInfoButton(props.chatType === "event" ? event._id : team.event_id)}
                                            message={value}
                                            currentDate={currentDate}
                                            handleReplyButton={handleReplyButton}
                                            handleMessageDeleteButton={handleMessageDeleteButton}
                                            messageDate={messageDate}
                                            index={index}></MessageBox4>
                                    )
                                }
                                else if (value.message_type === 'reply_text_message') {
                                    const repliedMessage = chatMessages.filter(m => { return m.id === value.replied_to })
                                    return (
                                        <MessageBox5
                                            divider={false}
                                            repliedMessage={repliedMessage}
                                            message={value}
                                            currentDate={currentDate}
                                            handleReplyButton={handleReplyButton}
                                            handleMessageDeleteButton={handleMessageDeleteButton}
                                            messageDate={messageDate}
                                            index={index}></MessageBox5>
                                    );
                                }
                                return (
                                    <MessageBox2
                                        message={value}
                                        adminId={props.chatType === "event" ? event.user_id : ""}
                                        currentDate={currentDate}
                                        handleReplyButton={handleReplyButton}
                                        handleMessageDeleteButton={handleMessageDeleteButton}
                                        messageDate={messageDate}
                                        index={index}></MessageBox2>
                                );
                            })
                        }
                        <div style={{ float: "left", clear: "both", paddingBottom: '60px', }}
                            ref={(el) => { setReferenece(el) }}>
                        </div>

                    </Box>
                    <div className={classes.textField}>
                        <ChatTextField
                            loading={loading}
                            open={undefined}
                            handleSend={handleSendClick}  ></ChatTextField>
                    </div>
                    <MessageDeleteDialog
                        open={openDeleteDialog}
                        message={messageToBeDeleted}
                        setOpen={setOpenDeleteDialog}
                        handleDeleteConfirmation={handleDeleteConfirmation}>
                    </MessageDeleteDialog>

                    <MessageReplyDialog
                        open={openReplyDialog}
                        message={messageToBeReplied}
                        setOpen={setOpenReplyDialog}
                        handleReplyConfirmation={handleReplyConfirmation}></MessageReplyDialog>
                    {open && <EventsDialog
                        open={open}
                        event={selectedEvent}
                        handleClose={handleClose}
                        openTeams={props.chatType === 'event' ? false : true}
                    // handleReg={handleRegistrationButton}
                    ></EventsDialog>}
                </div>

            )}
        </div>
    );
}

// return (
//     <React.Fragment>
//         {/* <Divider></Divider> */}
//         <Box m={1} p={1} key={index} className={classes.root6}>
//             <Box flexGrow={1} marginTop={1}>
//                 <Divider></Divider>
//             </Box>
//             <Box>
//                 <Typography variant="body2">{currentDate.toDateString() === messageDate.toDateString() ? "Today" : messageDate.toDateString()}</Typography>
//             </Box>
//             <Box flexGrow={1} marginTop={1}>
//                 <Divider></Divider>
//             </Box>
//         </Box>
//         <Box m={1} p={1} key={index + 1} className={classes.root3}>
//             <Box className={classes.root5}>
//                 <Avatar variant="square" alt={value.userName} src={(value.user_pic !== null && value.user_pic !== "") && process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//             </Box>
//             <Box className={classes.root2} whiteSpace="normal">
//                 <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                     <Box flexGrow={1} className={classes.message}>
//                         <Box>
//                             <Typography variant="body1">{value.user_name + "   "}</Typography>
//                         </Box>
//                         <Box style={{ marginLeft: "7px" }}>
//                             <Typography component="span"
//                                 variant="body2"
//                                 style={{ fontSize: "0.9em" }}
//                                 color="textSecondary">
//                                 {"   " + date.toLocaleTimeString([], { timeStyle: 'short' })}
//                             </Typography>
//                         </Box>
//                     </Box>
//                     <Box>
//                         <IconButton style={{ padding: '0px', margin: '0px' }}>
//                             <ReplyIcon style={{ color: '#aaaaaa' }}></ReplyIcon>
//                         </IconButton>
//                         {user.user_id === value.user_id && <IconButton onClick={handleMessageDeleteButton(value)} style={{ padding: '0px', margin: '0px' }}>
//                             <DeleteIcon style={{ color: '#aaaaaa' }}></DeleteIcon>
//                         </IconButton>}
//                     </Box>
//                 </Box>

//                 <Box>
//                     <Typography variant="body2"
//                         style={{ fontSize: "1.2em" }}
//                         color="textSecondary">{value.message}</Typography>
//                 </Box>
//             </Box>
//         </Box>
//     </React.Fragment>
// );


// return (
//     <Box m={1} p={1} key={index + 1} className={classes.root3}>
//         <Box className={classes.root5}>
//             <Avatar variant="square" alt={value.userName} src={process.env.REACT_APP_API_URL + `/api/image?id=${value.user_pic}`} />
//         </Box>
//         <Box className={classes.root2} whiteSpace="normal">
//             <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                 <Box flexGrow={1} className={classes.message}>
//                     <Box>
//                         <Typography variant="body1">{value.user_name + "   "}</Typography>
//                     </Box>
//                     <Box style={{ marginLeft: "7px" }}>
//                         <Typography component="span"
//                             variant="body2"
//                             style={{ fontSize: "0.9em" }}
//                             color="textSecondary">
//                             {"   " + date.toLocaleTimeString([], { timeStyle: 'short' })}
//                         </Typography>
//                     </Box>
//                 </Box>
//                 <Box>
//                     <IconButton style={{ padding: '0px', margin: '0px' }}>
//                         <ReplyIcon style={{ color: '#aaaaaa' }}></ReplyIcon>
//                     </IconButton>
//                     {user.user_id === value.user_id && <IconButton onClick={handleMessageDeleteButton(value)} style={{ padding: '0px', margin: '0px' }}>
//                         <DeleteIcon style={{ color: '#aaaaaa' }}></DeleteIcon>
//                     </IconButton>}
//                 </Box>
//             </Box>
//             <Box whiteSpace="normal">
//                 <Typography className={classes.inline} variant="body2"
//                     style={{ fontSize: "1.2em" }}
//                     color="textSecondary">{value.message}</Typography>
//             </Box>
//         </Box>
//     </Box>
// );



// const webConnect = () => {
//     const ws = new WebSocket(process.env.REACT_APP_WESOCKET_URL);
//     ws.onopen = () => {
//         // console.log("connected")
//         setWebSocket(ws);
//         if (props.chatType === "event") {
//             ws.send(JSON.stringify({
//                 action: "join_event_room",
//                 event_id: event._id,
//                 msg: {
//                     'user_id': currentUser.user_id,
//                 }
//             }));
//         }
//         else {
//             ws.send(JSON.stringify({
//                 action: "join_team_room",
//                 team_id: event._id,
//                 msg: {
//                     'user_id': currentUser.user_id,
//                 }
//             }));
//         }

//         ws.onmessage = (message) => {
//             const mes = JSON.parse(message.data);
//             const cMes = mes.msg;
//             if (props.chatType === "event") {
//                 if (mes.event_id === event._id) {
//                     setChatMessages(chatMessages => [...chatMessages, cMes]);
//                 }
//             }
//             else {
//                 if (mes.team_id === event._id) {
//                     setChatMessages(chatMessages => [...chatMessages, cMes]);
//                 }
//             }

//         }
//         setLoading(false)
//     }
//     ws.onclose = () => {
//         check();
//         console.log("closed");
//     }
// }