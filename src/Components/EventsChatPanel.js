import React from 'react';
import Box from '@material-ui/core/Box';
import ChatMessage from '../Components/ChatMessage';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AuthContext from '../AuthContext';



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
    bottomBar: {
        // position: 'absolute',
        width: '75%',
        height: '60px',
        bottom: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main
    },
    topBar: {

        height: "30%"
    },
    root4:{
        marginRight: theme.spacing(0.5)
    },
    root5: {
       marginLeft: theme.spacing(0.5),
       maxWidth: '65%',
       overflow: 'auto',
    //    textOverflow: "ellipsis"
    }

}));

export default function JustifyContent(props) {
    const { children, value, url, index, ...other } = props;
    const user = React.useContext(AuthContext);
    const token = localStorage.getItem('token');
    const event = props.event;
    // const [chatMessages, setChatMessages] = React.useState([]);
    const [newmessage, setNewMessage] = React.useState(null);
    const [sendButtonDisabled, setSendButtonDisabled] = React.useState(true);
    const [reference,setReferenece] = React.useState(null);
    const classes = useStyles();
    const chatMessages = props.messages;
    // const ws = new WebSocket("ws://localhost:4000/");
    React.useEffect(()=>{
        if(reference != null){
            reference.scrollIntoView({ behavior: "smooth" })
        }
        
    },[reference,chatMessages])

    // if(reference != null){
    //     reference.scrollIntoView({ behavior: "smooth" })
    // }





    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div style={{ width: '100%' }}>
                    <Box className={classes.topBar}>
                        {
                            chatMessages.map((value, index) => {
                                
                                if (value.id === user.userid) {
                                    return (<Box m={1} p={1} className={classes.root3}>
                                        
                                        <Box className={classes.root2} whiteSpace="normal">
                                            <ChatMessage message={value}></ChatMessage>
                                        </Box>
                                        <Box className={classes.root5}>
                                            <Avatar alt={value.userName} src={`http://139.59.16.53:4000/api/image?id=${value.userPic}`} />
                                        </Box>
                                    </Box>);

                                }
                                else {
                                    return (<Box m={1} className={classes.root}>
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
                        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { setReferenece(el) }}>
        </div>
                    </Box>



                </div>
            )}
        </div>
    );
}