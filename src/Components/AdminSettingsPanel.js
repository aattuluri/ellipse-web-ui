import React from 'react';
import { Button, Typography, TextField, Divider, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import PeopleIcon from '@material-ui/icons/People';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import WebSocketContext from '../WebSocketContext';
// import AuthContext from '../AuthContext';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import ModeratorListItem from '../Components/ModeratorListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import AuthContext from '../AuthContext';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(0),
    },
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

function AdminSettingsPanel(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 6000,
    });
    const { children, value, url, index, ...other } = props;
    const token = localStorage.getItem('token');
    const event = props.event;
    const [loading, setLoading] = React.useState(false);
    // const [moderators, setModerators] = React.useState([]);
    const [allUsers, setAllUsers] = React.useState([]);
    const [selectedUser,setSelectedUser] = React.useState(null);
    const [selecteedBlockUser,setSelectedBlockUser] = React.useState(null);
    const [registeredUsers,setRegisteredUsers] = React.useState([]);

    // const { currentUser } = React.useContext(AuthContext);

    // const { webSocketContext } = React.useContext(WebSocketContext);
    const { vertical, horizontal, open, message, type, autoHide } = state;

    React.useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    function handleClose() {

        setState({ ...state, open: false });
    }

    const getData = () => {
        setLoading(true);
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_all_users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    // setTeams(value);
                    // console.log(value);
                    setAllUsers(value);
                    setLoading(false);
                })
            })
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_reg_users_for_blocking?id=${event._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    // setTeams(value);
                    // console.log(value);
                    // setAllUsers(value);
                    setRegisteredUsers(value);
                    setLoading(false);
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }


    const handleAddModeratorChange = (event,value) => {
        // console.log(value)
        setSelectedUser(value);
        
    }

    const handleAddButton = () => {
        setLoading(true);
        if(selectedUser === null || selectedUser === undefined){

        }
        else{
            try{
                var data = new FormData();
                const payload = {
                    event_id: event._id,
                    moderator_id: selectedUser.user_id
                }
                data = JSON.stringify(payload)
                fetch(process.env.REACT_APP_API_URL+"/api/event/add_moderator",{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: data
                }).then(response => {
                    setLoading(false);
                    if(response.status === 200){
                        response.json().then(value => {
                            setSelectedUser(null);
                            props.setEvent(value.event)
                        })
                    }
                })
            }
            catch (e){
                console.log(e)
            }
        }
    }

    const handleBlockUserChange = (e,value) => {
        setSelectedBlockUser(value);
    }

    const handleBlockUser = () => {
        setLoading(true);
        if(selecteedBlockUser=== null || selecteedBlockUser === undefined){

        }
        else{
            try{
                var data = new FormData();
                const payload = {
                    event_id: event._id,
                    blocked_user_id: selecteedBlockUser.user_id
                }
                data = JSON.stringify(payload)
                fetch(process.env.REACT_APP_API_URL+"/api/event/block_chat_for_user",{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: data
                }).then(response => {
                    setLoading(false);
                    if(response.status === 200){
                        response.json().then(value => {
                            setSelectedUser(null);
                            props.setEvent(value.event)
                        })
                    }
                    
                })
            }
            catch (e){
                console.log(e)
            }
        }
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={autoHide}
                        onClose={handleClose}
                        key={vertical + horizontal}
                    >
                        <Alert onClose={handleClose} severity={type}>{message}</Alert>
                    </Snackbar>
                    <div className={classes.progress}>
                        <Fade
                            in={loading}
                            unmountOnExit>
                            <CircularProgress />
                        </Fade>
                    </div>
                    
                    <div>
                        <Typography>Add Moderator</Typography>
                        <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                              options={allUsers}
                            //   value={selectedUser.name+","+selectedUser.username }
                              getOptionLabel={(option) => option.name+","+option.username}
                              onChange={handleAddModeratorChange}
                              autoComplete="off"
                            renderInput={(params) => <TextField fullWidth autoComplete="off" label="User Name" margin="dense" {...params} placeholder="Enter User Name" />}
                        />
                        <Button variant="contained" onClick={handleAddButton} disabled={loading} style={{margin:"10px",borderRadius:"15px"}}>Add</Button>
                    </div>
                    <Typography style={{marginTop: "20px"}}>Moderators</Typography>
                    <div>
                    {
                        event.moderators.map((m_id,index)=>{
                            return <ModeratorListItem event = {props.event} type="moderator" setEvent={props.setEvent} user_id={m_id}></ModeratorListItem>
                        })
                    }
                    </div>
                    <Divider style={{margin:"30px 10px",height:"5px"}}></Divider>
                    <div>
                        <Typography>Block User from Chat</Typography>
                        <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                              options={registeredUsers}
                            //   value={selectedUser.name+","+selectedUser.username }
                              getOptionLabel={(option) => option.name+","+option.username}
                              onChange={handleBlockUserChange}
                              autoComplete="off"
                            renderInput={(params) => <TextField fullWidth autoComplete="off" label="User Name" margin="dense" {...params} placeholder="Enter User Name" />}
                        />
                        <Button variant="contained" onClick={handleBlockUser} disabled={loading} style={{margin:"10px",borderRadius:"15px"}}>Block</Button>
                    </div>
                    <Typography style={{marginTop: "20px"}}>Blocked Users</Typography>
                    <div>
                    {
                        event.chat_blocked_users.map((m_id,index)=>{
                            return <ModeratorListItem event = {props.event} type="blocked_user" setEvent={props.setEvent} user_id={m_id}></ModeratorListItem>
                        })
                    }
                    </div>
                    <Typography style={{margin:"10px 0px"}}>Any Queries contact us at support@ellipseapp.com</Typography>
                </div>
            )}
        </div>
    );
}

export default AdminSettingsPanel;