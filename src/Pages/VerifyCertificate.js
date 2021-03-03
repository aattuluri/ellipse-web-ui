import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.primary.dark
    },
    body: {
        margin: theme.spacing(3)
    },
    appbar: {
        backgroundColor: theme.palette.secondary.main
    },
    root2: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(50),
            height: theme.spacing(50),
        },

    },
    root3: {
        display: "flex",
        justifyContent: "center",
    },
    root4: {
        backgroundColor: theme.palette.secondary.main
    }
}));

export default function UnregisteredPage(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const [details, setDetails] = React.useState({});
    const [userFound, setUserFound] = React.useState(true);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/event/verify_certificate?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    setUserFound(true)
                    setDetails(value);
                    const d = new Date(value.date);
                    setDate(d.toDateString());
                })
            }
            else {
                setUserFound(false);
            }

        })
    }, [id])

    function handleSigninClick() {
        props.history.push("/")
    }
    function handleSignupClick() {
        props.history.push('/signup');
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Ellipse
                    </Typography>
                    <Button size="large" color="primary" onClick={handleSigninClick}>Login</Button>
                    <Button size="large" color="primary" onClick={handleSignupClick}>Signup</Button>
                </Toolbar>
            </AppBar>
            {userFound && <Box m={1} p={1} className={classes.root3}>
                <Box m={1} p={3} className={classes.root4}>
                    <VerifiedUserIcon fontSize="large"></VerifiedUserIcon>
                    <Typography variant="h4">{details.participantname}</Typography>
                    <Typography>{details.participant_college}</Typography>
                    <Typography style={{ marginTop: "20px" }}>Event Name: {details.event_name}</Typography>
                    <Typography>Organizer: {details.organizer}</Typography>
                    <Typography>Held on {date}</Typography>
                    <Typography style={{ marginTop: "20px" }}>participation by {details.participantname} has been confirmed</Typography>
                </Box>
            </Box>}
            {!userFound && <Box m={1} p={1} className={classes.root3}>
                <Box m={1} p={3} className={classes.root4}>
                    <CancelIcon fontSize="large"></CancelIcon>
                    <Typography variant="h4">Certificate NOT FOUND</Typography>
                </Box>
            </Box>}
        </div>
    );
}