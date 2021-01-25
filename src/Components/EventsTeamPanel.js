import React from 'react';
// import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

import SubmissionPanel from './EventSubmissionPanel';
import SubPanel1 from './EventsTeamSubPanel1';
import SubPanel2 from './EventsTeamSubPanel2';
import SubPanel3 from './EventsTeamSubPanel3';
import EventsTeamChatPanel from './EventsTeamChatPanel';
import { Typography } from '@material-ui/core';
import WebSocketContext from '../WebSocketContext';
import AuthContext from '../AuthContext';
import WebSocketDataContext from '../WebSocketDataContext';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        // backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(0),
        alignContent: "center",
        // position: 'fixed'

    },
    media: {
        // height: 250,
        // paddingTop: '56.25%', // 16:9
    },

    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    buttonDiv: {
        marginLeft: 'auto',
    },
    button: {
        margin: theme.spacing(0.5),
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    tab: {
        flexGrow: 1,
        // maxWidth: 800,
        background: theme.palette.secondary.main,
        alignItems: 'center',
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        // position: '-webkit-sticky',
        // position: 'sticky'
        // position: 'fixed'
        // marginBottom: theme.spacing(2),
        // padding: theme.spacing(1)

    },
}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    const { currentUser } = React.useContext(AuthContext);
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const event = props.event;
    // const [subIndexValue, setSubIndexValue] = React.useState(0);
    const [teamedUp, setTeamedUp] = React.useState(false);
    const [registration, setRegistration] = React.useState({});
    const subIndexValue = props.subIndexValue;

    const { webSocketContext } = React.useContext(WebSocketContext);

    const { teamUpdateStatus } = React.useContext(WebSocketDataContext);
    // const handleChange = (event, newValue) => {
    //     setSubIndexValue(newValue);
    // };

    React.useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [teamUpdateStatus])

    React.useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [event, token])


    React.useEffect(() => {
        if (webSocketContext) {
            if (registration !== {}) {
                // console.log("xxxxx")
                webSocketContext.send(JSON.stringify({
                    action: "join_team_update_status",
                    team_id: registration.team_id,
                    msg: {
                        'user_id': currentUser.user_id,
                    }
                }));
            }
        }
    }, [registration, currentUser, webSocketContext])


    const getData = () => {
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_user_registration?id=${event._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(value => {
                        // console.log(value[0]);
                        setRegistration(value[0]);
                        // if(value[0].teamed_up){
                        setTeamedUp(value[0].teamed_up);
                        // }

                    })
                }

            })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    {/* <Paper className={classes.root2}>
                        <Tabs
                            value={subIndexValue}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab label="Submissions" />
                            <Tab label="Your Team" />
                            <Tab label="Team Chat"/>
                            <Tab label="Create Team" />
                            <Tab label="Join Team" />
                        </Tabs>
                    </Paper> */}
                    {teamedUp && <SubmissionPanel getData={getData} individual={false} value={subIndexValue} registration={registration} index={0} event={props.event}></SubmissionPanel>}
                    {teamedUp && <SubPanel1 getData={getData} value={subIndexValue} registration={registration} index={1} event={props.event}></SubPanel1>}
                    {teamedUp && subIndexValue === 2 &&  <EventsTeamChatPanel open={props.open} value={subIndexValue} registration={registration} index={2} event={props.event}></EventsTeamChatPanel>}
                    {!teamedUp && subIndexValue === 0 && <Typography>Join team or create a team</Typography>}
                    {/* {!teamedUp && subIndexValue === 1 && <Typography>Join team or create a team</Typography>} */}
                    {!teamedUp && subIndexValue === 2 && <Typography>Join team or create a team</Typography>}
                    {!teamedUp && <SubPanel2 value={subIndexValue} index={1} event={props.event} getData={getData}></SubPanel2>}
                    {/* {teamedUp && subIndexValue === 3 && <Typography>Team already created</Typography>} */}
                    {!teamedUp && <SubPanel3 value={subIndexValue} index={1} event={props.event}></SubPanel3>}
                    {teamedUp && subIndexValue === 4 && <Typography>Team created or joined, delete to join other teams</Typography>}
                </div>
            )}
        </div>
    );
}

export default AboutEventPanel;
