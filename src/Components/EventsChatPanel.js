import React from 'react';
import Box from '@material-ui/core/Box';
import ChatMessage from '../Components/ChatMessage';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import AuthContext from '../AuthContext';
import ChatTextField from './ChatTextField';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-start",
        // bgcolor:"background.paper"
        // backgroundColor: theme.palette.primary.dark,

    },
    root2: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        textDecorationColor: theme.palette.secondary.light,
        maxWidth: '65%',
        overflow: 'auto',
        // textOverflow: "ellipsis"
    },
    root3: {
        display: "flex",
        justifyContent: "flex-end",
    },
    
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
    bottomBar: {
        position: 'absolute',
        // flexGrow: 1,
        // zIndex: '5',
        right: theme.spacing(4),
        bottom: theme.spacing(4),
        left: "200px",
        padding: theme.spacing(0,3),
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


    const [reference, setReferenece] = React.useState(null);
    const [chatMessages,setChatMessages] = React.useState([]);
    const classes = useStyles();

    // const [sendButtonDisabled, setSendButtonDisabled] = React.useState(true);
    const [webSocket, setWebSocket] = React.useState(null);
    // const chatMessages = props.chatMessages
    // const ws = new WebSocket("ws://localhost:4000/");
    const webConnect = () => {
        const ws = new WebSocket("ws://139.59.16.53:4000/");
        ws.onopen = () => {
            console.log("connected")
            setWebSocket(ws);
            // await ws.send(JSON.stringify({"hello":"hhh"}))
            // ws.send(JSON.stringify({join:props.chatId}));
            // setWebSocketOpen(true);
            ws.onmessage = (message) => {
                // console.log(message);
                const mes = JSON.parse(message.data);
                const cMes = mes.msg;
                // console.log(cMes);
                // console.log(mes.room);
                // console.log(props.chatId);
                if (mes.room === event._id) {
                    setChatMessages(chatMessages => [...chatMessages, cMes]);
                }

            }
        }
        ws.onclose = () => {
            check();
            console.log("closed");
        }
    }
    React.useEffect(() => {
        fetch(`http://139.59.16.53:4000/api/chat/getMessages?id=${event._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            response.json().then(value => {
                // setEvent(value.event);
                setChatMessages(value);
                webConnect();
                // console.log(value);
            })
        })
        return () =>{
            // webSocket.close();
            setChatMessages([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
       
    }, [event._id,token])



   

    const check = () => {
        if (!webSocket || webSocket.readyState === WebSocket.readyState) {
            console.log("checking");
            webConnect();
        }
    }


    if (reference != null) {
        reference.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendClick = (message) => {

        console.log("clicked")
        webSocket.send(JSON.stringify({
            room: event._id, msg: {
                'id': user.userid,
                'userName': user.name,
                'userPic': user.imageUrl,
                'message': message,
                'date': Date.now()
            }
        }));
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div >
                    {/* <Dialog open={true}> */}
                    {/* <DialogContent> */}
                    <Box className={classes.topBar}>
                        {
                            chatMessages.map((value, index) => {

                                if (value.id === user.userid) {
                                    return (<Box m={1} p={1} key={index} className={classes.root3}>

                                        <Box className={classes.root2} whiteSpace="normal">
                                            <ChatMessage message={value}></ChatMessage>
                                        </Box>
                                        <Box className={classes.root5}>
                                            <Avatar alt={value.userName} src={`http://139.59.16.53:4000/api/image?id=${value.userPic}`} />
                                        </Box>
                                    </Box>);

                                }
                                else {
                                    return (<Box m={1} key={index} className={classes.root}>
                                        <Box className={classes.root4}>
                                            <Avatar alt={value.userName} src={`http://139.59.16.53:4000/api/image?id=${value.userPic}`} />
                                        </Box>
                                        <Box className={classes.root2} whiteSpace="normal">
                                            <ChatMessage message={value}></ChatMessage>
                                        </Box>
                                    </Box>);
                                }

                            })
                        }
                        <div style={{ float: "left", clear: "both",paddingBottom:'60px',}}
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