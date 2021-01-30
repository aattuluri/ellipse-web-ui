import React from 'react';
import { Typography, Box, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';


// import AuthContext from '../AuthContext';
// import WebSocketContext from '../WebSocketContext';
import SubmissionPanel from './SubmissionForm';
// import ChatMessage from '../Components/ChatMessage';
// import ChatTextField from './ChatTextField';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Linkify from 'react-linkify';


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        // backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        alignContent: "center"

    },
    adminDetails: {
        display: "flex",
        justifyContent: "flex-start",
        // marginTop: theme.spacing(2)
    },
    root0: {
        display: "flex",
        justifyContent: "flex-start",

    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(1)
    },

    grid: {
        borderRadius: theme.spacing(3),
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: "rgb(0, 189, 170,0.1)",
        maxWidth: '99%',
        marginTop: theme.spacing(2)

    },
    root3: {
        display: "flex",
        justifyContent: "flex-start",
        minWidth: theme.spacing(30)
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
        maxHeight: "300px"
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
    root2: {
        // backgroundColor: theme.palette.background.paper,
        // borderRadius: theme.spacing(1),
        textDecorationColor: theme.palette.secondary.light,
        maxWidth: '65%',
        minWidth: '20%',
        overflow: 'auto',
        marginLeft: theme.spacing(1)
        // textOverflow: "ellipsis"
    },
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
    accordion: {
        backgroundColor: theme.palette.secondary.main
    }

}));

function AboutEventPanel(props) {
    const classes = useStyles();
    // const { currentUser } = React.useContext(AuthContext);
    const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const event = props.event;
    const [registration,setRegistration] = React.useState(null);
    // const registration = props.registration;
    const [teamDetails, setTeamDetails] = React.useState(null);
    // const [admin, setAdmin] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    // const { webSocketContext } = React.useContext(WebSocketContext);


    React.useEffect(() => {
        // console.log(props.individual);
        if(!props.individual){
            setRegistration(props.registration);
            fetchAll()
            
        }
        else{
            getData();
        }
        
        // eslint-disable-next-line
    }, [props.individual])

    const fetchAll = () => {
        setLoading(true);
        try {
            if(props.registration.team_id !== null){
                fetch(process.env.REACT_APP_API_URL + `/api/event/get_team_details?id=${props.registration.team_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'GET',
                }).then(response => {
                    response.json().then(value => {
                        // console.log(value);
                        setTeamDetails(value[0]);
                        setLoading(false)
                        // if (value[0].user_id === currentUser.user_id) {
                        //     setAdmin(true);
                        // }
                    })
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const getData = () =>{
        setLoading(true);
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_user_registration?id=${event._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                if(response.status === 200){
                    response.json().then(value => {
                        // console.log(value);
                        setRegistration(value[0]);
                        setLoading(false);
                        // if(value[0].teamed_up){
                            // setTeamedUp(value[0].teamed_up);
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
                <React.Fragment>
                <div className={classes.progress}>
                        <Fade
                            in={loading}
                            unmountOnExit>
                            <CircularProgress />
                        </Fade>
                    </div>
                    {!props.individual && <div className={classes.grid}>
                        {teamDetails !== null && <Grid container component="main" >
                            <Grid item xs={12} md={6}>
                                <Typography>Team</Typography>
                                <Box className={classes.root0}>
                                    <Box className={classes.adminDetails}>
                                        <Box>
                                            <Avatar className={classes.avatar} alt={teamDetails.team_name} src="abc.jpg"></Avatar>
                                        </Box>
                                        <Box>
                                            <Box>
                                                <Typography variant="h5">{teamDetails.team_name}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography color="textSecondary" variant="body2">{teamDetails.description}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>}
                    </div>}
                    {!props.individual && <Grid container component="main">
                        {teamDetails!== null && <Grid item xs={12}>
                            {
                                event.rounds.map((value, index) => {
                                    const cDate = new Date();
                                    const sDate = new Date(value.start_date);
                                    const eDate = new Date(value.end_date);
                                    return <Accordion className={classes.accordion}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>{value.title}</Typography>
                                            <Typography color="textSecondary" style={{marginLeft: '3px'}}>{cDate < sDate ? "Starts on "+sDate.toDateString()+" "+sDate.toLocaleTimeString() : "Ends on "+eDate.toDateString()+" "+eDate.toLocaleTimeString()}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {value.action === 'link' ? <Typography component="span" variant="body1" color="textSecondary" className={classes.inline}>
                                                <Linkify
                                                    componentDecorator={(decoratedHref, decoratedText, key) => (
                                                        <a target="blank" style={{ color: '#00bdaa', fontWeight: 'bold' }} href={decoratedHref} key={key}>
                                                            {decoratedText}
                                                        </a>
                                                    )}
                                                >{value.link}</Linkify>
                                            </Typography> : <SubmissionPanel fetchAll={fetchAll} team_id={registration.team_id} index={index} team={teamDetails} event={event} round={value} fields={value.fields}></SubmissionPanel>}
                                        </AccordionDetails>
                                    </Accordion>
                                })
                            }
                        </Grid>}
                    </Grid>}
                    {props.individual && <Grid container component="main">
                        {registration !== null && <Grid item xs={12}>
                            {
                                event.rounds.map((value, index) => {
                                    const cDate = new Date();
                                    const sDate = new Date(value.start_date);
                                    const eDate = new Date(value.end_date);
                                    return <Accordion className={classes.accordion}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>{value.title}</Typography>
                                            <Typography color="textSecondary" style={{marginLeft: '3px'}}>{cDate < sDate ? "Starts on "+sDate.toDateString()+" "+sDate.toLocaleTimeString() : "Ends on "+eDate.toDateString()+" "+eDate.toLocaleTimeString()}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {value.action === 'link' ? <Typography component="span" variant="body1" color="textSecondary" className={classes.inline}>
                                                <Linkify
                                                    componentDecorator={(decoratedHref, decoratedText, key) => (
                                                        <a target="blank" style={{ color: '#00bdaa', fontWeight: 'bold' }} href={decoratedHref} key={key}>
                                                            {decoratedText}
                                                        </a>
                                                    )}
                                                >{value.link}</Linkify>
                                            </Typography> : <SubmissionPanel fetchAll={getData} registration={registration} individual={props.individual} team_id={registration.team_id} index={index} team={teamDetails} event={event} round={value} fields={value.fields}></SubmissionPanel>}
                                        </AccordionDetails>
                                    </Accordion>
                                })
                            }
                        </Grid>}
                    </Grid>}
                </React.Fragment>
            )}
        </div>
    );
}
export default AboutEventPanel;

// {/* <ChatMessage adminId={event.user_id} message={value} ></ChatMessage> */}
