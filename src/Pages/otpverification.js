import React, { useEffect } from 'react';
import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';

//MaterialUI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


//function for alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OTPver = ({ history }) => {
    const classes = useStyles();
    // const [token, setToken] = React.useState("");
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error'
    });
    const [loading, setLoading] = React.useState(false);
    const { vertical, horizontal, open, message, type } = state;

    function handleClose() {
        console.log("message")
        if (message === "verified") {
            history.replace("/userinfo")
        }
    }

    function handleVerification(event) {
        event.preventDefault();
        setLoading(true);
        const { otp } = event.target.elements;
        try {
            var data = new FormData();
            const payload = {
                otp: otp.value
            };
            // data.append(JSON.stringify(payload));
            data = JSON.stringify(payload);
            const token = localStorage.getItem("token");
            fetch('https://ellipseserver1.herokuapp.com/api/users/verifyotp', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data

            }
            ).then((result) => {
                result.json().then(val => {
                    console.log(val.message);
                    if (val.message === "verified") {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "verified",
                            type: 'success'
                        })

                    }
                    else if (val.message === "Not verified") {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "incorrect otp",
                            type: 'error'
                        })
                    }
                    else {
                        setLoading(false);
                        setState({
                            open: true,
                            vertical: 'top',
                            horizontal: 'center',
                            message: "Something went wrong try again",
                            type: 'error'
                        })
                    }
                })
            })
        }
        catch (error) {
            setLoading(false);
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                message: error.message,
                type: 'error'
            })
        }



    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={type}>{message}</Alert>
            </Snackbar>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email Verification
                </Typography>
                <form className={classes.form} onSubmit={handleVerification}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="otp"
                            label="Enter OTP"
                            name="otp"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress color="primary" size={24} /> : "Continue"}
                    </Button>
                </form>
            </div>

            {/* </Grid> */}
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(OTPver);


