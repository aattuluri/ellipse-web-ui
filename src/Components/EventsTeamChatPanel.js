import React from 'react';
// import ChatMessage from '../Components/ChatMessage';
import AuthContext from '../AuthContext';
import ChatTextField from './ChatTextField';
import { cleanup } from '@testing-library/react';
import WebSocketContext from '../WebSocketContext';
import WebSocketDataContext from '../WebSocketDataContext';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { List} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import MessageBox1 from './MessageBox1';
import MessageBox2 from './MessageBox2';
import MessageBox3 from './MessageBox3';
import MessageBox4 from './MessageBox4';

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
    avatar: {
        backgroundColor: theme.palette.primary.main,
    }

}));

export default function JustifyContent(props) {

    const { children, value, url, index, ...other } = props;
    const { currentUser } = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const event = props.event;
    const open = props.open;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const registration = props.registration;

    const [reference, setReferenece] = React.useState(null);
    // const [currentReference,setCurrenmtReference] = React.useState(null);
    const [chatMessages, setChatMessages] = React.useState([]);
    // const [showOptions, setShowOptiona] = React.useState("");
    const classes = useStyles();
    var counterDate = null;
    const { webSocketContext } = React.useContext(WebSocketContext);

    const { teamChatMessages } = React.useContext(WebSocketDataContext);
    const { setTeamChatMessages } = React.useContext(WebSocketDataContext);

    const handleClose = () => {
        setDialogOpen(false);
    };

    React.useEffect(() => {
        if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
                action: "join_team_room",
                team_id: registration.team_id,
                msg: {
                    'user_id': currentUser.user_id,
                }
            }));
        }
    }, [currentUser, registration, webSocketContext])

    React.useEffect(() => {
        teamChatMessages.forEach(mes => {
            const cMes = mes.msg;
            //         // console.log(mes);
            if (mes.team_id === registration.team_id) {
                // console.log(cMes);
                setChatMessages(chatMessages => [...chatMessages, cMes]);
                setTeamChatMessages(teamChatMessages.filter(m => { return m !== mes }));
            }
        });
        // eslint-disable-next-line
    }, [teamChatMessages, registration])


    // if (webSocketContext) {
    //     // console.log("xyshs")
    //     webSocketContext.onmessage = (message) => {
    //         const mes = JSON.parse(message.data);
    //         const cMes = mes.msg;
    //         console.log(mes);
    //         if(mes.action !== "receive_team_status_status"){
    //             if (mes.team_id === registration.team_id) {
    //                 // console.log(cMes);
    //                 setChatMessages(chatMessages => [...chatMessages, cMes]);
    //             }
    //         }

    //     }
    // }

    React.useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_API_URL + `/api/chat/load_team_chat_messages?id=${registration.team_id}`, {
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
        // console.log(d.toISOString())
        if (webSocketContext) {
            webSocketContext.send(JSON.stringify({
                action: "send_team_message",
                team_id: registration.team_id,
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
                                if (messageDate.toDateString() !== counterDate) {
                                    counterDate = messageDate.toDateString();
                                    if (value.message_type === 'team_status_update_message') {
                                        return (
                                            <MessageBox3 message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox3>
                                        );
                                    }
                                    return (
                                        <MessageBox1 message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox1>
                                    );
                                }
                                if (value.message_type === 'team_status_update_message') {
                                    return (
                                        <MessageBox4 message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox4>
                                    )
                                }
                                return (
                                    <MessageBox2 message={value} currentDate={currentDate} messageDate={messageDate} index={index}></MessageBox2>
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