import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import Linkify from 'react-linkify';

import CircularLoading from './CircularLoading';



const useStyles = makeStyles((theme) => ({

    icons: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        // color: theme.palette.grey[500],
    },
    root: {

    },
    bottomTags: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: theme.spacing(1),
    },
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    },
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        // marginBottom: theme.spacing(2),
        padding: theme.spacing(1)

    },
    bottomBar: {
        display: 'flex',
        width: '90%',
        backgroundColor: theme.palette.secondary.main
    },
    field: {
        width: '100%'
    },
    action: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '50px'
    },
    dialogContent: {
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
        },

    },
    mobileHead: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    desktopHead: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    }
}));



export default function ScrollDialog(props) {

    const token = localStorage.getItem('token');
    const [loading,setLoading] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const [submission, setSubmission] = React.useState(null);
    const [keys, setKeys] = React.useState([]);
    // const reg = props.reg;
    const event = props.event;
    const [currentRoundFields, setCurrentRoundFields] = React.useState([]);

    const handleClose = () => {
        // props.reset();
        props.setOpen(false);
        setSubmission(null);
        setKeys([]);
    };

    React.useEffect(() => {
        event.rounds.forEach(round => {
            if (round.title === props.submission.title) {
                // console.log(round.fields);
                setCurrentRoundFields(round.fields);
            }
        });
        if(props.submission !== null){
            if (props.submission.submission_id !== null) {
                getData();
            }
        }
        // eslint-disable-next-line
    }, [props,event])

    const getData = () => {
        setLoading(true);
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_submission?id=${props.submission.submission_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    // console.log(value);
                    setKeys(Object.keys(value.submission));
                    setSubmission(value);
                    setLoading(false);
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
        
            <Dialog
                open={props.open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="submission"
                fullWidth={true}
                maxWidth="md"
                PaperProps={{
                    style: {
                        backgroundColor: theme.palette.secondary.main,
                        boxShadow: 'none',
                    },
                }}
                classes={{ paper: classes.dialog }}
            >
                <DialogTitle id="scroll-dialog-title">{props.name}<div className={classes.icons}>
                    <IconButton aria-label="share" >
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </div></DialogTitle>
               
                <DialogContent dividers={true}>
                <CircularLoading loading={loading}></CircularLoading>
                    {submission !== null && keys.length !== 0 && <DialogContentText
                        id="description"
                        tabIndex={-1}
                    >
                        {
                            keys.map((value, index) => {
                                if (currentRoundFields[index].field === "file_upload") {
                                    return <React.Fragment>
                                        <Typography>{value}</Typography>
                                        <IconButton download target="_blank" href={process.env.REACT_APP_API_URL + `/api/event/registration/get_file?id=${submission.submission[value]}`} size="small" color="primary"><GetAppIcon></GetAppIcon></IconButton>
                                    </React.Fragment>
                                }
                                return <React.Fragment>
                                    <Typography>{value}</Typography>
                                    <Typography variant="h4" color="primary"><Linkify
                                componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a target="blank" style={{ color: 'red', fontWeight: 'bold' }} href={decoratedHref} key={key}>
                                        {decoratedText}
                                    </a>
                                )}
                            >{submission.submission[value]}</Linkify></Typography>
                                </React.Fragment>
                            })
                        }
                    </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Dismiss
                    </Button>
                    {/* <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
