import React from 'react';
import Linkify from 'react-linkify';

//materialui imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

//other componennt imports
import ImageDialog from '../Components/ImageDialog';
import LoadingIndicator from '../Components/LoadingIndicator';

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
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(2)
    },
    root3: {
        display: "flex",
        justifyContent: "center",
    },
    root4: {
        backgroundColor: theme.palette.secondary.main
    },
    root5: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    root6: {
        paddingLeft: theme.spacing(2)
    }
}));

export default function ViewSubmissionPage(props) {
    const classes = useStyles();
    const id = props.match.params.sub_id;

    const [event, setEvent] = React.useState({});
    const [users, setUsers] = React.useState({});
    const [userFound, setUserFound] = React.useState(true);
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [isTeamed, setIsTeamed] = React.useState(false);
    const [submission, setSubmission] = React.useState(null);
    const [roundInfo, setRoundInfo] = React.useState(null);
    const [reg, setReg] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_URL + `/api/event/get_submission?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    if (value.event.isTeamed) {
                        setIsTeamed(true);
                    }
                    setUsers(value.users);
                    setEvent(value.event);
                    setReg(value.submission);
                    setSubmission(value.submission.submissions);
                    setRoundInfo(value.rounds_info);
                    setLoading(false);
                })
            }
            else {
                setUserFound(false);
                setLoading(false);
            }
        })
    }, [id])

    function handleSigninClick() {
        props.history.push("/")
    }
    function handleSignupClick() {
        props.history.push('/signup');
    }

    const handleImageDialogClose = () => {
        setImageDialogOpen(false);
    }
    const handleImageDialogOpen = () => {
        setImageDialogOpen(true);
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
            <LoadingIndicator loading={loading}></LoadingIndicator>
            {!loading && userFound && <div>
                <Box >
                    <Box className={classes.root5}>
                        <Typography variant="h5" style={{ marginBottom: "7px" }}>{event.name}</Typography>
                    </Box>
                    <Box className={classes.root5}>
                        <img
                            onClick={handleImageDialogOpen}
                            style={{ width: '240px', height: '180px' }}
                            alt="event poster"
                            src={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}>
                        </img>
                    </Box>
                </Box>
                {isTeamed && <Box className={classes.root6}>
                    <Typography>Team Name: {reg.team_name}</Typography>
                </Box>}
                <Box className={classes.root6}>
                    <Typography>Members</Typography>
                </Box>

                {users.length > 0 && users.map((value, index) => {
                    return <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Avatar alt={value.name} src={value.profile_pic ? process.env.REACT_APP_API_URL + `/api/image?id=${value.profile_pic}` : "abc.jpg"} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.name}
                            secondary={value.college_name}
                        />

                    </ListItem>
                })
                }
                {
                    userFound && roundInfo && submission && submission !== null && <Box className={classes.root2}>
                        <Typography variant="h5" style={{ marginBottom: "5px" }}>Submissions</Typography>
                        {
                            submission.map(value => {
                                if (value.submission_form) {
                                    const ks = Object.keys(value.submission_form);
                                    return <React.Fragment>
                                        <Typography>{value.title}</Typography>
                                        {
                                            ks.map((val, index) => {
                                                if (roundInfo[0].fields[index].field === "file") {
                                                    return <React.Fragment>
                                                        <Typography>{val}</Typography>
                                                        <IconButton download target="_blank" href={process.env.REACT_APP_API_URL + `/api/event/registration/get_file?id=${value[val]}`} size="small" color="primary"><GetAppIcon></GetAppIcon></IconButton>
                                                    </React.Fragment>
                                                }
                                                return <React.Fragment>
                                                    <Typography>{val}</Typography>
                                                    <Typography variant="h4" color="primary">
                                                        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                                            <a target="blank" style={{ color: 'red', fontWeight: 'bold' }} href={decoratedHref} key={key}>
                                                                {decoratedText}
                                                            </a>
                                                        )}
                                                        >{value.submission_form[val]}
                                                        </Linkify>
                                                    </Typography>
                                                </React.Fragment>
                                            })
                                        }
                                    </React.Fragment>
                                }
                                else {
                                    return <React.Fragment>
                                        <Typography>{value.title}</Typography>
                                        <Typography color="textSecondary">Team has no submissions</Typography>
                                    </React.Fragment>
                                }

                            })
                        }
                    </Box>
                }
            </div>}
            {!userFound && <Box m={1} p={1} className={classes.root3}>
                <Box m={1} p={3} className={classes.root4}>
                    <CancelIcon fontSize="large"></CancelIcon>
                    <Typography variant="h4"> NOT FOUND</Typography>
                </Box>
            </Box>}
            <ImageDialog
                event={event}
                open={imageDialogOpen}
                handleClose={handleImageDialogClose}>
            </ImageDialog>
        </div>
    );
}