import React from 'react';
import NavigationBar from './NavigationBar';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventsContext from '../EventsContext';
import AuthContext from '../AuthContext';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import RegEventsContext from '../RegEventsContext';
import { Redirect } from 'react-router';
// import Button from '@material-ui/core/Button';


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
    const [currentUser, setCurrentUser] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [authorized, setAuthorized] = React.useState(true);
    const [userDetailsDone, setUserDetailsDone] = React.useState(true);
    // const [registeredEvents, setRegisteredEvents] = React.useState([]);


    React.useEffect(() => {
        fetch('http://139.59.16.53:4000/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    setCurrentUser(value[0]);
                    if (value[0].college_name === null) {
                        setUserDetailsDone(false);
                    }
                    setOpen(false);

                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setAuthorized(false);
            }
        })
        fetch('http://139.59.16.53:4000/api/events', {
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
                    value.sort((a, b) => {
                        return new Date(a.start_time) - new Date(b.start_time);
                    })
                    setAllEvents(value);
                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setAuthorized(false);
            }

        })

    }, [token])
    if (!token) {
        return <Redirect to="/"></Redirect>
    }
    if (!authorized) {
        return <Redirect to="/"></Redirect>
    }
    if (!userDetailsDone) {
        return <Redirect to="/userinfo"></Redirect>
    }

    return (
        <AuthContext.Provider value={currentUser}>
            <EventsContext.Provider value={allEvents}>
                {/* <RegEventsContext.Provider value={registeredEvents}> */}
                {
                    currentUser != null && allEvents != null && <div>
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
                {/* </RegEventsContext.Provider> */}
            </EventsContext.Provider>
        </AuthContext.Provider>


    );
}
export default Layout;
