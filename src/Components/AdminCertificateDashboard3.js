import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CertificateSample from './Images/certificate_sample.png';
import Typography from '@material-ui/core/Typography';

//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(3),
        borderRadius: 30,

    },
}));

export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 300
    });
    const [loading, setLoading] = React.useState(false);
    const { vertical, horizontal, open, message, type, autoHide } = state;
    const token = localStorage.getItem('token');
    const [title, setTitle] = React.useState(null);
    const event = props.event;

    const handleClose = async (event, reason) => {
        setState({ ...state, open: false });
    }

    React.useEffect(() => {
        setTitle(event.certificate.title)
    }, [event])

    function handleUpdateButton() {
        setLoading(true);
        try {
            if (title === "" || title === null) {
                setLoading(false);
                setState({
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    message: "please fill the details",
                    type: "error",
                    autoHide: 6000
                })
            }
            else {
                var data = new FormData();
                const d = { eventId: event._id, title: title }
                data = JSON.stringify(d);
                fetch(process.env.REACT_APP_API_URL + `/api/event/update_certificate_title`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: data
                }).then(response => {
                    // console.log(response);
                    response.json().then(value => {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: 'Generated successfully',
                            type: "success",
                            autoHide: 4000
                        });
                    })
                })
            }

        }
        catch (error) {
            setLoading(false);
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                message: error.message,
                type: "error",
                autoHide: 6000
            })

        }
    }


    return (
        <div className={classes.paper}>
            <Grid container spacing={2}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={autoHide}
                    onClose={handleClose}
                    key={vertical + horizontal}>
                    <Alert onClose={handleClose} severity={type}>{message}</Alert>
                </Snackbar>
                <Grid item xs={12}>
                    <TextField
                        autoComplete='off'
                        required
                        id="title"
                        name="title"
                        label="Certificate Title"
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        inputProps={{
                            maxLength: 32,
                        }}
                        helperText="You can change the title of certificate as shown below in sample by default it is event name"
                    />
                </Grid>
                {/* <Grid item xs={6}>
                </Grid> */}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleUpdateButton}
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress color="primary" size={24} /> : "Update"}
                    </Button>
                </Grid>
            </Grid>
            <Typography style={{marginTop:"10px"}} variant="h4">Sample Certificate</Typography>
            <img width="100%" alt="certificate sample" src={CertificateSample}></img>
        </div>
    );
}