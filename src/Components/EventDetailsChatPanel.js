import React from 'react';
import ChatTextField from './ChatTextField';
import { cleanup } from '@testing-library/react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
// import { Divider, IconButton } from '@material-ui/core';
// import { TextField } from '@material-ui/core';

import WebSocketContext from '../WebSocketContext';
import WebSocketDataContext from '../WebSocketDataContext';
import AuthContext from '../AuthContext';

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
    // const user = props.user
    const token = localStorage.getItem('token');
    const event = props.event;
    const open = props.open;
    const [loading, setLoading] = React.useState(false);

    const [reference, setReferenece] = React.useState(null);
    // const [currentReference,setCurrenmtReference] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    const classes = useStyles();
    var counterDate = null;

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
                setLoading(false)
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
                        <div style={{ float: "left", clear: "both", paddingBottom: '80px', }}
                            ref={(el) => { setReferenece(el) }}>
                        </div>
                        
                    </Box>
                    <div className={classes.textField}>
                            <ChatTextField loading={loading} open={open} handleSend={handleSendClick}  ></ChatTextField>
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