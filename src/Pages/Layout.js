import React from 'react';
import { Redirect, withRouter } from 'react-router';

//Material Imports
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Components impoprts
import NavigationBar from './NavigationBar';
import EventsContext from '../EventsContext';
import AuthContext from '../AuthContext';
import ActiveEventsContext from '../ActiveEventsContext';
import WebSocketContext from '../WebSocketContext';
// import dot from 'dote'
// import {detect}  from 'detect-browser';



// import OS from 'os';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        background: 'white',
        position: 'sticky',
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
}));

function Layout(props) {


    const token = localStorage.getItem('token');
    const classes = useStyles();
    const [allEvents, setAllEvents] = React.useState([]);
    const [activeEvents, setActiveEvents] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [authorized, setAuthorized] = React.useState(true);
    const [userDetailsDone, setUserDetailsDone] = React.useState(true);
    const [webSocketContext, setWebSocketContext] = React.useState(null);

    const value = { currentUser, setCurrentUser };
    const allEventsValue = { allEvents, setAllEvents };
    const activeEventsValue = { activeEvents, setActiveEvents };
    const webSocketValue = {webSocketContext, setWebSocketContext};

    const webConnect = () => {
        const ws = new WebSocket(process.env.REACT_APP_WESOCKET_URL);
        ws.onopen = () => {
            // console.log("connected");
            // console.log(ws);
            // // setWebSocket(ws);
            setWebSocketContext(ws);
        }
        ws.onclose = () => {

            check();
            // console.log("closed");
        }
    }

    const check = () => {
        if (!webSocketContext || webSocketContext.readyState === WebSocket.readyState) {
            // console.log("checking");
            webConnect();
        }
    }
    // console.log(OS.hostname());
    // const browser = detect();
    // console.log(browser)


    React.useEffect(() => {
        webConnect()
        fetch(process.env.REACT_APP_API_URL + '/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    // console.log(value);
                    if (value[0].verified === false) {
                        // setUserDetailsDone(false);
                        try {
                            var data2 = new FormData();
                            const payload2 = {
                                email: value[0].email
                            };
                            data2 = JSON.stringify(payload2)
                            fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemail', {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: data2
                            }).then((result) => {
                                // console.log(result);
                                result.json().then((res) => {
                                    if (res.message === "success") {
                                        setOpen(false);
                                        props.history.push("/otpverification")
                                    }
                                })

                            })
                        } catch (error) {

                        }

                    }
                    else if (value[0].college_name === null) {
                        setOpen(false);
                        props.history.push("/userinfo")
                    }
                    else {
                        setUserDetailsDone(true);
                        setCurrentUser(value[0]);
                    }


                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setAuthorized(false);
            }
        })
        fetch(process.env.REACT_APP_API_URL + '/api/events', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    // console.log(value)
                    value.sort((a, b) => {
                        return new Date(a.start_time) - new Date(b.start_time);
                    })
                    setAllEvents(value);
                    setActiveEvents(value.filter(e => {
                        const cDate = new Date();
                        const eDate = new Date(e.finish_time);
                        return cDate < eDate && e.status !== "pending"
                    }))
                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setAuthorized(false);
            }

        })
        // eslint-disable-next-line
    }, [token])
    // if(!currentUser.verified){

    // }
    if (!token) {
        return <Redirect to="/"></Redirect>
    }
    if (!authorized) {
        return <Redirect to="/"></Redirect>
    }
    if (!userDetailsDone) {
        if (currentUser.verified) {
            return <Redirect to="/userinfo"></Redirect>
        } else {
            // console.log("xyz")
            try {
                var data2 = new FormData();
                const payload2 = {
                    email: currentUser.email
                };
                data2 = JSON.stringify(payload2)
                fetch(process.env.REACT_APP_API_URL + '/api/users/sendverificationemail', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: data2
                }).then((result) => {
                    // console.log(result);
                    result.json().then((res) => {
                        if (res.message === "success") {
                            return <Redirect to="/otpverification"></Redirect>
                        }
                    })

                })
            } catch (error) {

            }

        }
    }


    return (
        <AuthContext.Provider value={value}>
            <WebSocketContext.Provider value={webSocketValue}>
                <EventsContext.Provider value={allEventsValue}>
                    <ActiveEventsContext.Provider value={activeEventsValue}>
                        {
                            currentUser != null && <div>
                                <Paper className={classes.root}>
                                    <NavigationBar></NavigationBar>
                                </Paper>
                                <div>
                                    {props.children}
                                </div>
                            </div>
                        }
                        {
                            currentUser == null && <Backdrop className={classes.backdrop} open={open}>
                                <CircularProgress color="inherit" />
                            </Backdrop>

                        }
                    </ActiveEventsContext.Provider>
                </EventsContext.Provider>
            </WebSocketContext.Provider>
        </AuthContext.Provider>


    );
}
export default withRouter(Layout);
