import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import WebSocketContext from '../WebSocketContext';
import AuthContext from '../AuthContext';
import WebSocketDataContext from '../WebSocketDataContext';
import SubmissionPanel from './EventSubmissionPanel';
import SubPanel1 from './EventsTeamSubPanel1';
import SubPanel2 from './EventsTeamSubPanel2';
import SubPanel3 from './EventsTeamSubPanel3';
import EventsTeamChatPanel from './EventsTeamChatPanel';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    //   const [value, setValue] = React.useState(0);

    // const { children, value, url, index, ...other } = props;
    const { currentUser } = React.useContext(AuthContext);
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const event = props.event;
    const [subIndexValue, setSubIndexValue] = React.useState(0);
    const [teamedUp, setTeamedUp] = React.useState(false);
    const [registration, setRegistration] = React.useState({});
    // const subIndexValue = props.subIndexValue;

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
                        // console.log(value);
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

    const handleChange = (event, newValue) => {
        setSubIndexValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={subIndexValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Submission" {...a11yProps(0)} />
                <Tab label="Your Team" {...a11yProps(1)} />
                <Tab label="Team Chat" {...a11yProps(2)} />
                <Tab label="Create Team" {...a11yProps(3)} />
                <Tab label="Join Team" {...a11yProps(4)} />
                {/* <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
            {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
            <div style={{ width: "100%" }}>
                {teamedUp && <SubmissionPanel getData={getData} individual={false} value={subIndexValue} registration={registration} index={0} event={props.event}></SubmissionPanel>}
                {teamedUp && <SubPanel1 getData={getData} value={subIndexValue} registration={registration} index={1} event={props.event}></SubPanel1>}
                {teamedUp && subIndexValue === 2 && <EventsTeamChatPanel value={subIndexValue} registration={registration} index={2} event={props.event}></EventsTeamChatPanel>}
                {!teamedUp && subIndexValue === 0 && <Typography>Join team or create a team</Typography>}
                {!teamedUp && subIndexValue === 1 && <Typography>Join team or create a team</Typography>}
                {!teamedUp && subIndexValue === 2 && <Typography>Join team or create a team</Typography>}
                {!teamedUp && <SubPanel2 value={subIndexValue} index={3} event={props.event} getData={getData}></SubPanel2>}
                {teamedUp && subIndexValue === 3 && <Typography>Team already created</Typography>}
                {!teamedUp && <SubPanel3 value={subIndexValue} index={4} event={props.event}></SubPanel3>}
                {teamedUp && subIndexValue === 4 && <Typography>Team created or joined, delete to join other teams</Typography>}
            </div>

        </div>
    );
}