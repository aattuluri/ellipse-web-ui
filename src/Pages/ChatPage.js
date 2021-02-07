import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import ChatPanel from '../Components/MainChatPanel';
import ChatContactsPanel from '../Pages/ChatContactsPanel';
import AuthContext from '../AuthContext';
// import MobileChatPanel from '../Components/MobileChatPanel';
// import { Typography, Paper } from '@material-ui/core';
// import socket from '../SocketClient';


const useStyles = makeStyles((theme) => ({
    root: {
        // height: '300px'
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        backgroundColor: theme.palette.primary.light

    },
    mobile: {
        backgroundColor: theme.palette.primary.light
    },
    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500],

    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ChatPage({ history }) {
    // const token = localStorage.getItem('token');
    const { currentUser } = React.useContext(AuthContext);
    const classes = useStyles();
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [adminId, setAdminId] = React.useState(null);
    const [checked, setChecked] = React.useState([0]);
    const [chatType, setChatType] = React.useState('');
    const [mobileChat, setMobileChat] = React.useState(false);


    return (
        <div>
            <div>
                {!mobileChat && <Grid container >
                    <Grid item xs={12} sm={12} md={3} lg={3}  >
                        <ChatContactsPanel mobile={false} chatType={chatType} openDialog={setMobileChat} setChatType={setChatType} checked={checked} setChecked={setChecked} setAdminId={setAdminId} setChatId={setSelectedChat}></ChatContactsPanel>
                    </Grid>
                    <Grid item xs={9} sm={12} md={9} lg={9}>
                        {selectedChat != null && <ChatPanel chatType={chatType} user={currentUser} adminId={adminId} event={selectedChat}></ChatPanel>}
                    </Grid>
                </Grid>}
                {mobileChat && <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.mobile}>
                            {selectedChat != null && <ChatPanel setSelectedChat={setSelectedChat} mobile={true} openDialog={setMobileChat} chatType={chatType} user={currentUser} adminId={adminId} event={selectedChat}></ChatPanel>}
                        </Paper>
                    </Grid>
                </Grid>
                }
            </div>
        </div>
    );
}

export default ChatPage;